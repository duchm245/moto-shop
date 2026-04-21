package com.motoshop.mapper;

import com.motoshop.models.dtos.TopUserDto;
import com.motoshop.web.dto.request.AddEmpRequest;
import com.motoshop.web.dto.request.RegisterRequest;
import com.motoshop.web.dto.request.UserRequest;
import com.motoshop.web.dto.response.UserResponse;
import com.motoshop.models.User;
import org.mapstruct.*;

@Mapper(uses = AddressMapper.class)
public interface UserMapper {
    /**
     *
     */
    User mapSignupToModel(RegisterRequest registerRequest);

    User mapSignupToModel2(AddEmpRequest addEmpRequest);

    /**
     *
     */
    @Mapping(target = "roles",source = "roles")
    @Mapping(target = "addresses", source = "addresses")
    UserResponse mapModelToResponse(User user);

    //User mapRequestToModel(UserRequest userRequest);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateModel(@MappingTarget User user, UserRequest userRequest);

}
