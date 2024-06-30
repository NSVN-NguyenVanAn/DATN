package com.datn.westlakehotel.exception;

/**
 * @author Nguyen Van An
 */
public class InternalServerException extends RuntimeException {
    public InternalServerException(String message) {
        super(message);
    }
}
