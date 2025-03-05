package com.kh.javaray.shipping.book.model.service;

import java.util.List;

import com.kh.javaray.shipping.book.model.dto.Book;

public interface BookService {

	List<Book> selectShippingBook(String shippingNo);
	
}
