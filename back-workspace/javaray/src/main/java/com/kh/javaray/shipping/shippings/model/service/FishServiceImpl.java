package com.kh.javaray.shipping.shippings.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.javaray.exception.exceptions.FailInsertObjectException;
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
	public void updateFish(List<Fishs> fishs, String shippingNo) {
		deleteFish(shippingNo);
		uploadFish(settingFishsShippingNo(fishs, shippingNo));
	}
	
	private void uploadFish(List<Fishs> fishs) {
		int result = 0;
		for (Fishs fish : fishs) {
			result = shippingMapper.uploadFish(fish);
		}
		if(result == 0) {
			throw new FailInsertObjectException("등록에 실패하였습니다.");
		}
	}

	@Override
	public List<Fishs> settingFishsShippingNo(List<Fishs> fishs, String shippingNo) {
		for (Fishs fish : fishs) {
			fish.setShippingNo(shippingNo);
		}
		return fishs;
	}

	@Override
	public void insertFish(List<Fishs> fishs, String shippingNo) {
		uploadFish(settingFishsShippingNo(fishs, shippingNo));
	}

}
