package com.kh.javaray.shipping.shippings.model.service;

import org.springframework.stereotype.Service;

import com.kh.javaray.auth.service.AuthenticationService;
import com.kh.javaray.member.model.dto.CustomUserDetails;
import com.kh.javaray.shipping.shippings.model.dto.Attention;
import com.kh.javaray.shipping.shippings.model.mapper.ShippingMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AttentionServiceImpl implements AttentionService {
	
	private final AuthenticationService authService;
	private final ShippingMapper shippingMapper;

	@Override
	public void insertAttention(String shippingNo) {
		CustomUserDetails user = authService.checkedUser();
		Attention attention = makingAttention(shippingNo, user);
		shippingMapper.insertAttention(attention);
	}

	@Override
	public void deleteAttention(String shippingNo) {
		CustomUserDetails user = authService.checkedUser();
		Attention attention = makingAttention(shippingNo, user);
		shippingMapper.deleteAttention(attention);
	}

	@Override
	public int selectAttention(String shippingNo) {
		CustomUserDetails user = authService.checkedUser();
		Attention att = makingAttention(shippingNo, user);
		return shippingMapper.selectAttention(att);
	}
	
	private Attention makingAttention(String shippingNo, CustomUserDetails user) {
		return Attention.builder().shippingNo(shippingNo).userNo(user.getUserNo()).build();
	}

}
