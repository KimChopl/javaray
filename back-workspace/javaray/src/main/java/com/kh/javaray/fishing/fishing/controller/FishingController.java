package com.kh.javaray.fishing.fishing.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.javaray.fishing.fishing.model.dto.FishingDTO;
import com.kh.javaray.fishing.fishing.model.service.FishingService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RestController
@Valid
@Slf4j
@RequestMapping("fishing")
public class FishingController {
	
	private final FishingService service;
	
	/*
	@PostMapping("/insert")
	public ResponseEntity<?> fishingSave(@ModelAttribute @Valid FishingDTO fishing, AmenitiesDTO amenities, FishDTO fish, @RequestParam(name="file", required=false)MultipartFile file){
		
		service.fishingSave(fishing, amenities, fish , file);
		
		return ResponseEntity.status(HttpStatus.CREATED).body("게시물 등록 성공");
		
	}
	*/
	
	@GetMapping
	public ResponseEntity<List<FishingDTO>> findAll(@RequestParam(name="page", defaultValue="0")int page){
		log.info("{}",page);
		return ResponseEntity.ok(service.findAll(page));
	}
	
	@GetMapping("detail/{id}")
	public ResponseEntity<List<FishingDTO>> findById(@RequestParam(name="id")@Min(value=1, message="올바르지 않은 경로입니다")Long fishingNo){
		return ResponseEntity.ok(service.findById(fishingNo));
	}

	
}
