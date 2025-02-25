package com.kh.javaray.fishing.fishing.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.fishing.amenities.model.dto.AmenitiesDTO;
import com.kh.javaray.fishing.fish.model.dto.FishDTO;


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
	
	//낚시터 등록
	@PostMapping("/insert")
	public ResponseEntity<?> fishingSave(@ModelAttribute @Valid FishingDTO fishing
										, @RequestParam(name="amenities") String amenities
										, @RequestParam(name="fish") String fish
										, @RequestParam(name="file", required=false)MultipartFile file){
		
		//log.info("fishing:{}, amenities:{}", fishing, amenities);
		
		service.fishingSave(fishing, file, amenities, fish);
		
		return ResponseEntity.status(HttpStatus.CREATED).body("게시물 등록 성공");
	}
	
	
	// 낚시터 list 전체조회
	@GetMapping
	public ResponseEntity<List<FishingDTO>> findAll(@RequestParam(name="page", defaultValue="0")int page){
		log.info("{}",page);
		return ResponseEntity.ok(service.findAll(page));
	}
	
	
	// 낚시터 세부 조회
	@GetMapping("detail")
	public ResponseEntity<FishingDTO> findById(@RequestParam(name="fishingNo") Long fishingNo){
		  FishingDTO fishingDetail = service.findById(fishingNo);
		  log.info("controller fishingDetail:{}", fishingDetail);
		  return ResponseEntity.ok(fishingDetail);
	}

	
}
