package com.kh.javaray.funding.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class FundingOptionDTO {

	private Long optionNo;
	@NotNull
	private Long refBno;
	private int id;
	@NotBlank(message = "제목을 입력해주십시오.")
	private String title;
	@NotBlank(message = "내용을 입력해주십시오.")
	private String content;
	@NotBlank(message = "가격을 입력해주십시오.")
	private String price;
	@NotBlank(message = "수량을 입력해주십시오.")
	private String count;
	
}