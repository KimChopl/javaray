package com.kh.javaray.shipping.review.model.dto;

import java.sql.Date;

import com.kh.javaray.member.model.dto.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
@Builder
public class Review {
	private String reviewNo;
	private String reviewContent;
	private Date createDate;
	private double rating;
	private Member reviewMember;
}
