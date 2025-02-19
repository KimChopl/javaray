package com.kh.javaray.shipping.dto;

import java.nio.file.Path;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Getter
@Setter
public class Image {
	private Long imageNo;
	private String imagePath;
	private String imageOriginName;
	private String imageChangeName;
	private String boardNo;
	private String status;
	private int imageLevel;
}
