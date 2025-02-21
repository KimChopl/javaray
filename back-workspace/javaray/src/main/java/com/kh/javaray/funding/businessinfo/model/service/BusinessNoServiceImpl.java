package com.kh.javaray.funding.businessinfo.model.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.auth.service.AuthenticationService;
import com.kh.javaray.exception.exceptions.FailUpdateUserInfoException;
import com.kh.javaray.funding.businessinfo.model.dto.BusinessNoAPIDTO;
import com.kh.javaray.funding.businessinfo.model.dto.BusinessNoDTO;
import com.kh.javaray.funding.businessinfo.model.mapper.BusinessNoMapper;
import com.kh.javaray.funding.model.service.FundingFileService;
import com.kh.javaray.manager.model.dto.ManagingDTO;
import com.kh.javaray.manager.model.mapper.ManagerMapper;
import com.kh.javaray.member.model.dto.CustomUserDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Service
@RequiredArgsConstructor
@Slf4j
public class BusinessNoServiceImpl implements BusinessNoService {

	private final BusinessNoMapper businessNoMapper;
	private final AuthenticationService authService;
	private final ManagerMapper managerMapper;
	private final FundingFileService fundingFileService;
	
	@Override
	@Transactional
	public void save(BusinessNoAPIDTO businessNoAPIData) {
		
		CustomUserDetails user = authService.checkedUser();
		authService.validWriter(businessNoAPIData.getBoardWriter(), user.getNickname());
		
		businessNoAPIData.setBoardWriter(String.valueOf(user.getUserNo()));
		businessNoMapper.save(businessNoAPIData);
		
		ManagingDTO managingDTO = new ManagingDTO();
		managingDTO.setUsername(user.getUsername());
		managingDTO.setChangeRole("ROLE_BUSINESSNOAPI");
		
		if(1 != managerMapper.changeRole(managingDTO)) {
			throw new FailUpdateUserInfoException("업데이트에 실패했습니다. 다시 시도해주세요");
		}
		
	}

	@Override
	public BusinessNoAPIDTO selectBusinessNo() {
		
		CustomUserDetails user = authService.checkedUser();
		
		return businessNoMapper.selectBusinessNo(String.valueOf(user.getUserNo()));
	}

	@Override
	public void insertBoard(BusinessNoDTO businessNoData, MultipartFile file) {
		
		CustomUserDetails user = authService.checkedUser();
		
		if(file != null && !file.isEmpty()) {
			String filePath = fundingFileService.store(file);
			businessNoData.setBusinessNoFileUrl(filePath);
		} else {
			throw new FailUpdateUserInfoException("사업자등록본 사본이 없어서 신청이 불가합니다.");
		}
		
		businessNoMapper.insertBoard(businessNoData);
		
		
		ManagingDTO managingDTO = new ManagingDTO();
		managingDTO.setUsername(user.getUsername());
		managingDTO.setChangeRole("ROLE_FUNDINGCOMPANY");
		
		if(1 != managerMapper.changeRole(managingDTO)) {
			throw new FailUpdateUserInfoException("업데이트에 실패했습니다. 다시 시도해주세요");
		}
		
	}

}
