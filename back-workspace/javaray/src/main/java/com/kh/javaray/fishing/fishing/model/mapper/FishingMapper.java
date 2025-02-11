package com.kh.javaray.fishing.fishing.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.kh.javaray.fishing.fishing.model.dto.FishingDTO;

import jakarta.validation.Valid;

@Mapper
public interface FishingMapper {

	void fishingSave(@Valid FishingDTO fishing);

	List<FishingDTO> findAll(RowBounds rowBounds);
	
	

}
