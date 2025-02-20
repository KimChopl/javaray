package com.kh.javaray.fishing.day.model.dto;

import com.kh.javaray.fishing.fish.model.dto.FishDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class DayDTO {
	private int dayNo;
	private String day;
	private Long fishingNo;

}
