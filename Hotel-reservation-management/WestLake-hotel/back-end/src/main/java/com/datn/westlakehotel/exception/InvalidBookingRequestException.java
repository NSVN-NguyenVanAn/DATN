package com.datn.westlakehotel.exception;

/**
 * @author Nguyen Van An
 */

public class InvalidBookingRequestException extends RuntimeException {
    public InvalidBookingRequestException(String message) {
        super(message);
    }
}
