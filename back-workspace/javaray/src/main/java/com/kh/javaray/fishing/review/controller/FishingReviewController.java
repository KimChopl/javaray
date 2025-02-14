package com.kh.javaray.fishing.review.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.fishing.review.model.dto.ReviewDTO;
import com.kh.javaray.fishing.review.model.service.FishingReviewService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RestController
@Valid
@Slf4j
@RequestMapping("fishing/review")
public class FishingReviewController {
	
	private final FishingReviewService reviewService;
	
	@PostMapping("/insert")
	public ResponseEntity<?> insertReview(@ModelAttribute @Valid ReviewDTO fishingReview,  @RequestParam(name="file", required=false)MultipartFile file){
		reviewService.insertReview(fishingReview, file);
		
		return ResponseEntity.status(HttpStatus.CREATED).body("리뷰작성완료");
		
	}
	

}
