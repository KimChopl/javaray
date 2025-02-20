package com.kh.javaray.template.model.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.exception.exceptions.FailDeleteObjectException;
import com.kh.javaray.shipping.dto.Image;
import com.kh.javaray.shipping.shippings.model.dto.Shipping;
import com.kh.javaray.shipping.shippings.model.mapper.ShippingMapper;
import com.kh.javaray.template.model.mapper.ImageMapper;
import com.kh.javaray.template.upload.UploadImage;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

	private ImageMapper im;
	private UploadImage ui;
	private ShippingMapper sm;

	private void deleteBeforeImage(List<Image> list, List<Image> imageList) {
		if (list.size() != imageList.size()) { // 기존 사진에서 삭제한 사진이 있는지
			List<Image> deleteImage = new ArrayList<Image>();
			for (Image image : list) {
				boolean isFound = false;
				for (Image delete : imageList) {
					if (image.getImageNo().equals(delete.getImageNo())) {
						isFound = true;
					}
				}
				if (!isFound) {
					deleteImage.add(image);
				}
			}
			ui.delete(deleteImage);
			for (int i = 0; i < deleteImage.size(); i++) {
				deleteImage(deleteImage);
				im.deleteImage(deleteImage.get(i));
			}
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

}
