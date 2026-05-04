package com.motoshop.services.impl;

import com.motoshop.config.Constants;
import com.motoshop.mapper.ProductMapper;
import com.motoshop.mapper.VariantMapper;
import com.motoshop.models.*;
import com.motoshop.repositories.*;
import com.motoshop.services.ProductService;
import com.motoshop.utils.Utils;
import com.motoshop.mapper.ProductImageMapper;
import com.motoshop.web.dto.request.*;
import com.motoshop.web.dto.response.ProductResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ProductMapper productMapper;
    private final VariantMapper variantMapper;
    private final VariantRepository variantRepository;
    private final ProductImageMapper productImageMapper;
    private final CategoryRepository categoryRepository;
    private final SaleRepository saleRepository;
    private final ProductImageRepository productImageRepository;
    private final Utils utils;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository,
                              UserRepository userRepository,
                              ProductMapper productMapper,
                              VariantMapper variantMapper,
                              VariantRepository variantRepository,
                              ProductImageMapper productImageMapper,
                              CategoryRepository categoryRepository,
                              SaleRepository saleRepository,
                              ProductImageRepository productImageRepository,
                              Utils utils) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.productMapper = productMapper;
        this.variantMapper = variantMapper;
        this.variantRepository = variantRepository;
        this.productImageMapper = productImageMapper;
        this.categoryRepository = categoryRepository;
        this.saleRepository = saleRepository;
        this.productImageRepository = productImageRepository;
        this.utils = utils;
    }

    @Override
    public Pair<List<ProductResponse>, Integer> getProducts(int pageNo, int pageSize, String sortBy) {
        if (pageNo < 1) {
            pageNo = 1;
        }
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, Sort.by(sortBy).descending());
        Page<Product> products = productRepository.findAllByStatus(pageable, Constants.ACTIVE_STATUS);
        int total = (int) products.getTotalElements();
        List<ProductResponse> productResponses = products.getContent().stream()
                .map(productMapper::mapModelToResponse)
                .toList();
        return Pair.of(productResponses, total);
    }

    @Override
    @Transactional
    public Pair<List<ProductResponse>, Integer> getALLProducts(String brand, String vehicleType, String condition,
                                                               Integer minPrice, Integer maxPrice,
                                                               Long categoryId, Long saleId,
                                                               int pageNo, int pageSize, String sortBy, boolean desc) {
        Sort.Direction sortDirection = desc ? Sort.Direction.DESC : Sort.Direction.ASC;
        if (pageNo < 1) {
            pageNo = 1;
        }
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sortDirection, sortBy);

        Page<Product> products = productRepository.getAllProducts(
                (brand == null || brand.isEmpty()) ? null : brand,
                (vehicleType == null || vehicleType.isEmpty()) ? null : vehicleType,
                (condition == null || condition.isEmpty()) ? null : condition,
                (minPrice == null || minPrice == 0) ? null : minPrice,
                (maxPrice == null || maxPrice == 0) ? null : maxPrice,
                (categoryId == null || categoryId == 0L) ? null : categoryId,
                (saleId == null || saleId == 0L) ? null : saleId,
                pageable
        );
        int total = (int) products.getTotalElements();
        List<ProductResponse> productResponses = products.getContent().stream()
                .map(productMapper::mapModelToResponse)
                .toList();
        return Pair.of(productResponses, total);
    }

    @Override
    public ProductResponse getProduct(long productId) {
        Product product = productRepository.findByIdAndStatus(productId, Constants.ACTIVE_STATUS);
        product.setVisited(product.getVisited() + 1);
        productRepository.save(product);
        return productMapper.mapModelToResponse(product);
    }

    @Override
    public ProductResponse getProductAdmin(long productId) {
        Product product = productRepository.findById(productId).orElseThrow();
        return productMapper.mapModelToResponse(product);
    }

    @Override
    public ProductResponse getProductByName(String name) {
        Product product = productRepository.findByName(name);
        return productMapper.mapModelToResponse(product);
    }

    @Override
    public Pair<List<ProductResponse>, Integer> getProductsByKeyword(String keyword, int pageNo, int pageSize, String sortBy) {
        if (pageNo < 1) {
            pageNo = 1;
        }
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, Sort.by(sortBy).descending());
        Page<Product> products = productRepository.searchAllByKeyword(keyword, pageable);
        int total = (int) products.getTotalElements();
        List<ProductResponse> productResponses = products.getContent().stream()
                .map(productMapper::mapModelToResponse)
                .toList();
        return Pair.of(productResponses, total);
    }

    @Override
    public Pair<List<ProductResponse>, Integer> getProductsByPrice(int minPrice, int maxPrice, int pageNo, int pageSize, String sortBy) {
        if (pageNo < 1) {
            pageNo = 1;
        }
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, Sort.by(sortBy).descending());
        Page<Product> products = productRepository.searchAllByPrice(minPrice, maxPrice, pageable);
        int total = (int) products.getTotalElements();
        List<ProductResponse> productResponses = products.getContent().stream()
                .map(productMapper::mapModelToResponse)
                .toList();
        return Pair.of(productResponses, total);
    }

    @Override
    public Pair<List<ProductResponse>, Integer> searchProduct(String brand, String vehicleType, Integer minPrice, Integer maxPrice, long categoryId, int pageNo, int pageSize, String sortBy) {
        if (pageNo < 1) {
            pageNo = 1;
        }
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, Sort.by(sortBy).descending());
        Page<Product> products = productRepository.searchProductInCategory(brand, vehicleType, minPrice, maxPrice, categoryId, pageable);
        int total = (int) products.getTotalElements();
        List<ProductResponse> productResponses = products.getContent().stream()
                .map(productMapper::mapModelToResponse)
                .toList();
        return Pair.of(productResponses, total);
    }

    @Override
    public Pair<List<ProductResponse>, Integer> getALLProductsAdmin(String keyword, Integer status, Integer minPrice, Integer maxPrice,
                                                                    Long categoryId, int pageNo, int pageSize, String sortBy, boolean desc) {
        Sort.Direction sortDirection = desc ? Sort.Direction.DESC : Sort.Direction.ASC;
        if (pageNo < 1) {
            pageNo = 1;
        }
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sortDirection, sortBy);
        Page<Product> products = productRepository.getAllProductsAdmin(keyword, status, minPrice, maxPrice, categoryId, pageable);
        int total = (int) products.getTotalElements();
        List<ProductResponse> productResponses = products.getContent().stream()
                .map(productMapper::mapModelToResponse)
                .toList();
        return Pair.of(productResponses, total);
    }

    @Override
    public Pair<List<ProductResponse>, Integer> getProductsByCategory(long categoryId, int pageNo, int pageSize, String sortBy) {
        Category category = categoryRepository.findByStatusAndIdAndType(Constants.ACTIVE_STATUS, categoryId, Constants.PRODUCT_TYPE);
        if (category != null) {
            if (pageNo < 1) {
                pageNo = 1;
            }
            Pageable pageable = PageRequest.of(pageNo - 1, pageSize, Sort.by(sortBy).descending());
            Page<Product> products = productRepository.findAllByProductCategoryAndStatus(pageable, category, Constants.ACTIVE_STATUS);
            int total = (int) products.getTotalElements();
            List<ProductResponse> productResponses = products.getContent().stream()
                    .map(productMapper::mapModelToResponse)
                    .toList();
            return Pair.of(productResponses, total);
        } else {
            return null;
        }
    }

    private void saveVariants(List<VariantRequest> variantRequests, Product product) {
        if (variantRequests == null || variantRequests.isEmpty()) return;
        for (VariantRequest req : variantRequests) {
            Variant variant = variantMapper.mapRequestToModel(req);
            variant.setSold(0);
            variant.setProduct(product);
            variantRepository.save(variant);
        }
    }

    private void updateVariants(List<VariantRequest> variantRequests, Product product) {
        if (variantRequests == null) return;
        List<Variant> existing = variantRepository.findByProduct(product);
        Set<Long> requestIds = variantRequests.stream()
                .filter(r -> r.getId() != null && r.getId() > 0)
                .map(VariantRequest::getId)
                .collect(Collectors.toSet());

        // Delete variants not in request
        existing.stream()
                .filter(v -> !requestIds.contains(v.getId()))
                .forEach(variantRepository::delete);

        for (VariantRequest req : variantRequests) {
            if (req.getId() != null && req.getId() > 0) {
                Variant variant = variantRepository.findById(req.getId()).orElseThrow();
                variantMapper.updateModel(variant, req);
                variantRepository.save(variant);
            } else {
                Variant variant = variantMapper.mapRequestToModel(req);
                variant.setSold(0);
                variant.setProduct(product);
                variantRepository.save(variant);
            }
        }
    }

    @Override
    @Transactional
    public ProductResponse createProduct(ProductRequest productRequest) {
        long lastId = -1;
        try {
            lastId = productRepository.findNewestId();
        } catch (Exception ignored) {
        }
        String productName = productRequest.getName();
        String sku = generateSkuFromProductName(productName, lastId);
        Product product = productMapper.mapRequestedToModel(productRequest);
        product.setSalePrice(productRequest.getPrice());
        product.setSku(sku);
        Date currentDate = new Date();
        product.setCreatedDate(currentDate);
        product.setModifiedDate(currentDate);
        product.setStatus(1);
        product.setProductImages(null);

        Product newProduct = productRepository.save(product);
        long productId = newProduct.getId();

        saveVariants(productRequest.getVariants(), newProduct);

        for (ProductImageRequest pImg : productRequest.getImages()) {
            ProductImage image = new ProductImage();
            image.setUrl(pImg.getUrl());
            image.setProduct(productRepository.findById(productId).orElseThrow());
            productImageRepository.save(image);
        }

        Product product1 = productRepository.findById(productId).orElseThrow();
        List<ProductImage> productImages = productImageRepository.findByProduct(product1);
        product1.setProductImages(productImages);
        List<Variant> variants = variantRepository.findByProduct(product1);
        product1.setVariants(variants);
        return productMapper.mapModelToResponse(product1);
    }

    @Override
    @Transactional
    public ProductResponse updateProduct(ProductUDRequest productRequest) {
        Product product = productRepository.findById(productRequest.getId()).orElseThrow();
        List<ProductImageUDRequest> imageRequests = productRequest.getImages();
        List<ProductImage> productImages = productImageRepository.findByProduct(product);
        Category category = categoryRepository.findById(productRequest.getCategoryId()).orElseThrow();
        User user = userRepository.findById(productRequest.getUserId()).orElseThrow();
        int currentSalePrice = product.getSalePrice();
        productMapper.updateModel2(product, productRequest);
        product.setProductCategory(category);
        product.setProductAuthor(user);
        product.setSalePrice(currentSalePrice);
        Date currentDate = new Date();
        product.setModifiedDate(currentDate);
        product.setProductImages(productImages);
        Product uDProduct = productRepository.save(product);
        long productId = uDProduct.getId();

        updateVariants(productRequest.getVariants(), uDProduct);

        if (imageRequests != null) {
            List<ProductImage> existingImages = productImageRepository.findByProduct(product);
            List<ProductImage> newImages = new ArrayList<>();
            for (ProductImageUDRequest imageRequest : imageRequests) {
                if (imageRequest.getId() == 0) {
                    ProductImage newImage = new ProductImage();
                    newImage.setUrl(imageRequest.getUrl());
                    newImage.setProduct(product);
                    ProductImage image = productImageRepository.save(newImage);
                    newImages.add(image);
                } else {
                    ProductImage existingImage = productImageRepository.findById(imageRequest.getId()).orElseThrow();
                    existingImage.setUrl(imageRequest.getUrl());
                }
            }
            existingImages.addAll(newImages);
        }
        Product product1 = productRepository.findById(productId).orElseThrow();
        List<ProductImage> productImagess = productImageRepository.findByProduct(product1);
        product1.setProductImages(productImagess);
        List<Variant> variants = variantRepository.findByProduct(product1);
        product1.setVariants(variants);
        return productMapper.mapModelToResponse(product);
    }

    @Override
    public ProductResponse hideProduct(long id) {
        Product product = productRepository.findById(id).orElseThrow();
        Date currentDate = new Date();
        product.setModifiedDate(currentDate);
        if (product.getStatus() == 1) {
            product.setStatus(0);
        }
        productRepository.save(product);
        return productMapper.mapModelToResponse(product);
    }

    @Override
    public ProductResponse showProduct(long id) {
        Product product = productRepository.findById(id).orElseThrow();
        Date currentDate = new Date();
        product.setModifiedDate(currentDate);
        if (product.getStatus() == 0) {
            product.setStatus(1);
        }
        productRepository.save(product);
        return productMapper.mapModelToResponse(product);
    }

    @Override
    public void deleteProduct(long id) {
        Product product = productRepository.findById(id).orElseThrow();
        product.setSale(null);
        product.setProductAuthor(null);
        product.setProductCategory(null);
        productRepository.save(product);
        productRepository.delete(product);
    }

    @Override
    public Pair<List<ProductResponse>, Integer> getProductBySaleId(Long saleId, int pageNo, int pageSize, String sortBy) {
        Sale sale = saleRepository.findById(saleId).orElseThrow();
        if (pageNo < 1) {
            pageNo = 1;
        }
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, Sort.by(sortBy).descending());
        Page<Product> products = productRepository.findAllBySaleAndStatus(sale, pageable, Constants.ACTIVE_STATUS);
        int total = (int) products.getTotalElements();
        List<ProductResponse> productResponses = products.getContent().stream()
                .map(productMapper::mapModelToResponse)
                .toList();
        return Pair.of(productResponses, total);
    }

    @Override
    @Transactional
    public List<ProductResponse> getRelatedProducts(Long categoryId, int limit) {
        List<Product> products = productRepository.findRelatedProducts(categoryId, limit);
        if (products.isEmpty()) {
            return null;
        }
        return products.stream()
                .map(productMapper::mapModelToResponse)
                .toList();
    }

    @Override
    @Transactional
    public List<ProductResponse> getRandomProducts() {
        List<Product> products = productRepository.getRandomProducts();
        return products.stream()
                .map(productMapper::mapModelToResponse)
                .toList();
    }

    @Override
    public Pair<List<ProductResponse>, Integer> getBestSellerProducts(int pageNo, int pageSize, String sortBy) {
        if (pageNo < 1) {
            pageNo = 1;
        }
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, Sort.by(sortBy).descending());
        Page<Product> products = productRepository.getBestSellerProducts(pageable);
        int total = (int) products.getTotalElements();
        List<ProductResponse> productResponses = products.getContent().stream()
                .map(productMapper::mapModelToResponse)
                .toList();
        return Pair.of(productResponses, total);
    }

    @Override
    public Pair<List<ProductResponse>, Integer> getProductByQuantity(boolean isActive, int pageNo, int pageSize, String sortBy) {
        if (pageNo < 1) {
            pageNo = 1;
        }
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, Sort.by(sortBy).descending());
        Page<Product> products = productRepository.getProductByQuantity(isActive, pageable);
        int total = (int) products.getTotalElements();
        List<ProductResponse> productResponses = products.getContent().stream()
                .map(productMapper::mapModelToResponse)
                .toList();
        return Pair.of(productResponses, total);
    }

    @Override
    public List<ProductResponse> getProductBySaleAdmin(String keyword, Long saleId) {
        List<Product> product = productRepository.findBySaleIdAndKeyword(keyword, saleId);
        return product.stream()
                .map(productMapper::mapModelToResponse)
                .toList();
    }

    @Override
    public List<ProductResponse> getProductBySale() {
        List<Product> product = productRepository.findBySale();
        return product.stream()
                .map(productMapper::mapModelToResponse)
                .toList();
    }

    @Override
    public Pair<List<ProductResponse>, Integer> getProductNoSale(String keyword, int pageNo, int pageSize, String sortBy) {
        if (pageNo < 1) {
            pageNo = 1;
        }
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, Sort.by(sortBy).descending());
        Page<Product> products = productRepository.getProductNoSale(keyword, pageable);
        int total = (int) products.getTotalElements();
        List<ProductResponse> productResponses = products.getContent().stream()
                .map(productMapper::mapModelToResponse)
                .toList();
        return Pair.of(productResponses, total);
    }

    @Override
    public Long totalProduct() {
        return productRepository.totalProducts();
    }

    @Override
    public List<ProductResponse> getProductsByCategoryId(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (category == null) {
            return new ArrayList<>();
        }
        List<Product> allProducts = new ArrayList<>();
        getAllProductsFromCategoryAndChildren(category, allProducts);
        return allProducts.stream()
                .map(productMapper::mapModelToResponse)
                .toList();
    }

    private void getAllProductsFromCategoryAndChildren(Category category, List<Product> productList) {
        productList.addAll(category.getProducts());
        for (Category childCategory : category.getChildCategories()) {
            getAllProductsFromCategoryAndChildren(childCategory, productList);
        }
    }

    private String removeAccentsAndToUpper(String input) {
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        String withoutAccents = normalized.replaceAll("[^\\p{ASCII}]", "");
        return withoutAccents.toUpperCase();
    }

    private String generateSkuFromProductName(String productName, long lastId) {
        String[] words = productName.split("\\s+");
        StringBuilder skuBuilder = new StringBuilder();
        for (String word : words) {
            if (!word.isEmpty()) {
                String cleanedWord = removeAccentsAndToUpper(word);
                char firstChar = cleanedWord.charAt(0);
                skuBuilder.append(firstChar);
            }
        }
        skuBuilder.append(lastId + 1);
        return skuBuilder.toString();
    }
}
