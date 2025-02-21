package com.kh.javaray.template.model.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.exception.exceptions.FailDeleteObjectException;
import com.kh.javaray.shipping.dto.Image;
import com.kh.javaray.shipping.shippings.model.dto.Shipping;
import com.kh.javaray.shipping.shippings.model.mapper.ShippingMapper;
import com.kh.javaray.template.model.mapper.ImageMapper;
import com.kh.javaray.template.upload.UploadImage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

	private final ImageMapper im;
	private final UploadImage ui;
	private final ShippingMapper sm;

	private void deleteBeforeImage(List<Image> list, List<Image> imageList) {
		log.info("{}", list);
		log.info("{}", imageList);
		if (list.size() != imageList.size()) { // 기존 사진에서 삭제한 사진이 있는지
			Set<String> setImage = imageList.stream().map(Image::getImageChangeName).collect(Collectors.toSet());
			List<Image> deleteImage = list.stream().filter(image -> !setImage.contains(image.getImageChangeName())).collect(Collectors.toList());
			log.info("{}",deleteImage);
		}

	}

	@Override
	public List<Image> checkedImageMain(List<Image> imageList, MultipartFile[] files, String shippingNo) {
		Shipping ship = sm.selectShippingDetail(shippingNo);
		List<Image> list = ship.getImages();
		MultipartFile[] uploadFiles = null;
		boolean isMain;
		if (list.isEmpty()) { // 기존 사진이 있는지
			if (files != null) { // 새로 업로드한 사진이 있는지
				uploadFiles = files;
				isMain = true;
				return ui.store(uploadFiles, isMain);
			}
			return null;
		} else {
			if (files != null) {
				deleteBeforeImage(list, imageList);
				uploadFiles = files;
				isMain = false;
				return ui.store(uploadFiles, isMain);
			} else {
				deleteBeforeImage(list, imageList);
				return null;
			}
		}
	}

	@Override
	public List<Image> checkedImageMain(MultipartFile[] files, String shippingNo) {
		return ui.store(files, true);
	}

	@Override
	public void deleteImage(List<Image> lists) {
		int result = 1;
		for (Image image : lists) {
			result = result * im.deleteImage(image);
		}
		if (result == 0) {
			throw new FailDeleteObjectException("업데이트 중 문제가 발생했습니다. 다시 시도해주세요.");
		}
	}

	public void deleteImage(Image deleteImage) {
		if (im.deleteImage(deleteImage) == 0) {
			throw new FailDeleteObjectException("업데이트 중 문제가 발생했습니다. 다시 시도해주세요.");
		}
	}

}
