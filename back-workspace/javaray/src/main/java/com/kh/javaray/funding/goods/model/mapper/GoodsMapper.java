package com.kh.javaray.funding.goods.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kh.javaray.funding.model.dto.FundingBoardDTO;
import com.kh.javaray.funding.model.dto.FundingFileDTO;

@Mapper
public interface GoodsMapper {
	
	void insertBoard(FundingBoardDTO goodsFormData);
	
	void insertBoardFiles(FundingFileDTO goodsFileList);

}
