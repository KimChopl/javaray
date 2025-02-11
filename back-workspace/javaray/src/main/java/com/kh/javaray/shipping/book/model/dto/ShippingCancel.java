package com.kh.javaray.shipping.book.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
@Builder
public class ShippingCancel {
	private String bookNo;
	private String cancelReason;
	private String cancelDate; 
	private String cancelMemberType;
}
