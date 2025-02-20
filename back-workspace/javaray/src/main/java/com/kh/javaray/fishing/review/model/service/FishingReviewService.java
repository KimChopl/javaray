package com.kh.javaray.fishing.review.model.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.fishing.review.model.dto.ReviewDTO;


public interface FishingReviewService {

	void insertReview(ReviewDTO fishingReview, MultipartFile file);

	List<ReviewDTO> findReview(int page, Long fishingNo);
		
}
