package com.motoshop.repositories;

import com.motoshop.models.Article;
import com.motoshop.models.ArticleImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleImageRepository extends JpaRepository<ArticleImage, Long> {
	List<ArticleImage> findAllByArticle(Article article);
}

