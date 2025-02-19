package com.kh.javaray.funding.goods.model.dto;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

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
public class GoodsFormDTO {
	
	@NotNull
	private String boardWriter;
	@NotBlank
	private String categoryName;
	@NotBlank
	private String goodsTitle;
	@NotBlank
	private String goodsContent;
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
	private LocalDateTime saleStartDate;
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
	private LocalDateTime saleFinishDate;
	private Long amountOfMoney;
	private String subFileUrl;

}
