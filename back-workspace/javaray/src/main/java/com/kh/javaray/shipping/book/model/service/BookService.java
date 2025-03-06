package com.kh.javaray.shipping.book.model.service;

import java.util.Map;

public interface BookService {

	Map<String, Object> selectShippingBook(String shippingNo);
	
}
