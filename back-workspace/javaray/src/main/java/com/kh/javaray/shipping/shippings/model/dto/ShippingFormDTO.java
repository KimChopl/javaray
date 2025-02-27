package com.kh.javaray.shipping.shippings.model.dto;

import java.util.List;

import com.kh.javaray.shipping.dto.Image;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ShippingFormDTO {
	
	private String shippingNo;
	private String shippingTitle;
	private String shippingContent;
	private int allowPeopleNo;
	private int price;
	private Long userNo;
	private Port port;
	private List<ShippingOption> options;
	private List<Image> images;
	private List<Fishs> fishs;

}
