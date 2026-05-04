package com.motoshop.services;

import com.motoshop.models.Product;
import com.motoshop.web.dto.request.ProductRequest;
import com.motoshop.web.dto.request.ProductUDRequest;
import com.motoshop.web.dto.response.OrdersResponse;
import com.motoshop.web.dto.response.ProductResponse;
import org.springframework.data.util.Pair;

import java.util.List;

public interface ProductService {
    /**
     *
     */
    Pair<List<ProductResponse>, Integer> getProducts(int pageNo, int pageSize, String sortBy);

    Pair<List<ProductResponse>, Integer> getALLProducts(String brand, String vehicleType, String condition, Integer minPrice, Integer maxPrice,
                                          Long categoryId, Long saleId, int pageNo, int pageSize, String sortBy, boolean desc);

    Pair<List<ProductResponse>, Integer> getALLProductsAdmin(String keyword, Integer status, Integer minPrice, Integer maxPrice,
                                                             Long categoryId, int pageNo, int pageSize, String sortBy, boolean desc);

    ProductResponse getProduct(long productId);

    ProductResponse getProductByName(String name);

    ProductResponse getProductAdmin(long productId);

    List<ProductResponse> getProductBySaleAdmin(String Keyword, Long saleId);

    List<ProductResponse> getProductBySale();

    Pair<List<ProductResponse>, Integer> getProductsByKeyword(String keyword, int pageNo, int pageSize, String sortBy);

    Pair<List<ProductResponse>, Integer> getProductsByCategory(long categoryId, int pageNo, int pageSize, String sortBy);

    Pair<List<ProductResponse>, Integer> getProductsByPrice(int minPrice, int maxPrice, int pageNo, int pageSize, String sortBy);

    Pair<List<ProductResponse>, Integer> searchProduct(String brand, String vehicleType, Integer minPrice, Integer maxPrice, long categoryId, int pageNo, int pageSize, String sortBy);

    //    List<ProductResponse> getProductByColorSizePriceCategory(String valueSize, String valueColor, int minPrice, int maxPrice, long categoryId, int pageNo, int pageSize, String sortBy);
    ProductResponse createProduct(ProductRequest productRequest);

    ProductResponse updateProduct(ProductUDRequest productRequest);

    ProductResponse hideProduct(long id);

    ProductResponse showProduct(long id);

    void deleteProduct(long id);

    Pair<List<ProductResponse>, Integer> getProductBySaleId(Long saleId, int pageNo, int pageSize, String sortBy);

    List<ProductResponse> getRelatedProducts(Long categoryId, int limit);

    List<ProductResponse> getRandomProducts();

    Pair<List<ProductResponse>, Integer> getBestSellerProducts(int pageNo, int pageSize, String sortBy);

    Pair<List<ProductResponse>, Integer> getProductByQuantity(boolean isActive, int pageNo, int pageSize, String sortBy);

    Pair<List<ProductResponse>, Integer> getProductNoSale(String keyword, int pageNo, int pageSize, String sortBy);

    Long totalProduct();

    List<ProductResponse> getProductsByCategoryId(Long categoryId);
}
