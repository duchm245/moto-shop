package com.motoshop.services.impl;

import com.motoshop.models.ProductComment;
import com.motoshop.models.User;
import com.motoshop.repositories.ProductCommentRepository;
import com.motoshop.repositories.UserRepository;
import com.motoshop.services.ProductCommentService;
import com.motoshop.web.dto.request.ProductCommentRequest;
import com.motoshop.web.dto.response.ProductCommentResponse;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductCommentServiceImpl implements ProductCommentService {

    private final ProductCommentRepository commentRepository;
    private final UserRepository userRepository;

    public ProductCommentServiceImpl(ProductCommentRepository commentRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<ProductCommentResponse> getCommentsByProductId(Long productId) {
        return commentRepository.findByProductIdOrderByCreatedDateDesc(productId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProductCommentResponse addComment(ProductCommentRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        ProductComment comment = new ProductComment();
        comment.setProductId(request.getProductId());
        comment.setUser(user);
        comment.setRating(Math.max(1, Math.min(5, request.getRating())));
        comment.setContent(request.getContent().trim());
        comment.setCreatedDate(new Date());

        return mapToResponse(commentRepository.save(comment));
    }

    @Override
    public boolean hasUserCommented(Long userId, Long productId) {
        return commentRepository.existsByUserIdAndProductId(userId, productId);
    }

    private ProductCommentResponse mapToResponse(ProductComment comment) {
        ProductCommentResponse response = new ProductCommentResponse();
        response.setId(comment.getId());
        User user = comment.getUser();
        String displayName = (user.getFirstName() != null && !user.getFirstName().isBlank()
                && user.getLastName() != null && !user.getLastName().isBlank())
                ? user.getLastName() + " " + user.getFirstName()
                : user.getUsername();
        response.setUserName(displayName);
        response.setRating(comment.getRating());
        response.setContent(comment.getContent());
        response.setCreatedDate(comment.getCreatedDate());
        return response;
    }
}
