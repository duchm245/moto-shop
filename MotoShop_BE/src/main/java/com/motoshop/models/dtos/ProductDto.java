package com.motoshop.models.dtos;

import com.motoshop.web.dto.response.ColorResponse;
import com.motoshop.web.dto.response.ProductImageResponse;
import lombok.*;

import java.sql.Date;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductDto {
	private Long id;

	private String name;

	private String description;

	private String sku;

	private String material;

	private int visited;

	private int price;

	private int salePrice;

	private Date modifiedDate;

	private Date createdDate;

	private int status;

	private long author;

	private long category;

	private long sale;

	private List<ColorDto> colors;

	private List<ProductImageDto> images;
}
