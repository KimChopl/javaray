package com.kh.javaray.fishing.review.model.service;

import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.fishing.review.model.dto.ReviewDTO;


public interface FishingReviewService {

	void insertReview(ReviewDTO fishingReview, MultipartFile file);
		
}
