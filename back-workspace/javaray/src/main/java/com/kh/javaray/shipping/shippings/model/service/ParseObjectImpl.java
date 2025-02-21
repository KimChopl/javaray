package com.kh.javaray.shipping.shippings.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.shipping.dto.Image;
import com.kh.javaray.shipping.shippings.model.dto.Fishs;
import com.kh.javaray.shipping.shippings.model.dto.Port;
import com.kh.javaray.shipping.shippings.model.dto.ShippingOption;
import com.kh.javaray.shipping.shippings.model.dto.UpdateFormDTO;

@Component
public class ParseObjectImpl implements ParseObject{

	@Override
	public List<Fishs> parseFish(String fishs) {
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

	@Override
	public List<ShippingOption> parseOption(String option) {
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

	@Override
	public Port parsePort(String port) {
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

	@Override
	public List<Image> parseImage(String stringImage) {
		String pattern = "imageNo:(.*?), imagePath:(.*?), imageChangeName:(.*?), imageLevel:(.*?)(,|$)";
		Pattern r = Pattern.compile(pattern);
		Matcher m = r.matcher(stringImage);
		Image image = null;
		List<Image> list = new ArrayList<Image>();
		while (m.find()) {
			String imageNo = m.group(1);
			String imagePath = m.group(2);
			String imageChangeName = m.group(3);
			int imageLevel = Integer.parseInt(m.group(4));
			image = Image.builder().imageNo(Long.parseLong(imageNo)).imagePath(imagePath)
					.imageChangeName(imageChangeName).imageLevel(imageLevel).build();
			list.add(image);
		}
		return list;
	}

	

}
