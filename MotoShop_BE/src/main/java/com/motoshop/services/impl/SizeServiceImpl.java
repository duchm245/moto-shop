package com.motoshop.services.impl;

import com.motoshop.config.Constants;
import com.motoshop.mapper.ArticleMapper;
import com.motoshop.mapper.SizeMapper;
import com.motoshop.models.Article;
import com.motoshop.models.ArticleImage;
import com.motoshop.models.Category;
import com.motoshop.models.Size;
import com.motoshop.models.dtos.SizeDto;
import com.motoshop.repositories.ArticleImageRepository;
import com.motoshop.repositories.ArticleRepository;
import com.motoshop.repositories.CategoryRepository;
import com.motoshop.repositories.SizeRepository;
import com.motoshop.services.ArticleService;
import com.motoshop.services.SizeService;
import com.motoshop.web.dto.request.ArticleImageRequest;
import com.motoshop.web.dto.request.ArticleRequest;
import com.motoshop.web.dto.response.ArticleResponse;
import com.motoshop.web.dto.response.SizeResponse;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SizeServiceImpl implements SizeService {
    private final SizeRepository sizeRepository;
    private final SizeMapper sizeMapper;

    public SizeServiceImpl(SizeRepository sizeRepository,
                           SizeMapper sizeMapper) {
        this.sizeRepository = sizeRepository;
        this.sizeMapper = sizeMapper;
    }

    @Override
    public List<SizeDto> getAllValueSize() {
        List<String> distinctSizeValues = sizeRepository.findDistinctSizeValues();
        return distinctSizeValues.stream()
                .map(SizeDto::new)
                .collect(Collectors.toList());
    }
}
