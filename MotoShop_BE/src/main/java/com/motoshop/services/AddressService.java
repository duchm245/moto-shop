package com.motoshop.services;

import com.motoshop.web.dto.request.AddressRequest;
import com.motoshop.web.dto.response.AddressResponse;

import java.util.List;

public interface AddressService {
    AddressResponse createAddress(AddressRequest addressRequest);
    AddressResponse updateAddress(long addressId, AddressRequest addressRequest);
    void deleteAddress(long addressId);
    List<AddressResponse> getAddressByUser(long userId);
}
