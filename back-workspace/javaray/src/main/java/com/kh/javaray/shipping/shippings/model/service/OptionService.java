package com.kh.javaray.shipping.shippings.model.service;

import java.util.List;

import com.kh.javaray.shipping.shippings.model.dto.ShippingOption;

public interface OptionService {

	void uploadOption(List<ShippingOption> options);

	List<ShippingOption> settingOptionsShippingNo(List<ShippingOption> options, String shippingNo);
}
