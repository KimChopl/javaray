package com.kh.javaray.shipping.book.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegistBook {
	
	private String shippingNo;
	private String playDate;
	private String bookContent;
	private Long userNo;
	private int inPeople;
	
}
