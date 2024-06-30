package com.datn.westlakehotel.service;

import com.datn.westlakehotel.model.BookedRoom;
import com.datn.westlakehotel.request.BookingRequest;
import jakarta.servlet.http.HttpServletRequest;
public interface IVnpayService {
    String createUrl(BookingRequest bookingInfo, HttpServletRequest request);
    String paymentReturn(HttpServletRequest request);
}
