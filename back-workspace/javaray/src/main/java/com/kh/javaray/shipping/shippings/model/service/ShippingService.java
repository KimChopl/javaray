package com.kh.javaray.shipping.shippings.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.shipping.shippings.model.dto.Port;
import com.kh.javaray.shipping.shippings.model.dto.Shipping;
import com.kh.javaray.shipping.shippings.model.dto.ShippingFormDTO;

public interface ShippingService {

	List<Shipping> selectShipping(int page, int size);

	Map<String, Object> selectShippingDetail(String shippingNo);

	Shipping selectUpdateForm(String shippingNo);

	List<Port> selectSearchPort(String option, String searchContent);

	ShippingFormDTO updateShipping(MultipartFile[] files, String shipping);

	ShippingFormDTO insertShipping(MultipartFile[] files, String shipping);
	
	Shipping checkedShipping(String shippingNo);

}
