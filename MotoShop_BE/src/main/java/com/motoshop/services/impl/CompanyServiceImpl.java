package com.motoshop.services.impl;

import com.motoshop.config.Constants;
import com.motoshop.models.Company;
import com.motoshop.repositories.CompanyRepository;
import com.motoshop.repositories.SocialMediaRepository;
import com.motoshop.web.dto.request.CompanyRequest;
import com.motoshop.web.dto.response.CompanyResponse;
import com.motoshop.mapper.CompanyMapper;
import com.motoshop.mapper.SocialMediaMapper;
import com.motoshop.models.SocialMedia;
import com.motoshop.models.dtos.SocialMediaDto;
import com.motoshop.services.CompanyService;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository companyRepository;
    private final SocialMediaRepository socialMediaRepository;
    private final CompanyMapper companyMapper;
    private final SocialMediaMapper socialMediaMapper;

    public CompanyServiceImpl(CompanyRepository companyRepository, SocialMediaRepository socialMediaRepository, CompanyMapper companyMapper, SocialMediaMapper socialMediaMapper) {
        this.companyRepository = companyRepository;
        this.socialMediaRepository = socialMediaRepository;
        this.companyMapper = companyMapper;
        this.socialMediaMapper = socialMediaMapper;
    }

    @Override
    public CompanyResponse getCompany(long companyId) {
        Company company = companyRepository.findByIdAndStatus(companyId, Constants.ACTIVE_STATUS);
        if (company != null){
            return companyMapper.mapToResponse(company);
        }
        return null;
    }

    @Override
    public CompanyResponse createCompanyInfo(CompanyRequest companyRequest) {
        Company company = companyMapper.mapToModel(companyRequest);
        Date currentDate = new Date();
        company.setCreatedDate(currentDate);
        company.setModifiedDate(currentDate);
        company.setStatus(1);
        Company companyNew = companyRepository.save(company);
        for (SocialMediaDto s: companyRequest.getSocialMedias()){
            SocialMedia socialMedia = socialMediaMapper.mapToModel(s);
            socialMedia.setCompany(companyNew);
            socialMediaRepository.save(socialMedia);
        }
        return companyMapper.mapToResponse(companyNew);
    }

    @Override
    public CompanyResponse updateCompanyInfo(long companyId, CompanyRequest companyRequest) {
        Company company = companyRepository.findById(companyId).orElseThrow();
        companyMapper.updateModel(company, companyRequest);
        Date currentDate = new Date();
        company.setModifiedDate(currentDate);
        companyRepository.save(company);
        return companyMapper.mapToResponse(company);
    }
}
