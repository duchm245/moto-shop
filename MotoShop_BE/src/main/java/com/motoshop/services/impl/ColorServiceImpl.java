package com.motoshop.services.impl;

import com.motoshop.mapper.ColorMapper;
import com.motoshop.models.Color;
import com.motoshop.models.Product;
import com.motoshop.models.dtos.ColorDto;
import com.motoshop.repositories.ColorRepository;
import com.motoshop.repositories.ProductRepository;
import com.motoshop.services.ColorService;
import com.motoshop.web.dto.response.ColorResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ColorServiceImpl implements ColorService {
    private final ColorRepository colorRepository;

    private final ProductRepository productRepository;
    private final ColorMapper colorMapper;

    public ColorServiceImpl(ColorRepository colorRepository,
                            ColorMapper colorMapper,
                            ProductRepository productRepository) {
        this.colorRepository = colorRepository;
        this.colorMapper = colorMapper;
        this.productRepository = productRepository;
    }

    @Override
    public List<ColorDto> getAllValueColor() {
        List<String> distinctColorValues = colorRepository.findDistinctColorValues();
        return distinctColorValues.stream()
                .map(ColorDto::new)
                .collect(Collectors.toList());
    }
    @Override
    public List<ColorResponse> getColorByProduct(Long productId) {
        Product product = productRepository.findById(productId).orElseThrow();
        List<Color> colors = colorRepository.findByProduct(product);
        return colors.stream()
                .map(colorMapper::mapModelToResponse)
                .toList();
    }
}
