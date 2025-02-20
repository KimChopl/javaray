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
@Setter
@Builder
public class Fishs {
	private String shippingNo;
	private String fishNo;
	private String explaination;
	private String note;
	private String defaultSize;
	private String startOutOfSeason;
	private String endOutOfSeason;
	private String fishName;
}
