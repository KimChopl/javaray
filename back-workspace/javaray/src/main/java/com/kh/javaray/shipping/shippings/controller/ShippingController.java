package com.kh.javaray.shipping.shippings.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kh.javaray.shipping.shippings.model.dto.Shipping;
import com.kh.javaray.shipping.shippings.model.service.ShippingService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("shippings")
@Slf4j
public class ShippingController {
	
	private final ShippingService ss;

	@GetMapping
	public ResponseEntity<List<Shipping>> selectShippings(@RequestParam(name = "page", defaultValue = "0") int page){
		
		
		List<Shipping> shipping = ss.selectShipping(page);
		
		return ResponseEntity.ok().body(shipping);
	}
	
	@GetMapping("detail")
	public ResponseEntity<Map<String, Object>> selectShippingDetail(@RequestParam(name = "shippingNo") String shippingNo){
		Map<String, Object> response = ss.selectShippingDetail(shippingNo);
		return ResponseEntity.ok().body(response);
	}
	
}
