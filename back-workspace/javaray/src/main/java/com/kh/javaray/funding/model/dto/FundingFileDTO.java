package com.kh.javaray.funding.model.dto;

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
public class FundingFileDTO {

	private Long refBno;
	private Long fileLevel;
	private String fileUrl;

}