package com.kh.javaray.funding.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.kh.javaray.funding.model.dto.FundingBoardDTO;
import com.kh.javaray.funding.model.dto.FundingCompanyNameDTO;

@Mapper
public interface FundingMapper {

	List<FundingBoardDTO> selectBoardList(RowBounds rowBounds, int categoryNo);
	
	List<FundingCompanyNameDTO> selectCompanyName();

	List<String> selectCategory();

}
