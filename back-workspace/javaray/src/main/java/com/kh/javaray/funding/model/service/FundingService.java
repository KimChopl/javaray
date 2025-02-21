package com.kh.javaray.funding.model.service;

import java.util.List;

import com.kh.javaray.funding.model.dto.FundingBoardDTO;
import com.kh.javaray.funding.model.dto.FundingCategoryDTO;
import com.kh.javaray.funding.model.dto.FundingCategoryDTO;

public interface FundingService {



	List<FundingBoardDTO> selectFundingListHasToken(int page, int categoryNo);

	List<FundingBoardDTO> selectFundingListHasNoneToken(int page, int categoryNo);

	List<FundingCategoryDTO> selectCategory();

}
