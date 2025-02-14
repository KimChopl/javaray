package com.kh.javaray.funding.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.auth.service.AuthenticationService;
import com.kh.javaray.exception.exceptions.FailUpdateUserInfoException;
import com.kh.javaray.funding.model.dto.BusinessNoDTO;
import com.kh.javaray.funding.model.dto.FundingBoardDTO;
import com.kh.javaray.funding.model.dto.FundingBusinessNoAPIDTO;
import com.kh.javaray.funding.model.dto.FundingCompanyNameDTO;
import com.kh.javaray.funding.model.mapper.FundingMapper;
import com.kh.javaray.manager.model.dto.ManagingDTO;
import com.kh.javaray.manager.model.mapper.ManagerMapper;
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
	private final FundingFileService fundingFileService;

	@Override
	@Transactional
	public void save(FundingBusinessNoAPIDTO BusinessNoAPIData) {
		
		CustomUserDetails user = authService.checkedUser();
		authService.validWriter(BusinessNoAPIData.getBoardWriter(), user.getNickname());
		
		BusinessNoAPIData.setBoardWriter(String.valueOf(user.getUserNo()));
		fundingMapper.save(BusinessNoAPIData);
		
		ManagingDTO managingDTO = new ManagingDTO();
		managingDTO.setUsername(user.getUsername());
		managingDTO.setChangeRole("ROLE_BUSINESSNOAPI");
		
		if(1 != managerMapper.changeRole(managingDTO)) {
			throw new FailUpdateUserInfoException("업데이트에 실패했습니다. 다시 시도해주세요");
		}
		
	}

	@Override
	public FundingBusinessNoAPIDTO selectBusinessNo() {
		
		CustomUserDetails user = authService.checkedUser();
		
		return fundingMapper.selectBusinessNo(String.valueOf(user.getUserNo()));
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
		
		fundingMapper.insertBoard(businessNoData);
		
		
		ManagingDTO managingDTO = new ManagingDTO();
		managingDTO.setUsername(user.getUsername());
		managingDTO.setChangeRole("ROLE_FUNDINGCOMPANY");
		
		if(1 != managerMapper.changeRole(managingDTO)) {
			throw new FailUpdateUserInfoException("업데이트에 실패했습니다. 다시 시도해주세요");
		}
		
	}

	@Override
	public  List<FundingBoardDTO> selectFundingListHasToken(int page, int categoryNo) {
		
		
		CustomUserDetails user = authService.checkedUser();
		String role = user.getAuthorities().iterator().next().getAuthority();
		log.info("{}", role);
		
		int size = 6;
		RowBounds rowBounds = new RowBounds(page * size, size);
		
		List<FundingBoardDTO> list = fundingMapper.selectBoardList(rowBounds, categoryNo);
		List<FundingCompanyNameDTO> companyNameList = fundingMapper.selectCompanyName();
		
		Map<Long, String> companyNameMap = new HashMap();
				
				for(FundingCompanyNameDTO company : companyNameList) {
					companyNameMap.put(company.getUserNo(), company.getCompanyName());
				}
				
				for (FundingBoardDTO totalList : list) {
			        if (totalList.getUserNo() != null) {
			            String companyName = companyNameMap.get(totalList.getUserNo());
			            if (companyName != null) {
			                totalList.setCompanyName(companyName);
			                totalList.setRole(role);
			            }
			        }
			    }
		
		return list;
	}

	// 토큰없을 때 메인 페이지 전체조회
	@Override
	public List<FundingBoardDTO> selectFundingListHasNoneToken(int page, int categoryNo) {
		
		int size = 6;
		RowBounds rowBounds = new RowBounds(page * size, size);
		
		List<FundingBoardDTO> list = fundingMapper.selectBoardList(rowBounds, categoryNo);
		List<FundingCompanyNameDTO> companyNameList = fundingMapper.selectCompanyName();
		
		Map<Long, String> companyNameMap = new HashMap();
		
		for(FundingCompanyNameDTO company : companyNameList) {
			companyNameMap.put(company.getUserNo(), company.getCompanyName());
		}
		
		for (FundingBoardDTO totalList : list) {
	        if (totalList.getUserNo() != null) {
	            String companyName = companyNameMap.get(totalList.getUserNo());
	            if (companyName != null) {
	                totalList.setCompanyName(companyName);
	            }
	        }
	    }
		return list;
	}

	@Override
	public List<String> selectCategory() {
		
		return fundingMapper.selectCategory();
	}

}
