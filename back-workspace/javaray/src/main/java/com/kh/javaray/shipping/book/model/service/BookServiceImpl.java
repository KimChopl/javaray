package com.kh.javaray.shipping.book.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.kh.javaray.auth.service.AuthenticationService;
import com.kh.javaray.exception.exceptions.FailInsertObjectException;
import com.kh.javaray.member.model.dto.CustomUserDetails;
import com.kh.javaray.shipping.book.model.dto.Book;
import com.kh.javaray.shipping.book.model.dto.RegistBook;
import com.kh.javaray.shipping.book.model.mapper.BookMapper;
import com.kh.javaray.shipping.shippings.model.dto.Shipping;
import com.kh.javaray.shipping.shippings.model.service.ShippingService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class BookServiceImpl implements BookService {
	
	private final ShippingService shippingService;
	private final BookMapper bookMapper;
	private final AuthenticationService authService;
	
	private List<Book> cutPlayDate(List<Book> books){
		for(Book book : books) {
			book.setPlayDate(book.getPlayDate().substring(0, 10));
		}
		return books;
	}
	
	@Override
	public Map<String, Object> selectShippingBook(String shippingNo) {
		Shipping shipping = shippingService.checkedShipping(shippingNo);
		List<Book> bookInfo =  cutPlayDate(bookMapper.selectShippingBook(shippingNo));
		Map<String, Object> bookMap = new HashMap<String, Object>();
		bookMap.put("people", shipping.getAllowPeopleNo());
		bookMap.put("bookInfo", bookInfo);
		
		return bookMap;
	}

	@Override
	public RegistBook insertBook(String shippingNo, RegistBook book) {
		RegistBook registBook = registBook(shippingNo, book);
		return registBook;
	}

	private RegistBook registBook(String shippingNo, RegistBook book) {
		shippingService.checkedShipping(shippingNo);
		CustomUserDetails user = authService.checkedUser();
		book.setShippingNo(shippingNo);
		book.setUserNo(user.getUserNo());
		log.info("{}", book);
		saveBook(book);
		return book;
	}

	private void saveBook(RegistBook book) {
		int result = bookMapper.insertBook(book);
		if(result < 1) {
			throw new FailInsertObjectException("예약에 실패하였습니다");
		}
	}

}
