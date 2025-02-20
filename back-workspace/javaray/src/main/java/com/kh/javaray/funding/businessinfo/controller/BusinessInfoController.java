package com.kh.javaray.funding.businessinfo.controller;

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

import com.kh.javaray.funding.businessinfo.model.dto.BusinessNoAPIDTO;
import com.kh.javaray.funding.businessinfo.model.dto.BusinessNoAPIDTO;
import com.kh.javaray.funding.businessinfo.model.dto.BusinessNoDTO;
import com.kh.javaray.funding.businessinfo.model.service.BusinessNoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("businessNo")
@Slf4j
@Validated
public class BusinessInfoController {

	private final BusinessNoService businessNoService;

	@PostMapping
	public ResponseEntity<?> insertBusinessNumber(@RequestBody BusinessNoAPIDTO BusinessNoAPIData) {

		businessNoService.save(BusinessNoAPIData);

		return ResponseEntity.status(HttpStatus.CREATED).body("사업자등록 인증을 성공했습니다.");
	}

	@GetMapping
	public ResponseEntity<BusinessNoAPIDTO> selectBusinessNo() {
		BusinessNoAPIDTO dto = businessNoService.selectBusinessNo();
		return ResponseEntity.ok(dto);
	}

	@PostMapping("/businessNoInsert")
	public ResponseEntity<?> businessNoInsert(@ModelAttribute @Valid BusinessNoDTO BusinessNoData,
											  @RequestParam(name = "businessNoFile") MultipartFile file) {

		businessNoService.insertBoard(BusinessNoData, file);

		return ResponseEntity.status(HttpStatus.CREATED).body("사업자 신청 성공했습니다.");
	}
}
