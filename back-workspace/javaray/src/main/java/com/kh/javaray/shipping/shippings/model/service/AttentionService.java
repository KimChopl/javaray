package com.kh.javaray.shipping.shippings.model.service;

public interface AttentionService {

	void insertAttention(String shippingNo);
	void deleteAttention(String shippingNo);
	int selectAttention(String shippingNo);
}
