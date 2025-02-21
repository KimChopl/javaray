package com.kh.javaray.shipping.shippings.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.shipping.dto.Image;
import com.kh.javaray.shipping.shippings.model.dto.Fishs;
import com.kh.javaray.shipping.shippings.model.dto.Port;
import com.kh.javaray.shipping.shippings.model.dto.ShippingOption;
import com.kh.javaray.shipping.shippings.model.dto.UpdateFormDTO;

public interface ParseObject {
	List<Fishs> parseFish(String fishs);
	List<ShippingOption> parseOption(String option);
	Port parsePort(String port);
	List<Image> parseImage(String stringImage);
}
