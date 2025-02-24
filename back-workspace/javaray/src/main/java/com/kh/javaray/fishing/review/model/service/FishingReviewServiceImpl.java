package com.kh.javaray.fishing.review.model.service;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
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
	
	private final FishingReviewMapper reviewMapper;
	private final ReviewFileService fileService;
	private final AuthenticationService authService;

	@Override
	public void insertReview(ReviewDTO fishingReview, MultipartFile file) {
		
		CustomUserDetails user = authService.checkedUser();
		
		authService.validWriter(fishingReview.getNickname(), user.getNickname()); // 아이디로 작성자랑 로그인자 확인
		
		if(file != null && !file.isEmpty()) {
			String filePath = fileService.store(file);
			fishingReview.setReviewFileUrl(filePath);
		}else {
			fishingReview.setReviewFileUrl(null);
		}
		
		//리뷰 작성자 번호
		fishingReview.setUserNo(user.getUserNo());
		
		// 리뷰 등록
		reviewMapper.insertReview(fishingReview);
	}

	@Override
	public List<ReviewDTO> findReview(int page, Long fishingNo) {
		
		int size = 6;
		RowBounds rowBounds = new RowBounds(page*size, size);
		return reviewMapper.findReview(fishingNo, rowBounds);
		
	}

}
