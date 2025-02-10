package com.kh.javaray.shipping.shippings.model.service;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import com.kh.javaray.shipping.shippings.model.dto.Shipping;
import com.kh.javaray.shipping.shippings.model.mapper.ShippingMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ShippingServiceImpl implements ShippingService{
	
	private final ShippingMapper sm;

	@Override
	public List<Shipping> selectShipping(int page) {
		int size = 20;
		RowBounds rb = new RowBounds(page * size, size);
		return sm.selectShipping(rb);
	}

}
