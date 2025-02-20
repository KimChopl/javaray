package com.kh.javaray.fishing.fishing.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import com.kh.javaray.fishing.amenities.model.dto.AmenitiesDTO;
import com.kh.javaray.fishing.day.model.dto.DayDTO;
import com.kh.javaray.fishing.fish.model.dto.FishDTO;
import com.kh.javaray.fishing.fishing.model.dto.FishingDTO;

import jakarta.validation.Valid;

@Mapper
public interface FishingMapper {

	void fishingSave(@Valid FishingDTO fishing);

	List<FishingDTO> findAll(RowBounds rowBounds);

	List<FishDTO> findFishByFishingNos(@Param("fishingNos") List<Long> fishingNos);

	List<AmenitiesDTO> findAmenitiesByFishingNos(@Param("fishingNos") List<Long> fishingNos);

	FishingDTO findByFishingNo(@Param("fishingNo") Long fishingNo);

	List<FishDTO> findFishByFishingNo(@Param("fishingNo") Long fishingNo);

	List<AmenitiesDTO> findAmenitiesByFishingNo(@Param("fishingNo") Long fishingNo);

	void saveFish(@Valid FishingDTO fishing);

	void saveAmenities(@Valid FishingDTO fishing);

	void saveDay(@Valid FishingDTO fishing);


	

}
