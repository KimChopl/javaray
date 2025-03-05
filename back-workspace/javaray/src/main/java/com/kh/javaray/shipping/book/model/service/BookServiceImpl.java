package com.kh.javaray.shipping.book.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.javaray.exception.exceptions.NotFoundInfoException;
import com.kh.javaray.shipping.book.model.dto.Book;
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
	

	
	private void checkedShippingNo(String shippingNo) {
		Shipping shipping = shippingService.selectUpdateForm(shippingNo);
		if(shipping == null || shipping.getShippingNo().equals(shippingNo)) {
			throw new NotFoundInfoException("잘못된 접근입니다.");
		}
	}
	
	@Override
	public List<Book> selectShippingBook(String shippingNo) {
//		checkedShippingNo(shippingNo);
		return bookMapper.selectShippingBook(shippingNo);
	}

}
