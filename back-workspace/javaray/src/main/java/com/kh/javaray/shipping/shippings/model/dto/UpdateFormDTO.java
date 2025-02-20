package com.kh.javaray.shipping.shippings.model.dto;

import java.sql.Date;
import java.util.List;

import com.kh.javaray.member.model.dto.Member;
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
public class UpdateFormDTO {
	
	private String shippingNo;
	private String shippingTitle;
	private String shippingContent;
	private int allowPepleNo;
	private int price;
	private Port port;

}
