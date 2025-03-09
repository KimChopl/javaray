package com.kh.javaray.shipping.book.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.javaray.shipping.book.model.dto.RegistBook;
import com.kh.javaray.shipping.book.model.service.BookService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


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
	
	@PostMapping("{shippingNo}")
	public ResponseEntity<RegistBook> insertBook(@PathVariable("shippingNo") String shippingNo, @RequestBody RegistBook booker){
		RegistBook registBook = bookService.insertBook(shippingNo, booker);
		return ResponseEntity.status(HttpStatus.CREATED).body(registBook);
	}
	
	
}
