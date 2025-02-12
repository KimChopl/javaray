package com.kh.javaray.shipping.shippings.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.javaray.api.OpenDataApi;
import com.kh.javaray.exception.exceptions.NotMatchBoardInfoException;
import com.kh.javaray.shipping.dto.Weather;
import com.kh.javaray.shipping.shippings.model.dto.Shipping;
import com.kh.javaray.shipping.shippings.model.mapper.ShippingMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShippingServiceImpl implements ShippingService{
	
	private final ShippingMapper sm;
	private final OpenDataApi oda;

	@Override
	public List<Shipping> selectShipping(int page) {
		int size = 20;
		RowBounds rb = new RowBounds(page * size, size);
		List<Shipping> list = sm.selectShipping(rb);
		log.info("??");
		return list;
				
	}

	@Override
	@Transactional
	public Map<String, Object> selectShippingDetail(String shippingNo) {
		Shipping shipping = sm.selectShippingDetail(shippingNo);
		if(shipping == null) {
			throw new NotMatchBoardInfoException("조회된 항목이 없습니다.");
		}
		List<Weather> weather = oda.weatherApi(shipping.getPort().getSpotCode());
		Map<String, Object> response = new HashMap<String, Object>();
		response.put("shipping", shipping);
		response.put("weather", weather);
		return response;
	}

}
