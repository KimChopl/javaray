package com.kh.javaray.fishing.fishing.model.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.fishing.amenities.model.dto.AmenitiesDTO;
import com.kh.javaray.fishing.fish.model.dto.FishDTO;
import com.kh.javaray.fishing.fishing.model.dto.FishingDTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;

public interface FishingService {

	//void fishingSave(@Valid FishingDTO fishing, AmenitiesDTO amenities, FishDTO fish, MultipartFile file);

	List<FishingDTO> findAll(int page);

	FishingDTO findById(Long fishingNo);

}
