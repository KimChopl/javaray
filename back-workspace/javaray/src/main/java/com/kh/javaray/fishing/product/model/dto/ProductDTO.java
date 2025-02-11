package com.kh.javaray.fishing.product.model.dto;

import com.kh.javaray.fishing.fish.model.dto.FishDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ProductDTO {
	
	private Long productNo;
	private String productName;
	private int price;
	private String productIntroduce;

}
