package com.kh.javaray.mainPage.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.javaray.mainPage.model.service.MainPageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("main")
@RequiredArgsConstructor
public class MainPageController {
	
	private final MainPageService mainService;

	@GetMapping
	public ResponseEntity<Map<String, Object>> mainPage(){
		Map<String, Object> map = mainService.selectAllService();
		
		return ResponseEntity.ok().body(map);
	}
	
}
