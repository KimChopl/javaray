package com.kh.javaray.template.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.exception.exceptions.FailDeleteObjectException;
import com.kh.javaray.exception.exceptions.FailInsertObjectException;
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

	private final ImageMapper imageMapper;
	private final UploadImage uploadImage;
	private final ShippingMapper shippingMapper;

	private Map<String, List<Image>> checkedDeleteImage(List<Image> beforeImage, 
														List<Image> changeImage) {
		Map<String, List<Image>> map = new HashMap<String, List<Image>>();
		Set<String> setImage = changeImage.stream().map(Image::getImageChangeName).
														collect(Collectors.toSet());
		List<Image> deleteImage = beforeImage.stream().filter(image -> 
						!setImage.contains(image.getImageChangeName())).collect(Collectors.toList());
		List<Image> remainImage = beforeImage.stream().filter(image -> 
						setImage.contains(image.getImageChangeName())).collect(Collectors.toList());
		List<Image> imageLevel = remainImage.stream().filter(image -> 1 == image.getImageLevel())
											.collect(Collectors.toList());
		map.put("deleteImage", deleteImage);
		map.put("remainImage", remainImage);
		map.put("imageLevel", imageLevel);
		return map;
	}

	private boolean deleteBeforeImage(List<Image> list, List<Image> imageList) {
		if (list == null || list.isEmpty()) {
			return true;
		}
		if (list.size() != imageList.size()) {
			Map<String, List<Image>> map = checkedDeleteImage(list, imageList);
			List<Image> deleteImage = map.get("deleteImage");
			List<Image> remainImage = map.get("remainImage");
			List<Image> imageLevel = map.get("imageLevel");
			deleteImage(deleteImage);
			uploadImage.delete(deleteImage);
			if (!imageLevel.isEmpty() && !remainImage.isEmpty()) {
				imageMapper.updateImageLevel(remainImage.get(0).getImageNo());
				return false;
			}
			if (imageLevel.isEmpty()) {
				return true;
			}
		}
		return false;

	}

	@Override
	public List<Image> checkedImageMain(List<Image> imageList, MultipartFile[] files, String shippingNo) {
		Shipping ship = shippingMapper.selectShippingDetail(shippingNo);
		List<Image> list = ship.getImages();
		MultipartFile[] uploadFiles = null;
		boolean isMain = deleteBeforeImage(list, imageList);
		if (files != null) {
			uploadFiles = files;
			return uploadImage.store(uploadFiles, isMain);
		} 
		return null;
	}

	@Override
	public List<Image> checkedImageMain(MultipartFile[] files, String shippingNo) {
		return uploadImage.store(files, true);
	}

	@Override
	public void deleteImage(List<Image> lists) {
		int result = 1;
		for (Image image : lists) {
			result = result * imageMapper.deleteImage(image);
		}
		if (result == 0) {
			throw new FailDeleteObjectException("업데이트 중 문제가 발생했습니다. 다시 시도해주세요.");
		}
	}

	@Override
	public void deleteImage(Image deleteImage) {
		if (imageMapper.deleteImage(deleteImage) == 0) {
			throw new FailDeleteObjectException("업데이트 중 문제가 발생했습니다. 다시 시도해주세요.");
		}
	}

	@Override
	public void insertImage(List<Image> images) {
		if (images != null) {
			int result = 1;
			for (Image image : images) {
				result = imageMapper.insertImage(image);
				if (result == 0) {
					throw new FailInsertObjectException("업데이트에 실패했습니다. 다시 시도해주세요.");
				}
			}
		}
	}

}
