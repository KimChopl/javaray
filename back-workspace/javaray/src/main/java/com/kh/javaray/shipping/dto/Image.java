package com.kh.javaray.shipping.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Image {
	private Long imageNo;
	private String imagePath;
	private String imageOriginName;
	private String imageChangeName;
	private String boardNo;
	private String status;
}
