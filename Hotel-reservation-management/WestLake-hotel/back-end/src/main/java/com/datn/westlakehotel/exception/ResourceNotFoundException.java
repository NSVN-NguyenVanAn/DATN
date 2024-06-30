package com.datn.westlakehotel.exception;

/**
 * @author Nguyen Van An
 */

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
