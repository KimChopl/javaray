package com.kh.javaray.shipping.shippings.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
@Builder
public class ShippingOption {
	private String serviceNo;
	private String serviceName;
}
