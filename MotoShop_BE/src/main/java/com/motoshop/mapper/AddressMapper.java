package com.motoshop.mapper;

import com.motoshop.models.Address;
import com.motoshop.web.dto.request.AddressRequest;
import com.motoshop.web.dto.response.AddressResponse;
import org.mapstruct.*;

@Mapper
public interface AddressMapper {
    AddressResponse mapToResponse(Address address);

    @Mapping(target = "user.id", source = "userId")
    Address mapToModel(AddressRequest addressRequest);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateModel(@MappingTarget Address address, AddressRequest addressRequest);
}
