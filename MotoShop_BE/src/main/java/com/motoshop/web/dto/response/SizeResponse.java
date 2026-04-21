package com.motoshop.web.dto.response;

import lombok.Data;

@Data
public class SizeResponse {
    private Long id;

    private String value;

    private int total;

    private int sold;

}
