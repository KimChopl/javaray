package com.kh.javaray.shipping.shippings.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.kh.javaray.exception.exceptions.FailUpdateException;
import com.kh.javaray.exception.exceptions.NotFoundInfoException;
import com.kh.javaray.shipping.shippings.model.dto.ShippingOption;
import com.kh.javaray.shipping.shippings.model.mapper.ShippingMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OptionServiceImpl implements OptionService {
	
	private final ShippingMapper sm;

	private void deleteOption(String shippingNo) {
		sm.deleteOption(shippingNo);
		List<ShippingOption> list = sm.selectOption(shippingNo);
		if (!list.isEmpty()) {
			throw new NotFoundInfoException("업데이트에 실패 하였습니다.");
		}
	}

	@Override
	public void uploadOption(List<ShippingOption> options) {
		deleteOption(options.get(0).getShippingNo());
		int result = 1;
		for (ShippingOption option : options) {
			result = sm.updateOption(option);
			if (result == 0) {
				throw new FailUpdateException("업데이트에 실패 하였습니다.");
			}
		}
	}

	@Override
	 public List<ShippingOption> settingOptionsShippingNo(List<ShippingOption> options, String shippingNo) {
		for (ShippingOption option : options) {
			option.setShippingNo(shippingNo);
		}
		return options;
	}

}
