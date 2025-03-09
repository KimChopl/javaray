package com.kh.javaray.shipping.book.model.service;

import java.util.Map;

import com.kh.javaray.shipping.book.model.dto.RegistBook;

public interface BookService {

	Map<String, Object> selectShippingBook(String shippingNo);

	RegistBook insertBook(String shippingNo, RegistBook book);
	
}
