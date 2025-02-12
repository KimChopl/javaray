package com.kh.javaray.funding.model.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
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
	
	//@NotBlank
	private Long companyNo;
	//@NotBlank
	private String companyName;
	//@NotBlank
	private Long phoneNo;
	//@NotBlank
	private LocalDate openingDate;
	//@NotBlank
	private String ceoName;
	
	private String companyIntroduce;
	
	private String businessNoFileUrl;
	
	private LocalDate applicationDate;
	
	private String adminStatus;

}
