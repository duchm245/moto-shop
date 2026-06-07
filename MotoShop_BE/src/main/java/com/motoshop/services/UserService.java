package com.motoshop.services;

import com.motoshop.models.dtos.TopUserDto;
import com.motoshop.web.dto.request.*;
import com.motoshop.web.dto.response.SaleResponse;
import com.motoshop.web.dto.response.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.util.Pair;

import java.util.List;

public interface UserService {
    /**
     *
     */
    Pair<List<UserResponse>, Integer> getAllUsers(String keyword,Integer status, int pageNo, int pageSize, String sortBy, boolean asc);
    List<UserResponse> findAllUser();
    String hideUser(Long userId, Long id);
    String addEmP(AddEmpRequest addEmpRequest);
    String showUser(Long userId, Long id);
    UserResponse findByUserName(String username);
    UserResponse findByEmail(String email);
//    Object login(LoginRequest loginRequest);
    UserResponse getUser(long userId);
    Object registerUser(RegisterRequest registerRequest);
    String updateUser(Long userId, Long actorId, UserRequest userRequest);
    String updateProfile(Long userId, UserRequest userRequest);
    String changePassword(Long userId, PasswordRequest passwordRequest);
    String resetPassword(Long targetUserId, Long actorId, AdminPasswordRequest request);
    String forgotPassword(String username);
    String generateOtp (RegisterRequest registerRequest);
    List<TopUserDto> findTopUser();
}
