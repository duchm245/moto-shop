package com.motoshop.services.impl;

import com.motoshop.mapper.ProductImageMapper;
import com.motoshop.mapper.SizeMapper;
import com.motoshop.models.Product;
import com.motoshop.models.ProductImage;
import com.motoshop.models.dtos.SizeDto;
import com.motoshop.repositories.ProductImageRepository;
import com.motoshop.repositories.SizeRepository;
import com.motoshop.services.ProductImageService;
import com.motoshop.services.SizeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductImageServiceImpl implements ProductImageService {
    private final ProductImageRepository productImageRepository;
    private final ProductImageMapper productImageMapper;

    public ProductImageServiceImpl(ProductImageRepository productImageRepository,
                                   ProductImageMapper productImageMapper) {
        this.productImageRepository = productImageRepository;
        this.productImageMapper = productImageMapper;
    }

    @Override
    public void delete(long id) {
        ProductImage productImage = productImageRepository.findById(id).orElseThrow();
        productImage.setProduct(null);
        productImageRepository.save(productImage);
        productImageRepository.delete(productImage);
    }
}
