package com.kh.javaray.funding.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.javaray.funding.model.dto.FundingBusinessNoAPIDTO;
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
	
	@PostMapping
	public ResponseEntity<?> insertBusinessNumber(@ModelAttribute FundingBusinessNoAPIDTO BusinessNoAPIData){
		
		log.info("{}",BusinessNoAPIData);
		
		//String response = fundingService.save(companyBusinessNo);
		
		//return ResponseEntity.status(HttpStatus.CREATED).body("사업자등록 인증을 성공했습니다.");
		return null;
	}
	

}
