package com.kh.javaray.shipping.shippings.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.javaray.api.OpenDataApi;
import com.kh.javaray.auth.service.AuthenticationService;
import com.kh.javaray.exception.exceptions.NotFoundInfoException;
import com.kh.javaray.exception.exceptions.NotMatchBoardInfoException;
import com.kh.javaray.exception.exceptions.NotMatchUserInfoException;
import com.kh.javaray.member.model.dto.CustomUserDetails;
import com.kh.javaray.exception.exceptions.FailInsertObjectException;
import com.kh.javaray.exception.exceptions.FailUpdateException;
import com.kh.javaray.exception.exceptions.NotFoundUserInfoException;
import com.kh.javaray.shipping.dto.Image;
import com.kh.javaray.shipping.dto.Weather;
import com.kh.javaray.shipping.shippings.model.dto.Fishs;
import com.kh.javaray.shipping.shippings.model.dto.Port;
import com.kh.javaray.shipping.shippings.model.dto.SearchPort;
import com.kh.javaray.shipping.shippings.model.dto.Shipping;
import com.kh.javaray.shipping.shippings.model.dto.ShippingOption;
import com.kh.javaray.shipping.shippings.model.dto.UpdateFormDTO;
import com.kh.javaray.shipping.shippings.model.mapper.ShippingMapper;
import com.kh.javaray.template.model.mapper.ImageMapper;
import com.kh.javaray.template.model.service.ImageService;
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
	private final ImageService is;
	private final FishService fs;
	private final OptionService os;

	@Override
	public List<Shipping> selectShipping(int page) {
		RowBounds rb = makingRowBounds(page);
		List<Shipping> list = sm.selectShipping(rb);
		return list;

	}

	private RowBounds makingRowBounds(int page) {
		int size = 20;
		return new RowBounds(page * size, size);
	}

	private Shipping checkedShipping(String shippingNo) {
		log.info(shippingNo);
		Shipping shipping = sm.selectShippingDetail(shippingNo);
		if (shipping == null) {
			throw new NotMatchBoardInfoException("조회된 항목이 없습니다.");
		}
		return shipping;
	}

	@Override
	@Transactional
	public Map<String, Object> selectShippingDetail(String shippingNo) {
		Shipping shipping = checkedShipping(shippingNo);
		List<Weather> weather = oda.weatherApi(shipping.getPort().getSpotCode());
		Map<String, Object> response = new HashMap<String, Object>();
		response.put("shipping", shipping);
		response.put("weather", weather);
		return response;
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
	public List<Port> selectSearchPort(String option, String searchContent) {
		SearchPort search = SearchPort.builder().option(option).searchContent(searchContent).build();
		return sm.selectSearchPort(search);
	}

	private void matchShippingInfo(String shippingNo) {
		Shipping shipping = sm.selectShippingDetail(shippingNo);
		if (shipping == null) {
			throw new NotFoundInfoException("잘못된 접근입니다. 다시 시도해주세요.");
		}
		CustomUserDetails user = as.checkedUser();
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



	private UpdateFormDTO settingXss(UpdateFormDTO shipping) {
		shipping.setShippingContent(xs.changeInsertForm(xs.makingXss(shipping.getShippingContent())));
		shipping.setShippingTitle(xs.makingXss(shipping.getShippingTitle()));
		return shipping;
	}

	private void updateValues(UpdateFormDTO shipping) {
		String shippingNo = shipping.getShippingNo();
		List<ShippingOption> uploadUption = shipping.getOptions();
		List<Fishs> uploadFish = shipping.getFishs();
		os.uploadOption(os.settingOptionsShippingNo(uploadUption, shippingNo));
		fs.uploadFish(fs.settingFishsShippingNo(uploadFish, shippingNo));
	}

	private UpdateFormDTO addShipping(UpdateFormDTO shipping) {
		String shippingNo = shipping.getShippingNo();
		matchShippingInfo(shippingNo);
		UpdateFormDTO uploadShipping = settingXss(shipping);
		return uploadShipping;
	}

	private UpdateFormDTO parsedShipping(String shippingString) {
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			UpdateFormDTO shipping = objectMapper.readValue(shippingString, UpdateFormDTO.class);
			return shipping;
		} catch (JsonProcessingException e) {
			throw new FailUpdateException("업데이트에 실패하였습니다.");
		}
	}
	
	@Override
	@Transactional
	public UpdateFormDTO updateShipping(MultipartFile[] files, String shippingString) {
		UpdateFormDTO shipping = addShipping(parsedShipping(shippingString));
		updateValues(shipping);
		String shippingNo = shipping.getShippingNo();
		List<Image> changeImage = shipping.getImages();
		List<Image> uploadImage = settingImageShippingNo(is.checkedImageMain(changeImage, files, shippingNo), shippingNo);
		is.insertImage(uploadImage);
		return shipping;
	}

	

	private UpdateFormDTO addUserNo(UpdateFormDTO shipping) {
		CustomUserDetails user = as.checkedUser();
		shipping.setUserNo(user.getUserNo());
		return shipping;
	}

	@Override
	@Transactional
	public UpdateFormDTO insertShipping(MultipartFile[] files, String shipping) {
		UpdateFormDTO uploadShipping = addUserNo(settingXss(parsedShipping(shipping)));
		sm.insertShipping(uploadShipping);
		updateValues(uploadShipping);
		String shippingNo = uploadShipping.getShippingNo();
		List<Image> uploadImage = is.checkedImageMain(files, shippingNo);
		is.insertImage(settingImageShippingNo(uploadImage, shippingNo));
		return uploadShipping;
	}

}
