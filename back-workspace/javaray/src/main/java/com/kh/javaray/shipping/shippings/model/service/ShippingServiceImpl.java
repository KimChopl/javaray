package com.kh.javaray.shipping.shippings.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.javaray.api.OpenDataApi;
import com.kh.javaray.auth.service.AuthenticationService;
import com.kh.javaray.exception.exceptions.FailUpdateException;
import com.kh.javaray.exception.exceptions.NotFoundInfoException;
import com.kh.javaray.exception.exceptions.NotFoundUserInfoException;
import com.kh.javaray.exception.exceptions.NotMatchBoardInfoException;
import com.kh.javaray.exception.exceptions.NotMatchUserInfoException;
import com.kh.javaray.member.model.dto.CustomUserDetails;
import com.kh.javaray.shipping.dto.Image;
import com.kh.javaray.shipping.dto.Weather;
import com.kh.javaray.shipping.shippings.model.dto.Fishs;
import com.kh.javaray.shipping.shippings.model.dto.Port;
import com.kh.javaray.shipping.shippings.model.dto.SearchPort;
import com.kh.javaray.shipping.shippings.model.dto.Shipping;
import com.kh.javaray.shipping.shippings.model.dto.ShippingOption;
import com.kh.javaray.shipping.shippings.model.dto.ShippingFormDTO;
import com.kh.javaray.shipping.shippings.model.mapper.ShippingMapper;
import com.kh.javaray.template.model.service.ImageService;
import com.kh.javaray.template.xss.XssService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShippingServiceImpl implements ShippingService {

	private final ShippingMapper shippingMapper;
	private final OpenDataApi openDataAPI;
	private final AuthenticationService authService;
	private final XssService xssService;
	private final ImageService imageService;
	private final FishService fishService;
	private final OptionService optionService;

	@Override
	public List<Shipping> selectShipping(int page) {
		RowBounds rb = makingRowBounds(page);
		List<Shipping> list = shippingMapper.selectShipping(rb);
		return list;

	}

	private RowBounds makingRowBounds(int page) {
		int size = 20;
		return new RowBounds(page * size, size);
	}

	private Shipping checkedShipping(String shippingNo) {
		log.info(shippingNo);
		Shipping shipping = shippingMapper.selectShippingDetail(shippingNo);
		if (shipping == null) {
			throw new NotMatchBoardInfoException("조회된 항목이 없습니다.");
		}
		return shipping;
	}

	@Override
	@Transactional
	public Map<String, Object> selectShippingDetail(String shippingNo) {
		Shipping shipping = checkedShipping(shippingNo);
		List<Weather> weather = openDataAPI.weatherApi(shipping.getPort().getSpotCode());
		Map<String, Object> response = new HashMap<String, Object>();
		response.put("shipping", shipping);
		response.put("weather", weather);
		return response;
	}

	@Override
	public Shipping selectUpdateForm(String shippingNo) {
		CustomUserDetails user = authService.checkedUser();
		Shipping shipping = shippingMapper.selectShippingDetail(shippingNo);
		if (!shipping.getMember().getUserNo().equals(user.getUserNo())) {
			throw new NotMatchUserInfoException("유저 정보가 일치하지 않습니다.");
		}
		Shipping update = Shipping.builder().allowPepleNo(shipping.getAllowPepleNo()).fishs(shipping.getFishs())
				.images(shipping.getImages()).member(shipping.getMember()).options(shipping.getOptions())
				.port(shipping.getPort()).price(shipping.getPrice())
				.shippingContent(xssService.changeSelectForm(shipping.getShippingContent())).shippingNo(shippingNo)
				.shippingTitle(shipping.getShippingTitle()).build();
		return update;
	}

	@Override
	public List<Port> selectSearchPort(String option, String searchContent) {
		SearchPort search = SearchPort.builder().option(option).searchContent(searchContent).build();
		return shippingMapper.selectSearchPort(search);
	}

	private void matchShippingInfo(String shippingNo) {
		Shipping shipping = shippingMapper.selectShippingDetail(shippingNo);
		if (shipping == null) {
			throw new NotFoundInfoException("잘못된 접근입니다. 다시 시도해주세요.");
		}
		checkedUserInfo(shipping);
	}
	
	private void checkedUserInfo(Shipping shipping) {
		CustomUserDetails user = authService.checkedUser();
		if (user.getUserNo() != shipping.getMember().getUserNo()) {
			throw new NotFoundUserInfoException("잘못된 접근입니다. 다시 시도해주세요.");
		}
	}

	private List<Image> settingImageShippingNo(List<Image> images, String ShippingNo) {
		if (images != null) {
			for (Image image : images) {
				image.setBoardNo(ShippingNo);
			}
		}
		return images;
	}



	private ShippingFormDTO settingXss(ShippingFormDTO shipping) {
		shipping.setShippingContent(xssService.changeInsertForm(xssService.makingXss(shipping.getShippingContent())));
		shipping.setShippingTitle(xssService.makingXss(shipping.getShippingTitle()));
		return shipping;
	}

	@Transactional
	private void updateValues(ShippingFormDTO shipping) {
		String shippingNo = shipping.getShippingNo();
		List<ShippingOption> uploadUption = shipping.getOptions();
		List<Fishs> uploadFish = shipping.getFishs();
		optionService.uploadOption(optionService.settingOptionsShippingNo(uploadUption, shippingNo));
		fishService.uploadFish(fishService.settingFishsShippingNo(uploadFish, shippingNo));
	}

	private ShippingFormDTO addShipping(ShippingFormDTO shipping) {
		String shippingNo = shipping.getShippingNo();
		matchShippingInfo(shippingNo);
		ShippingFormDTO uploadShipping = settingXss(shipping);
		return uploadShipping;
	}

	private ShippingFormDTO parsedShipping(String shippingString) {
		log.info(shippingString);
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			ShippingFormDTO shipping = objectMapper.readValue(shippingString, ShippingFormDTO.class);
			return shipping;
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			throw new FailUpdateException("업데이트에 실패하였습니다.");
		}
	}
	
	@Override
	@Transactional
	public ShippingFormDTO updateShipping(MultipartFile[] files, String shippingString) {
		ShippingFormDTO shipping = addShipping(parsedShipping(shippingString));
		String shippingNo = shipping.getShippingNo();
		shippingMapper.updateShipping(shipping);
		updateValues(shipping);
		List<Image> changeImage = shipping.getImages();
		List<Image> uploadImage = settingImageShippingNo(imageService.checkedImageMain(changeImage, files, shippingNo), shippingNo);
		imageService.insertImage(uploadImage);
		return shipping; // 의문
	}

	

	private ShippingFormDTO addUserNo(ShippingFormDTO shipping) {
		CustomUserDetails user = authService.checkedUser();
		shipping.setUserNo(user.getUserNo());
		return shipping;
	}

	@Override
	@Transactional
	public ShippingFormDTO insertShipping(MultipartFile[] files, String shipping) {
		ShippingFormDTO uploadShipping = addUserNo(settingXss(parsedShipping(shipping)));
		shippingMapper.insertShipping(uploadShipping);
		updateValues(uploadShipping);
		String shippingNo = uploadShipping.getShippingNo();
		List<Image> uploadImage = imageService.checkedImageMain(files, shippingNo);
		imageService.insertImage(settingImageShippingNo(uploadImage, shippingNo));
		return uploadShipping;
	}

}
