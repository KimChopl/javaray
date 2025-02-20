package com.kh.javaray.funding.model.service;

import java.util.List;

import com.kh.javaray.funding.model.dto.FundingBoardDTO;

public interface FundingService {



	List<FundingBoardDTO> selectFundingListHasToken(int page, int categoryNo);

	List<FundingBoardDTO> selectFundingListHasNoneToken(int page, int categoryNo);

	List<String> selectCategory();

}
