package com.kh.javaray.shipping.shippings.model.dto;

import java.util.List;

import com.kh.javaray.shipping.book.model.dto.Book;
import com.kh.javaray.shipping.dto.Image;
import com.kh.javaray.shipping.review.model.dto.Review;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Shipping {
	private String shippingNo;
	private String captain;
	private String shippingTitle;
	private String shippingContent;
	private int allowPepleNo;
	private String status;
	private String shippingCreateDate;
	private String shippingModifyDate;
	private Port port;
	private double rating;
	private int attention;
	private List<ShippingOption> options;
	private List<Image> images;
	private List<Book> books;
	private List<Review> reviews;
}
