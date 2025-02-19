package com.kh.javaray.shipping.shippings.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.shipping.shippings.model.dto.Attention;
import com.kh.javaray.shipping.shippings.model.dto.Fishs;
import com.kh.javaray.shipping.shippings.model.dto.Port;
import com.kh.javaray.shipping.shippings.model.dto.Shipping;
import com.kh.javaray.shipping.shippings.model.dto.UpdateFormDTO;

public interface ShippingService {

	List<Shipping> selectShipping(int page);

	Map<String, Object> selectShippingDetail(String shippingNo);

	Shipping selectUpdateForm(String shippingNo);

	List<Port> selectSearchPort(String option, String searchContent);

	void updateShipping(MultipartFile[] files, UpdateFormDTO shipping, String fishs, String option, String port,
			String stringImage);

	void insertShipping(MultipartFile[] files, UpdateFormDTO shipping, String fishs, String option, String port);

}
