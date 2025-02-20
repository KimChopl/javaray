package com.kh.javaray.funding.businessinfo.model.service;

import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.funding.businessinfo.model.dto.BusinessNoAPIDTO;
import com.kh.javaray.funding.businessinfo.model.dto.BusinessNoDTO;


public interface BusinessNoService {

	void save(BusinessNoAPIDTO BusinessNoAPIData);

	BusinessNoAPIDTO  selectBusinessNo();

	void insertBoard(BusinessNoDTO businessNoData, MultipartFile file);
}
