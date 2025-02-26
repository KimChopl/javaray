package com.kh.javaray.mainPage.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.kh.javaray.fishing.fishing.model.dto.FishingDTO;
import com.kh.javaray.fishing.fishing.model.service.FishingService;
import com.kh.javaray.funding.model.dto.FundingBoardDTO;
import com.kh.javaray.funding.model.service.FundingService;
import com.kh.javaray.shipping.shippings.model.dto.Shipping;
import com.kh.javaray.shipping.shippings.model.service.ShippingService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MainPageServiceImpl implements MainPageService {
	
	private final FishingService fishingService;
	private final FundingService fundingService;
	private final ShippingService shippingService;

	@Override
	public Map<String, Object> selectAllService() {
		Map<String, Object> map = new HashMap<String, Object>();
		List<FishingDTO> fishings = fishingService.findAll(0);
		List<FundingBoardDTO> fundings = fundingService.selectFundingListHasNoneToken(0, 1);
		List<Shipping> shippings = shippingService.selectShipping(0, 6);
		
		map.put("fishings", fishings);
		map.put("fundings", fundings);
		map.put("shippings", shippings);
		
		return map;
	}

}
