package com.motoshop.web.dto.request;

import lombok.Data;

import java.util.Date;

@Data
public class CategoryRequest {
	private String title;

	private int type;
	 
	private String description;

	private String urlImage;

	private Long parentCategoryId;
}
