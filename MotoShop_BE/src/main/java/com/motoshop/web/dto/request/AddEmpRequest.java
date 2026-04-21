package com.motoshop.web.dto.request;

import lombok.Data;

@Data
public class AddEmpRequest {

    private String username;

    private String password;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;
}
