package com.kh.javaray.shipping.book.model.dto;

import java.sql.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
@Builder
public class Book {
	private String bookNo;
	private String booker;
	private String shippingNo;
	private String playDate;
	private String bookPepleNo;
	private String bookContent;
	private Date bookCreateDate;
	private Date bookModifyDate;
	private ShippingDecide shippingDecide;
	private ShippingCancel shippingCancel;
	private ShippingPlay shippingPlay;
	private List<ShippingBookStatus> bookStatus;
}
