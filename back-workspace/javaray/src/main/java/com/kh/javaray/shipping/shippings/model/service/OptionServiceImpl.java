package com.kh.javaray.shipping.shippings.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.javaray.exception.exceptions.FailUpdateException;
import com.kh.javaray.exception.exceptions.NotFoundInfoException;
import com.kh.javaray.shipping.shippings.model.dto.ShippingOption;
import com.kh.javaray.shipping.shippings.model.mapper.ShippingMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class OptionServiceImpl implements OptionService {
	
	private final ShippingMapper shippingMapper;

	@Transactional
	private void deleteOption(String shippingNo) {
		int result = shippingMapper.deleteOption(shippingNo);
		if (result < 1) {
			throw new NotFoundInfoException("업데이트에 실패 하였습니다.");
		}
	}
	
	private void insertOption(List<ShippingOption> options) {
		int result = 1;
		for (ShippingOption option : options) {
			result = shippingMapper.updateOption(option);
			if (result == 0) {
				throw new FailUpdateException("업데이트에 실패 하였습니다.");
			}
		}
	}

	@Override
	@Transactional
	public void uploadOption(List<ShippingOption> options, String shippingNo) {
		deleteOption(shippingNo);
		insertOption(settingOptionsShippingNo(options, shippingNo));
	}

	@Override
	 public List<ShippingOption> settingOptionsShippingNo(List<ShippingOption> options, 
			 											  String shippingNo) {
		log.info(shippingNo);
		for (ShippingOption option : options) {
			option.setShippingNo(shippingNo);
		}
		return options;
	}

	@Override
	public void insertOption(List<ShippingOption> options, String shippingNo) {
		insertOption(settingOptionsShippingNo(options, shippingNo));
	}

}
