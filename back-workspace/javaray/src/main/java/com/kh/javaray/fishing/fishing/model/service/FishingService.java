package com.kh.javaray.fishing.fishing.model.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.fishing.amenities.model.dto.AmenitiesDTO;
import com.kh.javaray.fishing.day.model.dto.DayDTO;
import com.kh.javaray.fishing.fish.model.dto.FishDTO;
import com.kh.javaray.fishing.fishing.model.dto.FishingDTO;

import jakarta.validation.Valid;

public interface FishingService {

	void fishingSave(@Valid FishingDTO fishing ,MultipartFile file, String amenities, String fish);

	List<FishingDTO> findAll(int page);

	FishingDTO findById(Long fishingNo);

}
