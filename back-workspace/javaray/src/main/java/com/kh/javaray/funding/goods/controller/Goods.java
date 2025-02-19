package com.kh.javaray.funding.goods.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.funding.goods.model.dto.GoodsFormDTO;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("goods")
@Slf4j
@Validated
public class Goods {
	
	@PostMapping("/insert")
	public ResponseEntity<?> insertGoods(@ModelAttribute @Valid GoodsFormDTO goodsFormData,
										 @RequestParam(name = "mainFile", required = true) MultipartFile file){
		log.info("나야나");
		log.info("{}", goodsFormData);
		log.info("{}", file);
		
		return ResponseEntity.ok("등록성공!!");
	}

}
