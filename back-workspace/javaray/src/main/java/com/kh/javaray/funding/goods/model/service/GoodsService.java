package com.kh.javaray.funding.goods.model.service;

import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.funding.model.dto.FundingBoardDTO;

public interface GoodsService {

	Long insertGoods(FundingBoardDTO goodsFormData, String categoryName, MultipartFile file, MultipartFile[] files);

}
