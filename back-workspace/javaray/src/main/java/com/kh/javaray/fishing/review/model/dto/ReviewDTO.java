package com.kh.javaray.fishing.review.model.dto;

import java.sql.Date;

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
public class ReviewDTO {
	
	private Long reviewNo;
	private String userId;
	private String nickName;
	
	@NotBlank(message="제목은 비어있을 수 없습니다.")
	@Size(min = 3, max=30, message="리뷰 제목은 30자 이하만 가능합니다.")
	private String title;
	
	@NotBlank(message="리뷰 내용은 비어있을 수 없습니다.")
	@Size(min = 30, max=300, message="리뷰 내용은 30자 이상 300자 이하만 가능합니다.")
	private String content;
	private String reviewFileUrl;
	private Date createDate;
	private char status;

}
