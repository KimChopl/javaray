package com.kh.javaray.shipping.shippings.model.service;

import java.util.List;
import java.util.Map;

import com.kh.javaray.shipping.shippings.model.dto.Shipping;

public interface ShippingService {

	List<Shipping> selectShipping(int page);

	Map<String, Object> selectShippingDetail(String shippingNo);

}
