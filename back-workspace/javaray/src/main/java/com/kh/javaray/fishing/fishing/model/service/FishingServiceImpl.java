package com.kh.javaray.fishing.fishing.model.service;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.auth.service.AuthenticationService;
import com.kh.javaray.fishing.amenities.model.dto.AmenitiesDTO;
import com.kh.javaray.fishing.fish.model.dto.FishDTO;
import com.kh.javaray.fishing.fishing.model.dto.FishingDTO;
import com.kh.javaray.fishing.fishing.model.mapper.FishingMapper;
import com.kh.javaray.member.model.dto.CustomUserDetails;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class FishingServiceImpl implements FishingService {
	
	//private final FishingFileService fileService;
	private final FishingMapper fishingMapper;
	//private final AuthenticationService authService;
	
	/*
	//게시물 등록
	@Override
	public void fishingSave(@Valid FishingDTO fishing, AmenitiesDTO amenities, FishDTO fish, MultipartFile file) {
	
		CustomUserDetails user = authService.checkedUser(); // 사용자확인
		authService.validWriter(fishing.getFishingWriter(), user.getUsername());
		
		// 올바른 사용자로 인증이 된 경우
		if(file != null && !file.isEmpty()) {
			String filePath = fileService.store(file);
			fishing.setFishingFileUrl(filePath);
		}else {
			fishing.setFishingFileUrl(null);
		}
		
		fishing.setFishingWriter(String.valueOf(user.getUserNo()));
		fishingMapper.fishingSave(fishing);
	}
	*/

	// 게시물 전체 조회
	@Override
	public List<FishingDTO> findAll(int page) {
		
		int size = 6;
		RowBounds rowBounds = new RowBounds(page*size, size);
		System.out.println(rowBounds);
		return fishingMapper.findAll(rowBounds);
	}

}
