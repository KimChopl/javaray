package com.kh.javaray.shipping.shippings.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@Builder
@ToString
public class SearchPort {

	private String option;
	private String searchContent;
}
