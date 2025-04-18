package com.kh.javaray.funding.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import com.kh.javaray.auth.service.AuthenticationService;
import com.kh.javaray.funding.model.dto.FundingBoardDTO;
import com.kh.javaray.funding.model.dto.FundingCategoryDTO;
import com.kh.javaray.funding.model.dto.FundingCompanyNameDTO;
import com.kh.javaray.funding.model.mapper.FundingMapper;
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
	
	private String getCurrentUserRole() {
	    CustomUserDetails user = authService.checkedUser();
	    return user.getAuthorities().iterator().next().getAuthority();
	}
	
	private RowBounds getRowBounds(int page) {
		int size = 6;
		return new RowBounds(page * size, size);
	}


	@Override
	public List<FundingBoardDTO> selectFundingListHasToken(int page, int categoryNo) {

		String role = getCurrentUserRole();
		RowBounds rowBounds = getRowBounds(page);

		List<FundingBoardDTO> list = fundingMapper.selectBoardList(rowBounds, categoryNo);
		if (!list.isEmpty()) {

			List<FundingCompanyNameDTO> companyNameList = fundingMapper.selectCompanyName();

			Map<Long, String> companyNameMap = new HashMap();

			for (FundingCompanyNameDTO company : companyNameList) {
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
		} else {
			FundingBoardDTO emptyBoardDTO = new FundingBoardDTO();
			emptyBoardDTO.setRole(role);
			list.add(emptyBoardDTO);
			return list;
		}
	}

	// 토큰없을 때 메인 페이지 전체조회
	@Override
	public List<FundingBoardDTO> selectFundingListHasNoneToken(int page, int categoryNo) {
		
		RowBounds rowBounds = getRowBounds(page);

		List<FundingBoardDTO> list = fundingMapper.selectBoardList(rowBounds, categoryNo);
		List<FundingCompanyNameDTO> companyNameList = fundingMapper.selectCompanyName();

		Map<Long, String> companyNameMap = new HashMap();

		for (FundingCompanyNameDTO company : companyNameList) {
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
		log.info("{}",list);
		return list;
	}

	@Override
	public List<FundingCategoryDTO> selectCategory() {

		return fundingMapper.selectCategory();
	}

}
