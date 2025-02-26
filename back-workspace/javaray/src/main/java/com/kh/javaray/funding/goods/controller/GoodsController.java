package com.kh.javaray.funding.goods.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.funding.goods.model.service.GoodsService;
import com.kh.javaray.funding.model.dto.FundingBoardDTO;
import com.kh.javaray.funding.model.dto.FundingOptionDTO;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("goods")
@Slf4j
@Validated
public class GoodsController {
	
	private final GoodsService goodsService ;
	
	@PostMapping("/insert")
	public ResponseEntity<?> insertGoods(@ModelAttribute @Valid FundingBoardDTO goodsFormData,
										 @RequestParam(name = "categoryName") String categoryName,
										 @RequestParam(name = "mainFile", required = true) MultipartFile file,
										 @RequestParam(name = "subFiles", required = false) MultipartFile[] files){

		return ResponseEntity.ok().body(goodsService.insertGoods(goodsFormData, categoryName, file, files));
	}
	
	@PostMapping("/insert/options")
	public ResponseEntity<?> insertOptions(@RequestParam("boardNo") Long boardNo, 
										   @RequestBody List<FundingOptionDTO> optionList){
		
		goodsService.insertGoodsOptions(optionList, boardNo);
		
		return ResponseEntity.status(HttpStatus.CREATED).body("굿즈 옵션들을 신청 성공했습니다.");
	}

}
