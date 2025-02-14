package com.kh.javaray.funding.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.funding.model.dto.BusinessNoDTO;
import com.kh.javaray.funding.model.dto.FundingBoardDTO;
import com.kh.javaray.funding.model.dto.FundingBusinessNoAPIDTO;
import com.kh.javaray.funding.model.service.FundingService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("funding")
@Slf4j
@Validated
public class FundingController {
	
	private final FundingService fundingService;
	
	@PostMapping("/businessNo")
	public ResponseEntity<?> insertBusinessNumber(@RequestBody FundingBusinessNoAPIDTO BusinessNoAPIData){
		
		fundingService.save(BusinessNoAPIData);
		
		return ResponseEntity.status(HttpStatus.CREATED).body("사업자등록 인증을 성공했습니다.");
	}
	
	@GetMapping("/businessNo")
	public ResponseEntity<FundingBusinessNoAPIDTO> selectBusinessNo(){
		FundingBusinessNoAPIDTO dto = fundingService.selectBusinessNo();
		return ResponseEntity.ok(dto);
	}
	
	@PostMapping("/businessNoInsert")
	public ResponseEntity<?> businessNoInsert(@ModelAttribute @Valid BusinessNoDTO BusinessNoData,
											  @RequestParam(name="businessNoFile") MultipartFile file){
		fundingService.insertBoard(BusinessNoData, file);
		
		return ResponseEntity.status(HttpStatus.CREATED).body("사업자 신청 성공했습니다.");
	}
	
	@GetMapping("/selectList/hasToken")
	public ResponseEntity<String> selectFundingListHasToken(@RequestParam(name="page", defaultValue="0") int page){
		return ResponseEntity.ok(fundingService.selectFundingListHasToken(page));
	}
	
	@GetMapping("/selectList/hasNonToken")
	public ResponseEntity<List<FundingBoardDTO>> selectFundingListHasNoneToken(@RequestParam(name="page", defaultValue="0") int page,
																			   @RequestParam(name="categoryNo", defaultValue="5") int categoryNo){
		log.info("{}", categoryNo);
		List<FundingBoardDTO> list = fundingService.selectFundingListHasNoneToken(page, categoryNo);
		
		log.info("{}", list);
		return ResponseEntity.ok().body(list);
	}
	

}
