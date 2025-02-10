package com.kh.javaray.funding.model.service;

import org.springframework.stereotype.Service;

import com.kh.javaray.auth.service.AuthenticationService;
import com.kh.javaray.funding.model.dto.FundingBusinessNoAPIDTO;
import com.kh.javaray.funding.model.mapper.FundingMapper;
import com.kh.javaray.member.model.dto.CustomUserDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class FundingServiceImpl implements FundingService {
	
	private final FundingMapper fundingMapper;
	private final AuthenticationService authService;

	@Override
	public void save(FundingBusinessNoAPIDTO BusinessNoAPIData) {
		
		CustomUserDetails user = authService.checkedUser();
		authService.validWriter(BusinessNoAPIData.getBoardWriter(), user.getUsername());
		
		
		BusinessNoAPIData.setBoardWriter(String.valueOf(user.getUserNo()));
		log.info("{}", BusinessNoAPIData);
		fundingMapper.save(BusinessNoAPIData);
	}

}
