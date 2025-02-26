package com.kh.javaray.funding.goods.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.auth.service.AuthenticationService;
import com.kh.javaray.exception.exceptions.FailUpdateUserInfoException;
import com.kh.javaray.funding.goods.model.mapper.GoodsMapper;
import com.kh.javaray.funding.model.dto.FundingBoardDTO;
import com.kh.javaray.funding.model.dto.FundingCategoryDTO;
import com.kh.javaray.funding.model.dto.FundingFileDTO;
import com.kh.javaray.funding.model.dto.FundingOptionDTO;
import com.kh.javaray.funding.model.mapper.FundingMapper;
import com.kh.javaray.funding.model.service.FundingFileService;
import com.kh.javaray.member.model.dto.CustomUserDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GoodsServiceImpl implements GoodsService {

	private final GoodsMapper goodsMapper;
	private final AuthenticationService authService;
	private final FundingFileService fundingFileService;
	private final FundingMapper fundingMapper;
	
	@Override
	@Transactional
	public Long insertGoods(FundingBoardDTO goodsFormData, String categoryName, MultipartFile file, MultipartFile[] files) {

		CustomUserDetails user = authService.checkedUser();
		authService.validWriter(String.valueOf(goodsFormData.getNickName()), String.valueOf(user.getNickname()));
		goodsFormData.setUserNo(user.getUserNo());
		
		FundingCategoryDTO categoryDTO = new FundingCategoryDTO();
		categoryDTO.setCategoryName(categoryName);
		
		List<FundingCategoryDTO> categoryList = fundingMapper.selectCategory();
		for(int i = 0; i < categoryList.size(); i++) {
			if(categoryList.get(i).getCategoryName().equals(categoryName)) {
				categoryDTO.setCategoryNo(categoryList.get(i).getCategoryNo());
			}
		}
		goodsFormData.setFundingCategory(categoryDTO);
		
		List<FundingFileDTO> list = new ArrayList();
		
		if(file != null && !file.isEmpty()) {
			FundingFileDTO fundingFileDTO = new FundingFileDTO();
			String filePath = fundingFileService.store(file);
			fundingFileDTO.setFileLevel(1L);
			fundingFileDTO.setFileUrl(filePath);
			list.add(fundingFileDTO);
			goodsFormData.setFundingFileList(list);
		} else {
			throw new FailUpdateUserInfoException("메인 사진이 없어서 신청이 불가합니다.");
		}
		
		if(files != null && !(files.length == 0)) {
			for(int i=0; i < files.length; i++) {
				FundingFileDTO fundingFileDTO = new FundingFileDTO();
				String filePath = fundingFileService.store(files[i]);
				fundingFileDTO.setFileLevel((long)i + 2);
				fundingFileDTO.setFileUrl(filePath);
				list.add(fundingFileDTO);
				goodsFormData.setFundingFileList(list);
			}
		}
		
		goodsMapper.insertBoard(goodsFormData);
		for(int i= 0; i < list.size(); i++) {
			goodsMapper.insertBoardFiles(list.get(i));
		}
		
		return goodsFormData.getBoardNo();
	}

	@Override
	public void insertGoodsOptions(List<FundingOptionDTO> optionList, Long boardNo) {
		
		for(int i = 0; i < optionList.size(); i++) {
			optionList.get(i).setRefBno(boardNo);
			goodsMapper.insertBoardOption(optionList.get(i));
		}
	}
}
