package com.motoshop.mapper;

import com.motoshop.models.Role;
import com.motoshop.web.dto.response.RoleResponse;
import org.mapstruct.Mapper;

@Mapper
public interface RoleMapper {
    RoleResponse mapModelToResponse(Role role);
}
