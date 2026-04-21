package com.motoshop.services;

import com.motoshop.web.dto.request.CategoryRequest;
import com.motoshop.web.dto.response.CategoryResponse;
import com.motoshop.web.dto.response.OrdersResponse;
import org.springframework.data.util.Pair;

import java.util.List;

public interface CategoryService {
    Pair<List<CategoryResponse>, Integer> getCategories(int pageNo, int pageSize, String sortBy);
    CategoryResponse getCategoryByName(String title);
    Pair<List<CategoryResponse>, Integer> getAllCategory(String keyword,Integer status,Integer type, int pageNo, int pageSize, String sortBy, boolean desc);
    List<CategoryResponse> getAllCategoryAdmin();
    List<CategoryResponse> getCategoriesByType(int type);
    List<CategoryResponse> getCategoriesByParentCategory(Long parentId);
    CategoryResponse getCategoryById (long id);
    List<CategoryResponse> getParentCategory();
    CategoryResponse getCategoryAdmin (long id);
    CategoryResponse createCategory(CategoryRequest categoryRequest);
    CategoryResponse updateCategory(long id, CategoryRequest categoryRequest);
    String hideCategory(long id);
    String showCategory(long id);
    void deleteCategory(long id);

}
