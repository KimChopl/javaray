package com.kh.javaray.template.model.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.shipping.dto.Image;

public interface ImageService {
	List<Image> checkedImageMain(List<Image> imageList, MultipartFile[] files, String shippingNo);
	List<Image> checkedImageMain(MultipartFile[] files, String shippingNo);
	void deleteImage(List<Image> lists);
}
