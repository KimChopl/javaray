package com.kh.javaray.funding.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.javaray.funding.model.dto.FundingBoardDTO;
import com.kh.javaray.funding.model.dto.FundingCategoryDTO;
import com.kh.javaray.funding.model.service.FundingService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("funding")
@Slf4j
@Validated
public class FundingController {
	
	private final FundingService fundingService;
	
	@GetMapping("/selectList/hasToken")
	public ResponseEntity<List<FundingBoardDTO>> selectFundingListHasToken(@RequestParam(name="page", defaultValue="0") int page,
																			@RequestParam(name="categoryNo") int categoryNo){
		List<FundingBoardDTO> list = fundingService.selectFundingListHasToken(page, categoryNo);
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/selectList/hasNonToken")
	public ResponseEntity<List<FundingBoardDTO>> selectFundingListHasNoneToken(@RequestParam(name="page", defaultValue="0") int page,
																			   @RequestParam(name="categoryNo", defaultValue="5") int categoryNo){
		List<FundingBoardDTO> list = fundingService.selectFundingListHasNoneToken(page, categoryNo);
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/selectCategory")
	public ResponseEntity<List<FundingCategoryDTO>> selectCategory(){
		
		return ResponseEntity.ok(fundingService.selectCategory());
	}
	
	

}
