package com.kh.javaray.shipping.shippings.model.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.javaray.api.OpenDataApi;
import com.kh.javaray.auth.service.AuthenticationService;
import com.kh.javaray.exception.exceptions.NotFoundInfoException;
import com.kh.javaray.exception.exceptions.NotFoundUserInfoException;
import com.kh.javaray.exception.exceptions.NotMatchBoardInfoException;
import com.kh.javaray.exception.exceptions.NotMatchUserInfoException;
import com.kh.javaray.member.model.dto.CustomUserDetails;
import com.kh.javaray.shipping.dto.MiddleWeather;
import com.kh.javaray.shipping.dto.Weather;
import com.kh.javaray.shipping.shippings.model.dto.Attention;
import com.kh.javaray.shipping.shippings.model.dto.Fishs;
import com.kh.javaray.shipping.shippings.model.dto.Port;
import com.kh.javaray.shipping.shippings.model.dto.SearchPort;
import com.kh.javaray.shipping.shippings.model.dto.Shipping;
import com.kh.javaray.shipping.shippings.model.dto.UpdateFormDTO;
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
	private final ObjectMapper om;

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
		log.info("{}", shipping);
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

	@Override
	public List<Port> selectSearchPort(String option, String searchContent) {
		SearchPort search = SearchPort.builder().option(option).searchContent(searchContent).build();
		log.info("{}", search);
		return sm.selectSearchPort(search);
	}

	@Override
	public void updateShipping(MultipartFile[] files, UpdateFormDTO shipping, String fishs, String option,
			String port) {
		 List<Fishs> fishList = new ArrayList<>();

	        // 정규 표현식 패턴: fishNo와 fishName을 추출
	        String pattern = "fishNo:(.*?), fishName:(.*?)(,|$)";  // fishNo와 fishName을 추출하는 패턴

	        // 패턴에 맞는 값을 찾기 위한 Matcher 객체 생성
	        Pattern r = Pattern.compile(pattern);
	        Matcher m = r.matcher(fishs);
	        Fishs fish = null;
	        // 매칭되는 값들을 Fish 객체에 담아서 List에 추가
	        while (m.find()) {
	            String fishNo = m.group(1);  // fishNo 값
	            String fishName = m.group(2);  // fishName 값

	            // Fish 객체 생성 후 리스트에 추가
	            fish = Fishs.builder().fishNo(fishNo).fishName(fishName).build();
	            fishList.add(fish);
	        }
	        log.info("{}", fish);
		
	}

}
