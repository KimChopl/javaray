package com.kh.javaray.funding.goods.model.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.funding.model.dto.FundingBoardDTO;
import com.kh.javaray.funding.model.dto.FundingOptionDTO;

public interface GoodsService {

	Long insertGoods(FundingBoardDTO goodsFormData, String categoryName, MultipartFile file, MultipartFile[] files);

	void insertGoodsOptions(List<FundingOptionDTO> optionList, Long boardNo);

}
