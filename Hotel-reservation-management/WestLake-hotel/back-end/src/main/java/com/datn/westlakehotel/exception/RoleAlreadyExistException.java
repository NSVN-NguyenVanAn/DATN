package com.datn.westlakehotel.exception;

/**
 * @author Nguyen Van An
 */

public class RoleAlreadyExistException extends RuntimeException {
    public RoleAlreadyExistException(String message) {
        super(message);
    }
}
