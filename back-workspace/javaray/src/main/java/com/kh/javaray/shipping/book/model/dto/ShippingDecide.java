package com.kh.javaray.shipping.book.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
@Builder
public class ShippingDecide {
	private String bookNo;
	private String captainComment;
	private String bookDecideDate;
}
