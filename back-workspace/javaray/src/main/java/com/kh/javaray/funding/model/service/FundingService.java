package com.kh.javaray.funding.model.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.funding.model.dto.BusinessNoDTO;
import com.kh.javaray.funding.model.dto.FundingBoardDTO;
import com.kh.javaray.funding.model.dto.FundingBusinessNoAPIDTO;

public interface FundingService {

	void save(FundingBusinessNoAPIDTO BusinessNoAPIData);

	FundingBusinessNoAPIDTO  selectBusinessNo();

	void insertBoard(BusinessNoDTO businessNoData, MultipartFile file);

	String selectFundingListHasToken(int page);

	List<FundingBoardDTO> selectFundingListHasNoneToken(int page, int categoryNo);

}
