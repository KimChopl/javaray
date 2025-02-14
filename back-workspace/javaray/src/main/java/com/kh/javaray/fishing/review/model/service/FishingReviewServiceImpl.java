package com.kh.javaray.fishing.review.model.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.auth.service.AuthenticationService;
import com.kh.javaray.fishing.review.model.dto.ReviewDTO;
import com.kh.javaray.fishing.review.model.mapper.FishingReviewMapper;
import com.kh.javaray.member.model.dto.CustomUserDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
@Service
public class FishingReviewServiceImpl implements FishingReviewService {
	
	private FishingReviewMapper reviewMapper;
	private ReviewFileService fileService;
	private AuthenticationService authService;

	@Override
	public void insertReview(ReviewDTO fishingReview, MultipartFile file) {
		
		CustomUserDetails user = authService.checkedUser();
		
		authService.validWriter(fishingReview.getUserId(), user.getUsername()); // 아이디로 작성자랑 로그인자 확인
		
		if(file != null && !file.isEmpty()) {
			String filePath = fileService.store(file);
			fishingReview.setReviewFileUrl(filePath);
		}else {
			fishingReview.setReviewFileUrl(null);
		}
		fishingReview.setUserNo(user.getUserNo());
		
		reviewMapper.insertReview(fishingReview);
	}

}
