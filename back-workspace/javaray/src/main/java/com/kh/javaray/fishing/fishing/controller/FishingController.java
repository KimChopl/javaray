package com.kh.javaray.fishing.fishing.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.javaray.fishing.fishing.model.dto.FishingDTO;
import com.kh.javaray.fishing.fishing.model.service.FishingService;

import jakarta.validation.Valid;
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
	
	
	
	@GetMapping("detail")
	public ResponseEntity<FishingDTO> findById(@RequestParam(name="fishingNo") Long fishingNo){
		  FishingDTO fishingDetail = service.findById(fishingNo);
		  log.info("controller fishingDetail:{}", fishingDetail);
		  return ResponseEntity.ok(fishingDetail);
	}

	
}
