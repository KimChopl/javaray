package com.kh.javaray.funding.model.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.javaray.auth.service.AuthenticationService;
import com.kh.javaray.exception.exceptions.FailUpdateUserInfoException;
import com.kh.javaray.funding.model.dto.FundingBusinessNoAPIDTO;
import com.kh.javaray.funding.model.mapper.FundingMapper;
import com.kh.javaray.manager.model.dto.ManagingDTO;
import com.kh.javaray.manager.model.mapper.ManagerMapper;
import com.kh.javaray.manager.model.service.ManagerService;
import com.kh.javaray.member.model.dto.CustomUserDetails;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class FundingServiceImpl implements FundingService {
	
	private final FundingMapper fundingMapper;
	private final AuthenticationService authService;
	private final ManagerMapper managerMapper;

	@Override
	@Transactional
	public void save(FundingBusinessNoAPIDTO BusinessNoAPIData) {
		
		CustomUserDetails user = authService.checkedUser();
		log.info("{}, {}", BusinessNoAPIData.getBoardWriter(), user.getUsername());
		authService.validWriter(BusinessNoAPIData.getBoardWriter(), user.getUsername());
		
		BusinessNoAPIData.setBoardWriter(String.valueOf(user.getUserNo()));
		fundingMapper.save(BusinessNoAPIData);
		
		//memberService.login()
		ManagingDTO managingDTO = new ManagingDTO();
		managingDTO.setUsername(user.getUsername());
		managingDTO.setChangeRole("BUSINESSNOAPI");
		
		if(1 != managerMapper.changeRole(managingDTO)) {
			throw new FailUpdateUserInfoException("업데이트에 실패했습니다. 다시 시도해주세요");
		}
		
	}

}
