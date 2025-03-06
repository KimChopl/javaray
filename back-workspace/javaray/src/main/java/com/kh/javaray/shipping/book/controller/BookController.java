package com.kh.javaray.shipping.book.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.javaray.shipping.book.model.service.BookService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("/shipping-book")
@Slf4j
public class BookController {
	
	private final BookService bookService;

	@GetMapping("{shippingNo}")
	public ResponseEntity<Map<String, Object>> selectShippingBookInfo(@PathVariable("shippingNo") String shippingNo) {
		Map<String, Object> bookMap = bookService.selectShippingBook(shippingNo);
		return ResponseEntity.ok().body(bookMap);
	}
	
}
