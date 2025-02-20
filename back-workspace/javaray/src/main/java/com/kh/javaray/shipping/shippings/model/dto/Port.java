package com.kh.javaray.shipping.shippings.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Setter
public class Port {
	private String ShippingNo;
	private String portNo;
	private double lat;
	private double lon;
	private String address;
	private String detailAddress;
	private String spotCode;
}
