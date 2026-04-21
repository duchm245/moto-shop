package com.motoshop.web.dto.request;

import com.motoshop.models.dtos.SocialMediaDto;
import lombok.Data;

import java.util.List;

@Data
public class CompanyRequest {
    private String name;

    private String phoneCskh;

    private String phone;

    private String taxCode;

    private String taxDate;

    private String taxLocation;

    private String address;

    private int status;

    private long userId;

    private List<SocialMediaDto> socialMedias;
}
