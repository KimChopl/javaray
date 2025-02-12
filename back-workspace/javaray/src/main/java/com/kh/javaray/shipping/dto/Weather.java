package com.kh.javaray.shipping.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Weather {

	private String regName;
	private String tmef;
	private String s1;
	private String s2;
	private String wh1;
	private String wh2;
	private String wf;
	private String prep;
	
}
