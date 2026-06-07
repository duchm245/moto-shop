package com.motoshop.web.dto.request;

import lombok.Data;

@Data
public class AdminPasswordRequest {
    private String newPassword;
    private String cfNewPassword;
}
