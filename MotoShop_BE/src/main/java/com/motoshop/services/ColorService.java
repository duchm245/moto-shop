package com.motoshop.services;

import com.motoshop.models.dtos.ColorDto;
import com.motoshop.web.dto.response.ColorResponse;

import java.util.List;

public interface ColorService {
    List<ColorDto> getAllValueColor();

    List<ColorResponse> getColorByProduct(Long productId);
}
