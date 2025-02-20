package com.kh.javaray.shipping.shippings.model.service;

import java.util.List;

import com.kh.javaray.shipping.shippings.model.dto.Fishs;

public interface FishService {
	Fishs selectFish(String fishNo);

	List<Fishs> selectFish();

	void uploadFish(List<Fishs> fishs);

	List<Fishs> settingFishsShippingNo(List<Fishs> fishs, String shippingNo);

}
