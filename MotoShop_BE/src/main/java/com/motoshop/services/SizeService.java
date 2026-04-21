package com.motoshop.services;

import com.motoshop.models.Size;
import com.motoshop.models.dtos.SizeDto;
import com.motoshop.web.dto.request.ArticleRequest;
import com.motoshop.web.dto.response.ArticleResponse;
import com.motoshop.web.dto.response.SizeResponse;

import java.util.List;

public interface SizeService {
    List<SizeDto> getAllValueSize();
}
