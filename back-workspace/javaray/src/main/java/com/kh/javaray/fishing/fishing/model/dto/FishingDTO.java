package com.kh.javaray.fishing.fishing.model.dto;

import java.util.List;

import com.kh.javaray.fishing.amenities.model.dto.AmenitiesDTO;
import com.kh.javaray.fishing.day.model.dto.DayDTO;
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
	private String fishingWriter; // 회원 닉네임
	
	@NotBlank(message="낚시명은 비어있을 수 없습니다.")
	@Size(min=3, max=10, message="낚시터명은 10자 이하만 사용가능합니다.")
	private String fishingName;
	
	@NotBlank(message="주소는 비어있을 수 없습니다.")
	private String address;
	
	@NotBlank(message="낚시터 전화번호는 비어있을 수 없습니다.")
	private String phone;
	
	private List<DayDTO> dayList; // 영업요일
	
	@NotBlank(message="영업시작 시간은 비어있을 수 없습니다.")
	private String startTime;
	
	@NotBlank(message="영업종료 시간은 비어있을 수 없습니다.")
	private String endTime; 
	
	@NotBlank(message="사장님 소개는 비어있을 수 없습니다.")
	@Size(min=10, message="사장님 소개는 10자 이상 작성해주세요.")	
	private String introduce;
	
	private Double lat;
	private Double lng;
	private char status;
	private String fishingFileUrl;
	
	private List<FishDTO> fishList;
	private List<AmenitiesDTO> amenitiesList;
	private List<ProductDTO> product;

}
