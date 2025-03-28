package com.kh.javaray.funding.businessinfo.model.dto;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
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
public class BusinessNoAPIDTO {

	@NotBlank(message = "사업자등록번호는 비어있을 수 없습니다.")
	@Pattern(regexp = "^[0-9]*$", message = "사업자등록번호는 숫자만 입력하셔야 합니다." )
	@Size(min = 10, max = 10, message = "사업자등록번호는 10자리만 입력가능합니다.")
	private String companyBusinessNo;
	
	private String resultContent;
	
	@Digits(integer = 10, fraction = 0, message = "등록되어 있지 않은 사업자등록번호입니다..")
	private Long resultCode;
	
	@NotBlank(message = "신청 게시글 작성자는 비어있을 수 없습니다.")
	private String boardWriter;
}
