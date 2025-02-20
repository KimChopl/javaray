package com.kh.javaray.shipping.shippings.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.javaray.api.OpenDataApi;
import com.kh.javaray.auth.service.AuthenticationService;
import com.kh.javaray.exception.exceptions.NotFoundInfoException;
import com.kh.javaray.exception.exceptions.NotMatchBoardInfoException;
import com.kh.javaray.exception.exceptions.NotMatchUserInfoException;
import com.kh.javaray.member.model.dto.CustomUserDetails;
import com.kh.javaray.shipping.dto.Weather;
import com.kh.javaray.shipping.shippings.model.dto.Attention;
import com.kh.javaray.shipping.shippings.model.dto.Fishs;
import com.kh.javaray.shipping.shippings.model.dto.Shipping;
import com.kh.javaray.shipping.shippings.model.mapper.ShippingMapper;
import com.kh.javaray.template.xss.XssService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShippingServiceImpl implements ShippingService {

	private final ShippingMapper sm;
	private final OpenDataApi oda;
	private final AuthenticationService as;
	private final XssService xs;

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
		if (shipping == null) {
			throw new NotMatchBoardInfoException("조회된 항목이 없습니다.");
		}
		String spotCode = shipping.getPort().getSpotCode();
		List<Weather> weather = oda.weatherApi(spotCode);
		Map<String, Object> response = new HashMap<String, Object>();
		response.put("shipping", shipping);
		response.put("weather", weather);
		return response;
	}

	@Override
	public Fishs selectFish(String fishNo) {
		Fishs fish = sm.selectFish(fishNo);
		if (fish == null) {
			throw new NotMatchBoardInfoException("조회된 항목이 없습니다.");
		}
		return fish;
	}

	private Attention makingAttention(String shippingNo, CustomUserDetails user) {
		return Attention.builder().shippingNo(shippingNo).userNo(user.getUserNo()).build();
	}

	@Override
	public void insertAttention(String shippingNo) {
		CustomUserDetails user = as.checkedUser();
		Attention attention = makingAttention(shippingNo, user);
		int result = sm.insertAttention(attention);
		log.info("{}", result);

	}

	@Override
	public void deleteAttention(String shippingNo) {
		CustomUserDetails user = as.checkedUser();
		Attention attention = makingAttention(shippingNo, user);
		int result = sm.deleteAttention(attention);
		log.info("{}", result);
	}

	@Override
	public int selectAttention(String shippingNo) {
		CustomUserDetails user = as.checkedUser();
		Attention att = makingAttention(shippingNo, user);
		return sm.selectAttention(att);
	}

	@Override
	public Shipping selectUpdateForm(String shippingNo) {
		CustomUserDetails user = as.checkedUser();
		Shipping shipping = sm.selectShippingDetail(shippingNo);
		if (!shipping.getMember().getUserNo().equals(user.getUserNo())) {
			throw new NotMatchUserInfoException("유저 정보가 일치하지 않습니다.");
		}
		Shipping update = Shipping.builder().allowPepleNo(shipping.getAllowPepleNo()).fishs(shipping.getFishs())
				.images(shipping.getImages()).member(shipping.getMember()).options(shipping.getOptions())
				.port(shipping.getPort()).price(shipping.getPrice())
				.shippingContent(xs.changeSelectForm(shipping.getShippingContent())).shippingNo(shippingNo)
				.shippingTitle(shipping.getShippingTitle()).build();
		return update;
	}

	@Override
	public List<Fishs> selectFish() {
		List<Fishs> list = sm.selectFishs(); 
		if(list == null || list.isEmpty()) {
			throw new NotFoundInfoException("해당목록을 찾지 못했습니다.");
		}
		return list;
				
	}

}
