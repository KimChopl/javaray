package com.kh.javaray.funding.model.service;

import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.funding.model.dto.BusinessNoDTO;
import com.kh.javaray.funding.model.dto.FundingBusinessNoAPIDTO;

import jakarta.validation.Valid;

public interface FundingService {

	void save(FundingBusinessNoAPIDTO BusinessNoAPIData);

	FundingBusinessNoAPIDTO  selectBusinessNo();

	void insertBoard(BusinessNoDTO businessNoData, MultipartFile file);

	String selectFundingListHasToken();

	String selectFundingListHasNoneToken();

}
