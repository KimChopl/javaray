package com.kh.javaray.fishing.amenities.model.dto;

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
public class AmenitiesDTO {
	
	private Long amenitiesNo;
	private String amenitiesName;
	

}
