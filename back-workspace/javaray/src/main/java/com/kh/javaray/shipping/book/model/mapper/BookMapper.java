package com.kh.javaray.shipping.book.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.kh.javaray.shipping.book.model.dto.Book;
import com.kh.javaray.shipping.book.model.dto.RegistBook;

@Mapper
public interface BookMapper {

	List<Book> selectShippingBook(String shippingBook);
	
	
	int insertBook(RegistBook book);


	String selectDateAndShippingNo(RegistBook book);
	
}
