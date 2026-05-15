package com.motoshop.services.impl;

import com.motoshop.config.Constants;
import com.motoshop.mapper.BannerMapper;
import com.motoshop.models.Banner;
import com.motoshop.models.Category;
import com.motoshop.web.dto.request.BannerRequest;
import com.motoshop.web.dto.response.BannerResponse;
import com.motoshop.exceptions.ResourceNotFoundException;
import com.motoshop.repositories.BannerRepository;
import com.motoshop.repositories.CategoryRepository;
import com.motoshop.services.BannerService;
import com.motoshop.web.dto.response.OrdersResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class BannerServiceImpl implements BannerService {
    private final BannerRepository bannerRepository;
    private final CategoryRepository categoryRepository;
    private final BannerMapper bannerMapper;

    public BannerServiceImpl(BannerRepository bannerRepository, CategoryRepository categoryRepository, BannerMapper bannerMapper) {
        this.bannerRepository = bannerRepository;
        this.categoryRepository = categoryRepository;
        this.bannerMapper = bannerMapper;
    }

    @Override
    public List<BannerResponse> getNumberOfBanners(int number) {
        Pageable pageable = PageRequest.of(0, number, Sort.by("id").descending());
        Page<Banner> banners = bannerRepository.findByStatus(pageable, Constants.ACTIVE_STATUS);
        if (!banners.isEmpty()) {
            return banners.getContent().stream()
                    .map(bannerMapper::mapModelToResponse)
                    .toList();
        }
        return null;
    }

    @Override
    public List<BannerResponse> getNumberOfBannersByCategory(long categoryId, int number) {
        Pageable pageable = PageRequest.of(0, number, Sort.by("id").descending());

        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new ResourceNotFoundException("category", "categoryId", categoryId));

        Page<Banner> banners = bannerRepository.findByCategoryAndStatus(pageable, category, Constants.ACTIVE_STATUS);
        if (!banners.isEmpty()) {
            return banners.getContent().stream()
                    .map(bannerMapper::mapModelToResponse)
                    .toList();
        }
        return null;
    }

    @Override
    public BannerResponse createBanner(BannerRequest bannerRequest) {
        Banner banner = bannerRepository.findByName(bannerRequest.getName());
        if (banner != null) {
            return null;
        }
        if (bannerRequest.getCategoryId() == null) {
            Banner bannerNew = bannerMapper.mapRequestToModel(bannerRequest);
            Date date = new Date();
            bannerNew.setCreatedDate(date);
            bannerNew.setModifiedDate(date);
            bannerNew.setStatus(1);
            bannerNew.setCategory(null);
            Banner bannerResp = bannerRepository.save(bannerNew);
            return bannerMapper.mapModelToResponse(bannerResp);
        }
        Category category = categoryRepository.findById(bannerRequest.getCategoryId()).orElseThrow(() -> new ResourceNotFoundException("category", "id", bannerRequest.getCategoryId()));
        Banner bannerNew = bannerMapper.mapRequestToModel(bannerRequest);
        Date date = new Date();
        bannerNew.setCreatedDate(date);
        bannerNew.setModifiedDate(date);
        bannerNew.setStatus(1);
        bannerNew.setCategory(category);
        Banner bannerResp = bannerRepository.save(bannerNew);
        return bannerMapper.mapModelToResponse(bannerResp);
    }

    @Override
    public BannerResponse getBannerById(long id) {
        Banner banner = bannerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Banner", "id", id));
        if (banner != null) {
            return bannerMapper.mapModelToResponse(banner);
        } else {
            return null;
        }
    }

    @Override
    public BannerResponse getBannerByName(String name) {
        Banner banner = bannerRepository.findByName(name);
        if (banner != null) {
            return bannerMapper.mapModelToResponse(banner);
        } else {
            return null;
        }
    }

    @Override
    public Pair<List<BannerResponse>, Integer> getBanners(int pageNo, int pageSize, String sortBy) {
        if (pageNo < 1) {
            pageNo = 1;
        }
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, Sort.by(sortBy).descending());
        Page<Banner> banners = bannerRepository.findByStatus(pageable, Constants.ACTIVE_STATUS);
        int total = (int) banners.getTotalElements();
        List<BannerResponse> bannerResponses = banners.getContent().stream()
                .map(bannerMapper::mapModelToResponse)
                .toList();
        return Pair.of(bannerResponses, total);
    }

    @Override
    public Pair<List<BannerResponse>, Integer> getAllBanners(String keyword,Integer status, int pageNo, int pageSize, String sortBy,boolean desc) {
        Sort.Direction sortDirection = desc ? Sort.Direction.DESC : Sort.Direction.ASC;
        if (pageNo < 1) {
            pageNo = 1;
        }
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sortDirection, sortBy);
        Page<Banner> banners = bannerRepository.findAllBanners(keyword,status, pageable);
        int total = (int) banners.getTotalElements();
        List<BannerResponse> bannerResponses = banners.getContent().stream()
                .map(bannerMapper::mapModelToResponse)
                .toList();
        return Pair.of(bannerResponses, total);
    }

    @Override
    public void deleteBanner(long id) {
        Banner banner = bannerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Banner", "id", id));
        if (banner != null) {
            banner.setCategory(null);
            bannerRepository.save(banner);
        }
        bannerRepository.delete(banner);
    }

    @Override
    public BannerResponse updateBanner(long id, BannerRequest bannerRequest) {
        Banner banner = bannerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Banner", "id", id));
        if (banner == null) {
            return null; // Không tìm thấy banner
        }
        // Update name và src
        if (bannerRequest.getName() != null) {
            banner.setName(bannerRequest.getName());
        }
        if (bannerRequest.getSrc() != null) {
            banner.setSrc(bannerRequest.getSrc());
        }
        // Update category theo categoryId
        if (bannerRequest.getCategoryId() == null || bannerRequest.getCategoryId() == 0) {
            // categoryId = null hoặc 0 → Banner home, không gắn với category nào
            banner.setCategory(null);
        } else {
            Category category = categoryRepository.findById(bannerRequest.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("category", "id", bannerRequest.getCategoryId()));
            banner.setCategory(category);
        }
        Date currentDate = new Date();
        banner.setModifiedDate(currentDate);
        bannerRepository.save(banner);
        return bannerMapper.mapModelToResponse(banner);
    }

    @Override
    public String hideBanner(long id) {
        Banner banner = bannerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Banner", "id", id));
        if (banner == null) {
            return null; // Không tìm thấy banner
        }
        Date currentDate = new Date();
        banner.setModifiedDate(currentDate);
        banner.setStatus(0);
        bannerRepository.save(banner);
        return "Banner đã được ẩn";
    }

    @Override
    public String showBanner(long id) {
        Banner banner = bannerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Banner", "id", id));
        if (banner == null) {
            return null; // Không tìm thấy banner
        }
        Date currentDate = new Date();
        banner.setModifiedDate(currentDate);
        banner.setStatus(1);
        bannerRepository.save(banner);
        return "Banner đã được hiện";
    }
}
