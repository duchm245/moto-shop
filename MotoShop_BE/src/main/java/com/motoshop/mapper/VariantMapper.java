package com.motoshop.mapper;

import com.motoshop.models.Variant;
import com.motoshop.models.dtos.VariantDto;
import com.motoshop.web.dto.request.VariantRequest;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper
public interface VariantMapper {
    VariantDto mapModelToDto(Variant variant);

    @Mapping(target = "sold", ignore = true)
    @Mapping(target = "product", ignore = true)
    Variant mapRequestToModel(VariantRequest variantRequest);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateModel(@MappingTarget Variant variant, VariantRequest variantRequest);
}
