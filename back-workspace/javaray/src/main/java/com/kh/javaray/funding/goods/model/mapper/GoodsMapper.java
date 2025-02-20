package com.kh.javaray.funding.goods.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.kh.javaray.funding.model.dto.FundingBoardDTO;
import com.kh.javaray.funding.model.dto.FundingFileDTO;
import com.kh.javaray.funding.model.dto.FundingOptionDTO;

@Mapper
public interface GoodsMapper {
	
	void insertBoard(FundingBoardDTO goodsFormData);
	
	void insertBoardFiles(FundingFileDTO goodsFileList);
	
	void insertBoardOption(FundingOptionDTO option);

}
