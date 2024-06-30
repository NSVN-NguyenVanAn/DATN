package com.datn.westlakehotel.service;

import com.datn.westlakehotel.config.BookingStorageConfig;
import com.datn.westlakehotel.config.VnpayConfig;
import com.datn.westlakehotel.model.BookedRoom;
import com.datn.westlakehotel.request.BookingRequest;
import com.datn.westlakehotel.exception.InvalidBookingRequestException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

import static com.datn.westlakehotel.request.BookingRequest.toEntity;

@Service
public class VnpayServiceImpl implements IVnpayService {
    @Autowired
    private BookingStorageConfig bookingStorage;
    @Autowired
    private  IBookingService bookingService;

    @Override
    public String createUrl(BookingRequest bookingInfo, HttpServletRequest request) {
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String content = "THANH TOAN DAT PHONG " + bookingInfo.getRoomId() + " QUA EMAIL " + bookingInfo.getGuestEmail();

        BookingStorageConfig.Session paymentSession = bookingStorage.checkSessionAndCreateOrUpdate(content, bookingInfo);

        if(paymentSession == null){
            throw new InvalidBookingRequestException("Không thể tạo phiên thanh toán!");
        }
        return generateVnPayUrl(paymentSession, bookingInfo.getPrice(), content, baseUrl);
    }

    @Override
    public String paymentReturn(HttpServletRequest request) {
        AtomicInteger paymentStatus = new AtomicInteger(0); // payment status = 0 (pending)
        String confirmCode = "0";
        Map<String, String> fields = new HashMap<>();
        for (Enumeration params = request.getParameterNames(); params.hasMoreElements();) {
            String fieldName = null;
            String fieldValue = null;
            try {
                fieldName = URLEncoder.encode((String) params.nextElement(), StandardCharsets.US_ASCII.toString());
                fieldValue = URLEncoder.encode(request.getParameter(fieldName), StandardCharsets.US_ASCII.toString());
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                fields.put(fieldName, fieldValue);
            }
        }

        String vnp_SecureHash = request.getParameter("vnp_SecureHash");
        String vnp_ResponseCode = request.getParameter("vnp_ResponseCode");
        String vnp_TxnRef = request.getParameter("vnp_TxnRef");
        String vnp_OrderInfo = request.getParameter("vnp_OrderInfo");
        // Tiêu đề phiên thanh toán
        String sessionTitle = vnp_OrderInfo;

        int vnp_Amount = Integer.parseInt(request.getParameter("vnp_Amount"));

        if (fields.containsKey("vnp_SecureHashType")) {
            fields.remove("vnp_SecureHashType");
        }

        if (fields.containsKey("vnp_SecureHash")) {
            fields.remove("vnp_SecureHash");
        }

        // Check checksum
        String signValue = VnpayConfig.hashAllFields(fields);

        if (signValue.equals(vnp_SecureHash)) {
            // Lấy phiên thanh toán dựa vào title
            BookingStorageConfig.Session session = bookingStorage.getSession(sessionTitle);

            boolean checkBookingInfo = Objects.nonNull(session.getPayload());
            boolean checkBookingStatus = paymentStatus.get() == 0; // PaymentStatus = 0 (pending)

            if (checkBookingInfo) {
                // Lấy thông tin đặt phòng từ trong session
                BookingRequest bookingInfo = (BookingRequest) session.getPayload();
                int totalPrice = bookingInfo.getPrice();

                boolean checkAmount = totalPrice == vnp_Amount/100 ;

                if(checkAmount) {
                    if (checkBookingStatus){
                        if ("00".equals(vnp_ResponseCode)) {
                            paymentStatus.set(1);
                            // lưu thông tin booking ở đây
                            Long roomId = Long.valueOf(bookingInfo.getRoomId());
                            confirmCode = bookingService.saveBooking(roomId,toEntity(bookingInfo));
                            System.out.println("{\"RspCode\":\"00\",\"Message\":\"Confirm Success\"}");
                        } else if("24".equals(vnp_ResponseCode)){
                            paymentStatus.set(24);
                            confirmCode = "";
                            System.out.println("{\"RspCode\":\"24\",\"Message\":\"Canceled Payment\"}");
                        } else {
                            paymentStatus.set(Integer.parseInt(vnp_ResponseCode));
                            System.out.println("{\"RspCode\":\"" + vnp_ResponseCode +"\",\"Message\":\"Booking Failed\"}");
                        }
                    } else {
                        paymentStatus.set(2);
                        System.out.println("{\"RspCode\":\"02\",\"Message\":\"Booking already confirmed\"}");
                    }
                } else {
                    paymentStatus.set(3);
                    System.out.println("{\"RspCode\":\"03\",\"Message\":\"Invalid Amount\"}");
                }
            } else {
                paymentStatus.set(4);
                System.out.println("{\"RspCode\":\"04\",\"Message\":\"Invalid Booking\"}");
            }

            bookingStorage.removeSession(session);
        } else {
            paymentStatus.set(-1);
            System.out.println("{\"RspCode\":\"-1\",\"Message\":\"Invalid Checksum\"}");
        }
        return confirmCode;
    }

    private String generateVnPayUrl(BookingStorageConfig.Session session, int amount, String content, String urlReturn) {
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_TxnRef = VnpayConfig.getRandomNumber(8);
        String vnp_IpAddr = "127.0.0.1";
        String vnp_TmnCode = VnpayConfig.vnp_TmnCode;
        String orderType = "order-type";
        session.setTitle(content);

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount*100));
        vnp_Params.put("vnp_CurrCode", "VND");

        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", content);
        vnp_Params.put("vnp_OrderType", orderType);

        String locate = "vn";
        vnp_Params.put("vnp_Locale", locate);

        urlReturn += VnpayConfig.vnp_ReturnUrl;
        vnp_Params.put("vnp_ReturnUrl", urlReturn);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                try {
                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                    //Build query
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                    query.append('=');
                    query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = VnpayConfig.hmacSHA512(VnpayConfig.vnp_HashSecret, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        return VnpayConfig.vnp_PayUrl + "?" + queryUrl;
    }
}