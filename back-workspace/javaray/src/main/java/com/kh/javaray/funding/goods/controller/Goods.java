package com.kh.javaray.funding.goods.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("goods")
@Slf4j
@Validated
public class Goods {
	
	@PostMapping("/insert")
	public ResponseEntity<?> insertGoods(){
		log.info("나야나");
		
		return null;
	}

}
