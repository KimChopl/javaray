package com.kh.javaray.fishing.review.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.kh.javaray.fishing.review.model.dto.ReviewDTO;

@Mapper
public interface FishingReviewMapper {

	void insertReview(ReviewDTO fishingReview);

}
