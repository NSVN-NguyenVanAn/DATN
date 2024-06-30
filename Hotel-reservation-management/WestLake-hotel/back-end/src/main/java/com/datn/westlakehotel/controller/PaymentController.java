package com.datn.westlakehotel.controller;
import com.datn.westlakehotel.service.IVnpayService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PaymentController {
    @Autowired
    private IVnpayService vnpayService;

    @GetMapping("/bookings/payment/vnpay_return")
    public String handleVnPayReturn(HttpServletRequest request, Model model) {
        String confirmCode = vnpayService.paymentReturn(request);

        if (confirmCode.equals("0")) {
            return "payment/cancel-payment";
        }

        if (confirmCode.equals("")) {
            return "payment/booking-failed";
        }

        model.addAttribute("confirmCode", confirmCode);
        return "payment/booking-success";
    }

}