package com.datn.westlakehotel.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    private Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    @ExceptionHandler(InvalidBookingRequestException.class)
    public ResponseEntity<?> handlingInvalidBookingException(InvalidBookingRequestException ex){
        logger.error("InvalidBookingRequestException: {}", ex.getMessage());
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}