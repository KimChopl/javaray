package com.kh.javaray.funding.model.dto;

import java.time.LocalDate;
import java.util.List;

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
public class FundingBoardDTO {

	private Long boardNo;
	private FundingCategoryDTO fundingCategory;
	private String boardTitle;
	private String boardContent;
	private LocalDate startDate;
	private LocalDate endDate;
	private String status;
	private Long purposeAmount;
	private List<FundingOptionDTO> fundingOptionList;
	private List<FundingFileDTO> fundingFileList;
}
