package com.kh.javaray.funding.model.dto;

import java.time.LocalDateTime;
import java.util.List;

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
public class FundingBoardDTO  {

	private Long boardNo;
	private Long userNo;
	@NotBlank(message = "닉네임을 입력해주십시오.")
	private String nickName;
	@NotBlank(message = "제목을 입력해주십시오.")
	private String boardTitle;
	@NotBlank(message = "내용을 입력해주십시오.")
	private String boardContent;
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
	private LocalDateTime startDate;
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
	private LocalDateTime endDate;
	private String status;
	@NotNull(message = "목표수량 입력해주십시오.")
	private Long purposeAmount;
	private Long currentSalePercent;
	private String companyName;
	private String role;
	private FundingCategoryDTO fundingCategory;
	private List<FundingOptionDTO> fundingOptionList;
	private List<FundingFileDTO> fundingFileList;

}
