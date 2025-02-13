package com.kh.javaray.shipping.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MiddleWeather {
	private String regName;
	private String tmef;
	private String sky;
	private String pre;
	private String wf;
	private String wha;
	private String whb;
}
