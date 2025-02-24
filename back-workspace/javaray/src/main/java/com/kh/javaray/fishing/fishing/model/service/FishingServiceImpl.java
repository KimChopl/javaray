package com.kh.javaray.fishing.fishing.model.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.auth.service.AuthenticationService;
import com.kh.javaray.fishing.amenities.model.dto.AmenitiesDTO;
import com.kh.javaray.fishing.day.model.dto.DayDTO;
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
	
	private final FishingFileService fileService;
	private final FishingMapper fishingMapper;
	private final AuthenticationService authService;
	
	
	//게시물 등록
	@Override
	public void fishingSave(@Valid FishingDTO fishing,  MultipartFile file, String amenities, String fish) {
	
		CustomUserDetails user = authService.checkedUser(); // 사용자확인
		authService.validWriter(fishing.getFishingWriter(), user.getNickname());
		
		// 올바른 사용자로 인증이 된 경우
		if(file != null && !file.isEmpty()) {
			String filePath = fileService.store(file);
			fishing.setFishingFileUrl(filePath);
		}else {
			fishing.setFishingFileUrl(null);
		}
		
		fishing.setFishingWriter(String.valueOf(user.getUserNo()));
		fishingMapper.fishingSave(fishing);
		
		log.info("Insert하고 가져온 fishingNo : {}", fishing.getFishingNo());
		
		fishing = fishingSaveList(fishing, amenities, fish);
		
		// fish 리스트 처리
		if (fishing.getFishList() != null && !fishing.getFishList().isEmpty()) {
	        fishingMapper.saveFish(fishing.getFishList());
	    }
		
		//amenities 리스트 처리
		if(fishing.getAmenitiesList() != null && !fishing.getAmenitiesList().isEmpty()) {
			fishingMapper.saveAmenities(fishing.getAmenitiesList());
		}
		
	}
	
	private FishingDTO fishingSaveList(FishingDTO fishing, String amenities, String fish) {
		
		String[] amenitiesArray = amenities.split(",");
		String[] fishArray = fish.split(",");
		
		List<AmenitiesDTO> amenitiesList = new ArrayList();
		List<FishDTO> fishList = new ArrayList();
		
		for(String s : amenitiesArray) {
			AmenitiesDTO amenitiesDto = new AmenitiesDTO();
			
			amenitiesDto.setAmenitiesNo(Long.parseLong(s));
			amenitiesDto.setFishingNo(fishing.getFishingNo());
			
			amenitiesList.add(amenitiesDto);
		}
		fishing.setAmenitiesList(amenitiesList);
				
		for(String s : fishArray) {
			FishDTO fishDto = new FishDTO();
			
			fishDto.setFishNo(Long.parseLong(s));
			fishDto.setFishingNo(fishing.getFishingNo());
			
			fishList.add(fishDto);
		}
		fishing.setFishList(fishList);
		
		log.info("바뀐 fishing 정보 : {}", fishing);
		
		return fishing;
	}
	

	// 게시물 전체 조회
	@Override
	public List<FishingDTO> findAll(int page) {
		
		int size = 6;
		RowBounds rowBounds = new RowBounds(page*size, size);
		System.out.println(rowBounds);
		
		// 낚시터 목록 조회한거 페이징처리해서 list로 담기
		List<FishingDTO> fishingList = fishingMapper.findAll(rowBounds); 
		
		System.out.println("Fishing List Size: " + fishingList.size());
		
		// 낚시터 번호 6개 담기 - fishingNo: Long타입임
		List<Long> fishingNos = new ArrayList<>();
		
		for(FishingDTO fishing : fishingList) {
		    System.out.println("FishingNo: " + fishing.getFishingNo()); // 출력해서 값이 있는지 확인
		    if (fishing.getFishingNo() != null) {
		        fishingNos.add(fishing.getFishingNo());
		    }
		}
		
		//조회된 낚시터 번호가 없으면 return
		if(fishingNos.isEmpty()) {
			return fishingList;
		}
		
		// 물고기 조회
		List<FishDTO> fishesList = fishingMapper.findFishByFishingNos(fishingNos);
		System.out.println("Fishes List Size: " + fishesList.size());
		System.out.println("Fishing Nos: " + fishingNos);
		System.out.println("Fishes List: " + fishesList);

		// 편의시설 조회
		List<AmenitiesDTO> amenitiesList = fishingMapper.findAmenitiesByFishingNos(fishingNos);
		System.out.println("Amenities List Size" + amenitiesList.size());
		System.out.println("Fishing Nos" + fishingNos);
		System.out.println("Amenities List" + amenitiesList);

		
		// 낚시터별로 물고기 & 편의시설 매핑
		for (FishingDTO fishing : fishingList) {
		    List<FishDTO> fishes = new ArrayList<>();
		    List<AmenitiesDTO> amenities = new ArrayList<>();

		    // 물고기 리스트에서 해당 낚시터의 물고기만 필터링하여 추가
		    for (FishDTO fish : fishesList) {
		        if (fish != null && fish.getFishingNo().equals(fishing.getFishingNo())) {
		            fishes.add(fish);  // 물고기 추가
		        }
		    }

		    // 편의시설 리스트에서 해당 낚시터의 편의시설만 필터링하여 추가
		    for (AmenitiesDTO amenity : amenitiesList) {
		    	log.info("{}",fishing);
		        if (amenity != null && amenity.getFishingNo().equals(fishing.getFishingNo())) {
		            amenities.add(amenity);
		            System.out.println(amenities);
		        }
		    } 

		    // 낚시터에 물고기 및 편의시설 설정
		    fishing.setFishList(fishes);
		    fishing.setAmenitiesList(amenities);
		}

		return fishingList;
	}

	@Override
	public FishingDTO findById(Long fishingNo) {
		
		//낚시터
		FishingDTO fishingDetail = fishingMapper.findByFishingNo(fishingNo);
		
		 if (fishingDetail == null) {
		        throw new RuntimeException("해당 낚시터 정보를 찾을 수 없습니다. fishingNo: " + fishingNo);
		    }
		
		//물고기
		List<FishDTO> fishesList = fishingMapper.findFishByFishingNo(fishingNo);
		
		//편의시설
		List<AmenitiesDTO> amenitiesList = fishingMapper.findAmenitiesByFishingNo(fishingNo);
		
		fishingDetail.setFishList(fishesList);
		fishingDetail.setAmenitiesList(amenitiesList);
		
		log.info("fishingDetail : {}", fishingDetail);
	
		
		return fishingDetail;
	}

}
