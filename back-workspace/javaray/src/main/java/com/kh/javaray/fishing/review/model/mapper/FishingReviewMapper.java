package com.kh.javaray.fishing.review.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import com.kh.javaray.fishing.review.model.dto.ReviewDTO;

@Mapper
public interface FishingReviewMapper {

	void insertReview(ReviewDTO fishingReview);

	List<ReviewDTO> findReview(@Param("fishingNo") Long fishingNo, RowBounds rowBounds);


}
