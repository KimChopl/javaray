package com.kh.javaray.shipping.shippings.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.javaray.exception.exceptions.NotFoundInfoException;
import com.kh.javaray.exception.exceptions.NotMatchBoardInfoException;
import com.kh.javaray.shipping.shippings.model.dto.Fishs;
import com.kh.javaray.shipping.shippings.model.mapper.ShippingMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FishServiceImpl implements FishService{
	
	private final ShippingMapper shippingMapper;

	@Override
	public Fishs selectFish(String fishNo) {
		Fishs fish = shippingMapper.selectFish(fishNo);
		if (fish == null) {
			throw new NotMatchBoardInfoException("조회된 항목이 없습니다.");
		}
		return fish;
	}

	@Override
	@Transactional
	public List<Fishs> selectFish() {
		List<Fishs> list = shippingMapper.selectFishs();
		if (list == null || list.isEmpty()) {
			throw new NotFoundInfoException("해당목록을 찾지 못했습니다.");
		}
		return list;
	}

	private void deleteFish(String shippingNo) {
		shippingMapper.deleteFish(shippingNo);
		List<Fishs> list = shippingMapper.selectFishsByShippingNo(shippingNo);
		if (!list.isEmpty()) {
			throw new NotFoundInfoException("업데이트에 실패 하였습니다.");
		}
	}

	@Override
	@Transactional
	public void uploadFish(List<Fishs> fishs) {
		deleteFish(fishs.get(0).getShippingNo());
		for (Fishs fish : fishs) {
			shippingMapper.updateFish(fish);
		}
	}

	@Override
	public List<Fishs> settingFishsShippingNo(List<Fishs> fishs, String shippingNo) {
		for (Fishs fish : fishs) {
			fish.setShippingNo(shippingNo);
		}
		return fishs;
	}

}
