package com.kh.javaray.shipping.shippings.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.api.OpenDataApi;
import com.kh.javaray.auth.service.AuthenticationService;
import com.kh.javaray.exception.exceptions.FailInsertObjectException;
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
	private final ImageMapper im;
	private final ParseObject po;
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

	private void matchShippingInfo(String ShippingNo) {
		Shipping shipping = sm.selectShippingDetail(ShippingNo);
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

	private Map<String, Object> parse(MultipartFile[] files, UpdateFormDTO shipping, String fishs, String option,
			String port, String stringImage) {
		Map<String, Object> map = new HashMap<String, Object>();
		String shippingNo = shipping.getShippingNo();
		matchShippingInfo(shippingNo);
		List<Image> imageList = null;
		List<Image> uploadImage = null;
		if (stringImage != null) {
			imageList = po.parseImage(stringImage);
			uploadImage = is.checkedImageMain(imageList, files, shippingNo);
		} else {
			uploadImage = is.checkedImageMain(files, shippingNo);
		}
		List<Fishs> fish = po.parseFish(fishs);
		List<ShippingOption> options = po.parseOption(option);
		Port parsePort = po.parsePort(port);
		map.put("uploadImage", uploadImage);
		map.put("fish", fish);
		map.put("options", options);
		map.put("parsePort", parsePort);
		return map;
	}

	private UpdateFormDTO settingXss(UpdateFormDTO shipping, Port parsePort) {
		shipping.setShippingContent(xs.changeInsertForm(xs.makingXss(shipping.getShippingContent())));
		shipping.setShippingTitle(xs.makingXss(shipping.getShippingTitle()));
		shipping.setPort(parsePort);
		return shipping;
	}

	private void updateValues(Map<String, Object> map, String shippingNo) {
		List<Image> uploadImage = (List<Image>) map.get("uploadImage");
		List<ShippingOption> uploadUption = (List<ShippingOption>) map.get("options");
		List<Fishs> uploadFish = (List<Fishs>) map.get("fish");
		insertImage(settingImageShippingNo(uploadImage, shippingNo));
		os.uploadOption(os.settingOptionsShippingNo(uploadUption, shippingNo));
		fs.uploadFish(fs.settingFishsShippingNo(uploadFish, shippingNo));
	}

	private Map<String, Object> addShipping(MultipartFile[] files, UpdateFormDTO shipping, String fishs, String option,
			String port, String stringImage) {
		String shippingNo = shipping.getShippingNo();
		matchShippingInfo(shippingNo);
		Map<String, Object> map = parse(files, shipping, fishs, option, port, stringImage);
		Port uploadPort = (Port) map.get("parsePort");
		UpdateFormDTO uploadShipping = settingXss(shipping, uploadPort);
		map.put("upload", uploadShipping);
		map.put("shippingNo", shippingNo);
		return map;
	}

	@Override
	@Transactional
	public void updateShipping(MultipartFile[] files, UpdateFormDTO shipping, String fishs, String option, String port,
			String stringImage) {
		Map<String, Object> map = addShipping(files, shipping, fishs, option, port, stringImage);
		UpdateFormDTO uploadShipping = (UpdateFormDTO) map.get("uploadShipping");
		sm.updateShipping(uploadShipping);
		updateValues(map, String.valueOf(map.get("shippingNo")));
		// 너무 많음
	}

	private void insertImage(List<Image> images) {
		if (images != null) {
			int result = 1;
			for (Image image : images) {
				result = im.insertImage(image);
				if (result == 0) {
					throw new FailInsertObjectException("업데이트에 실패했습니다. 다시 시도해주세요.");
				}
			}
		}

	}

	private Map<String, Object> addUserNo(MultipartFile[] files, UpdateFormDTO shipping, String fishs, String option,
			String port) {
		Map<String, Object> map = parse(files, shipping, fishs, option, port, null);
		UpdateFormDTO uploadShipping = settingXss(shipping, (Port) map.get("parsePort"));
		CustomUserDetails user = as.checkedUser();
		uploadShipping.setUserNo(user.getUserNo());
		map.put("uploadShipping", uploadShipping);
		return map;
	}

	@Override
	@Transactional
	public void insertShipping(MultipartFile[] files, UpdateFormDTO shipping, String fishs, String option,
			String port) {
		Map<String, Object> map = addUserNo(files, shipping, fishs, option, port);
		UpdateFormDTO uploadShipping = (UpdateFormDTO) map.get("uploadShipping");
		sm.insertShipping(uploadShipping);
		String shippingNo = ((UpdateFormDTO) (map.get("uploadShipping"))).getShippingNo();
		updateValues(map, shippingNo);
	}

}
