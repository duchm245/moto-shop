package com.motoshop.mapper;

import com.motoshop.models.ProductImage;
import com.motoshop.web.dto.response.ProductImageResponse;
import org.mapstruct.Mapper;

@Mapper
public interface ProductImageMapper {
	ProductImageResponse mapModelToResponse(ProductImage productImage);
}
