package com.motoshop.web.dto.response;

import com.motoshop.models.dtos.SocialMediaDto;
import lombok.Data;

import java.util.Date;
import java.util.List;


@Data
public class CompanyResponse {
    private long id;

    private String name;

    private String phoneCskh;

    private String phone;

    private String taxCode;

    private String taxDate;

    private String taxLocation;

    private String address;

    private Date createdDate;

    private Date modifiedDate;

    private int status;

    private List<SocialMediaDto> socials;
}
