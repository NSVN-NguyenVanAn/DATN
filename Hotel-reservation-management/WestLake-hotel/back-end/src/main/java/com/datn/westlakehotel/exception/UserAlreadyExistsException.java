package com.datn.westlakehotel.exception;

/**
 * @author Nguyen Van An
 */

public class UserAlreadyExistsException extends RuntimeException{
    public UserAlreadyExistsException(String message) {
        super(message);
    }
}
