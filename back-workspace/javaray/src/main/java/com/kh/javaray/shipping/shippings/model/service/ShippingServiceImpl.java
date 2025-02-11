package com.kh.javaray.shipping.shippings.model.service;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import com.kh.javaray.shipping.shippings.model.dto.Shipping;
import com.kh.javaray.shipping.shippings.model.mapper.ShippingMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShippingServiceImpl implements ShippingService{
	
	private final ShippingMapper sm;

	@Override
	public List<Shipping> selectShipping(int page) {
		int size = 20;
		RowBounds rb = new RowBounds(page * size, size);
		List<Shipping> list = sm.selectShipping(rb);
		log.info("??");
		return list;
				
	}

}
