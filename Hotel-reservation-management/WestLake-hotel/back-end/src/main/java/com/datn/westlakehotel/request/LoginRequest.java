package com.datn.westlakehotel.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * @author Nguyen Van An
 */
@Data
public class LoginRequest {
    @NotBlank
    private String email;
    @NotBlank
    private String password;
}
