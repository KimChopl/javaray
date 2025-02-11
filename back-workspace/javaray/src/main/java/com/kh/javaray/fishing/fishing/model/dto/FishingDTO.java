package com.kh.javaray.fishing.fishing.model.dto;

import java.util.List;

import com.kh.javaray.fishing.amenities.model.dto.AmenitiesDTO;
import com.kh.javaray.fishing.fish.model.dto.FishDTO;
import com.kh.javaray.fishing.product.model.dto.ProductDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
public class FishingDTO {
	
	private Long fishingNo;
	private String fishingWriter;
	private String nickName;
	
	@NotBlank(message="낚시명은 비어있을 수 없습니다.")
	@Size(min=3, max=10, message="낚시터명은 10자 이하만 사용가능합니다.")
	private String fishingName;
	
	@NotBlank(message="낚시터 전화번호는 비어있을 수 없습니다.")
	private String phone;
	
	@NotBlank(message="영업시작 시간은 비어있을 수 없습니다.")
	private String startTime;
	
	@NotBlank(message="영업종료 시간은 비어있을 수 없습니다.")
	private String endTime;
	
	private String introduce;
	private Long lat;
	private Long lng;
	private char status;
	private String fishingFileUrl;
	private List<FishDTO> fish;
	private List<AmenitiesDTO> amenities;
	private List<ProductDTO> product;

}
