package com.kh.javaray.shipping.book.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
@Builder
public class ShippingPlay {
	
	private String bookNo;
	private String Play;
	private String captainComment;
	private String playDecideDate;

}
