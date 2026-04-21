package com.motoshop.services;

import com.motoshop.web.dto.request.CompanyRequest;
import com.motoshop.web.dto.response.CompanyResponse;

public interface CompanyService {
    CompanyResponse getCompany(long companyId);
    CompanyResponse createCompanyInfo(CompanyRequest companyRequest);
    CompanyResponse updateCompanyInfo(long companyId, CompanyRequest companyRequest);
}
