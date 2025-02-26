package com.kh.javaray.funding.businessinfo.model.dto;

import java.time.LocalDate;

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
public class BusinessNoDTO {
	
	@NotNull(message = "사업자등록번호는 비어있을 수 없습니다.")
	private Long companyNo;
	@NotBlank(message = "상호는 비어있을 수 없습니다.")
	private String companyName;
	@NotBlank(message = "전화번호를 입력해주십시오.")
	private String phoneNo;
	@NotNull(message = "개업날짜는 비어있을 수 없습니다.")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate openingDate;
	@NotBlank(message = "사업주를 입력해주십시오.")
	private String ceoName;
	
	private String companyIntroduce;
	
	private String businessNoFileUrl;
	
	private LocalDate applicationDate;
	
	private String adminStatus;

}
