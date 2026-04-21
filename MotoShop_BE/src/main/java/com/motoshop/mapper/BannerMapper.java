package com.motoshop.mapper;

import com.motoshop.web.dto.request.BannerRequest;
import com.motoshop.web.dto.response.BannerResponse;
import com.motoshop.models.Banner;
import org.mapstruct.*;

@Mapper
public interface BannerMapper {
	@Mapping(target = "categoryId", source = "category.id")
    BannerResponse mapModelToResponse(Banner banner);

	Banner mapRequestToModel(BannerRequest bannerRequest);

	@BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
	void updateModel(@MappingTarget Banner banner, BannerRequest bannerRequest);
}
