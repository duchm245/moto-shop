package com.motoshop.mapper;

import com.motoshop.models.SocialMedia;
import com.motoshop.models.dtos.SocialMediaDto;
import org.mapstruct.Mapper;

@Mapper
public interface SocialMediaMapper {
    SocialMediaDto mapToDto(SocialMedia socialMedia);
    SocialMedia mapToModel(SocialMediaDto socialMediaDto);

}
