package com.kh.javaray.shipping.shippings.model.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.api.OpenDataApi;
import com.kh.javaray.auth.service.AuthenticationService;
import com.kh.javaray.exception.exceptions.FailDeleteObjectException;
import com.kh.javaray.exception.exceptions.FailInsertObjectException;
import com.kh.javaray.exception.exceptions.FailUpdateException;
import com.kh.javaray.exception.exceptions.NotFoundInfoException;
import com.kh.javaray.exception.exceptions.NotFoundUserInfoException;
import com.kh.javaray.exception.exceptions.NotMatchBoardInfoException;
import com.kh.javaray.exception.exceptions.NotMatchUserInfoException;
import com.kh.javaray.member.model.dto.CustomUserDetails;
import com.kh.javaray.shipping.dto.Image;
import com.kh.javaray.shipping.dto.Weather;
import com.kh.javaray.shipping.shippings.model.dto.Attention;
import com.kh.javaray.shipping.shippings.model.dto.Fishs;
import com.kh.javaray.shipping.shippings.model.dto.Port;
import com.kh.javaray.shipping.shippings.model.dto.SearchPort;
import com.kh.javaray.shipping.shippings.model.dto.Shipping;
import com.kh.javaray.shipping.shippings.model.dto.ShippingOption;
import com.kh.javaray.shipping.shippings.model.dto.UpdateFormDTO;
import com.kh.javaray.shipping.shippings.model.mapper.ShippingMapper;
import com.kh.javaray.template.model.mapper.ImageMapper;
import com.kh.javaray.template.upload.UploadImage;
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
	private final UploadImage ui;
	private final ImageMapper im;

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
		if (list == null || list.isEmpty()) {
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

	private List<Fishs> parseFish(String fishs) {
		List<Fishs> fishList = new ArrayList<>();
		String pattern = "fishNo:(.*?), fishName:(.*?)(,|$)"; // fishNo와 fishName을 추출하는 패턴
		Pattern r = Pattern.compile(pattern);
		Matcher m = r.matcher(fishs);
		Fishs fish = null;
		while (m.find()) {
			String fishNo = m.group(1); // fishNo 값
			String fishName = m.group(2); // fishName 값

			fish = Fishs.builder().fishNo(fishNo).fishName(fishName).build();
			fishList.add(fish);
		}
		return fishList;
	}

	private List<ShippingOption> parseOption(String option) {
		List<ShippingOption> optionList = new ArrayList<>();
		String pattern = "serviceNo:(.*?), serviceName:(.*?)(,|$)";
		Pattern r = Pattern.compile(pattern);
		Matcher m = r.matcher(option);
		ShippingOption options = null;
		while (m.find()) {
			String serviceNo = m.group(1);
			String serviceName = m.group(2);
			options = ShippingOption.builder().serviceNo(serviceNo).serviceName(serviceName).build();
			optionList.add(options);
		}
		return optionList;
	}

	private Port parsePort(String port) {
		String pattern = "portNo:(.*?), address:(.*?), detailAddress:(.*?)(,|$)";
		Pattern r = Pattern.compile(pattern);
		Matcher m = r.matcher(port);
		Port parsePort = null;
		if (m.find()) {
			String portNo = m.group(1);
			String address = m.group(2);
			String detailAddress = m.group(3);
			parsePort = Port.builder().portNo(portNo).address(address).detailAddress(detailAddress).build();
		}
		return parsePort;
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

	private void deleteOption(String shippingNo) {
		sm.deleteOption(shippingNo);
		List<ShippingOption> list = sm.selectOption(shippingNo);
		if (!list.isEmpty()) {
			throw new NotFoundInfoException("업데이트에 실패 하였습니다.");
		}
	}

	private void updateOption(List<ShippingOption> options) {
		deleteOption(options.get(0).getShippingNo());
		int result = 1;

		for (ShippingOption option : options) {
			result = result * sm.updateOption(option);
		}
		if (result == 0) {
			throw new FailUpdateException("업데이트에 실패 하였습니다.");
		}
	}

	private void deleteFish(String shippingNo) {
		sm.deleteFish(shippingNo);
		List<Fishs> list = sm.selectFishsByShippingNo(shippingNo);
		if (!list.isEmpty()) {
			throw new NotFoundInfoException("업데이트에 실패 하였습니다.");
		}
	}

	private void updateFish(List<Fishs> fishs) {
		deleteFish(fishs.get(0).getShippingNo());
		for (Fishs fish : fishs) {
			sm.updateFish(fish);
		}
	}

	private void deleteImage(List<Image> lists) {
		int result = 1;
		for (Image image : lists) {
			result = result * im.deleteImage(image);
		}
		if (result == 0) {
			throw new FailDeleteObjectException("업데이트 중 문제가 발생했습니다. 다시 시도해주세요.");
		}
	}

	private List<Image> checkedImageMain(List<Image> imageList, MultipartFile[] files, String shippingNo) {
		Shipping ship = sm.selectShippingDetail(shippingNo);
		String path = "shipping";
		List<Image> list = ship.getImages();
		MultipartFile[] uploadFiles = null;
		boolean isMain;
		if(list.isEmpty()) { // 기존 사진이 있는지
			if(files != null) { // 새로 업로드한 사진이 있는지
				uploadFiles = files;
				isMain = true;
				return ui.store(uploadFiles, path, isMain);
			}
			return null;
		} else {
			if(files != null) {
				if(list.size() != imageList.size()) { // 기존 사진에서 삭제한 사진이 있는지
					List<Image> deleteImage = new ArrayList<Image>();
					for(Image image : list) {
						boolean isFound = false;
						for(Image delete : imageList) {
							if(image.getImageNo().equals(delete.getImageNo())) {
								isFound = true;
							}
						}
						if(!isFound) {
							deleteImage.add(image);
						}
					}
					ui.delete(deleteImage);
					for(int i = 0; i< deleteImage.size(); i++) {
						im.deleteImage(deleteImage.get(i));
					}
				} 
				uploadFiles = files;
				isMain = false;
				return ui.store(uploadFiles, path, isMain);
			} else {
				if(list.size() != imageList.size()) {
					List<Image> deleteImage = new ArrayList<Image>();
					for(Image image : list) {
						boolean isFound = false;
						for(Image delete : imageList) {
							if(image.getImageNo().equals(delete.getImageNo())) {
								isFound = true;
							}
						}
						if(!isFound) {
							deleteImage.add(image);
						}
					}
					ui.delete(deleteImage);
					for(int i = 0; i< deleteImage.size(); i++) {
						im.deleteImage(deleteImage.get(i));
					}
				}
				return null;
			}
		}
	}

	private List<Fishs> settingFishsShippingNo(List<Fishs> fishs, String shippingNo) {
		for (Fishs fish : fishs) {
			fish.setShippingNo(shippingNo);
		}
		return fishs;
	}

	private List<ShippingOption> settingOptionsShippingNo(List<ShippingOption> options, String shippingNo) {
		for (ShippingOption option : options) {
			option.setShippingNo(shippingNo);
		}
		return options;
	}

	private List<Image> settingImageShippingNo(List<Image> images, String ShippingNo) {
		if(images != null) {
			
			for (Image image : images) {
				image.setBoardNo(ShippingNo);
			}
		}
		return images;
	}
	
	private List<Image> parseImage(String stringImage){
		String pattern = "imageNo:(.*?), imagePath:(.*?), imageChangeName:(.*?), imageLevel:(.*?)(,|$)";
		Pattern r = Pattern.compile(pattern);
		Matcher m = r.matcher(stringImage);
		Image image = null;
		List<Image> list = new ArrayList<Image>();
		while(m.find()) {
			String imageNo = m.group(1);
			String imagePath = m.group(2);
			String imageChangeName = m.group(3);
			int imageLevel = Integer.parseInt(m.group(4));
			image = Image.builder().imageNo(Long.parseLong(imageNo)).imagePath(imagePath).imageChangeName(imageChangeName).imageLevel(imageLevel).build();
			list.add(image);
		}
		return list;
	}

	@Override
	@Transactional
	public void updateShipping(MultipartFile[] files, UpdateFormDTO shipping, String fishs, String option,
			String port, String stringImage) {
		String shippingNo = shipping.getShippingNo();
		matchShippingInfo(shippingNo);
		List<Image> imageList = parseImage(stringImage);
		List<Image> uploadImage = checkedImageMain(imageList, files, shippingNo);
		List<Fishs> fish = parseFish(fishs);
		List<ShippingOption> options = parseOption(option);
		Port parsePort = parsePort(port);
		shipping.setShippingContent(xs.changeInsertForm(xs.makingXss(shipping.getShippingContent())));
		shipping.setShippingTitle(xs.makingXss(shipping.getShippingTitle()));
		shipping.setPort(parsePort);
		sm.updateShipping(shipping);
		insertImage(settingImageShippingNo(uploadImage, shippingNo));
		updateOption(settingOptionsShippingNo(options, shippingNo));
		updateFish(settingFishsShippingNo(fish, shippingNo));

	}

	private void insertImage(List<Image> images) {
		if(images != null) {
			int result = 1;
			for (Image image : images) {
				result = result * im.insertImage(image);
			}
			if (result == 0) {
				throw new FailInsertObjectException("업데이트에 실패했습니다. 다시 시도해주세요.");
			}
		}

	}

}
