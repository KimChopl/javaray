package com.kh.javaray.shipping.shippings.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.shipping.shippings.model.dto.Fishs;
import com.kh.javaray.shipping.shippings.model.dto.Port;
import com.kh.javaray.shipping.shippings.model.dto.Shipping;
import com.kh.javaray.shipping.shippings.model.dto.UpdateFormDTO;
import com.kh.javaray.shipping.shippings.model.service.AttentionService;
import com.kh.javaray.shipping.shippings.model.service.FishService;
import com.kh.javaray.shipping.shippings.model.service.ShippingService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@RequestMapping("shippings")
@Slf4j
public class ShippingController {

	private final ShippingService ss;
	private final AttentionService as;
	private final FishService fs;

	@GetMapping
	public ResponseEntity<List<Shipping>> selectShippings(@RequestParam(name = "page", defaultValue = "0") int page) {

		List<Shipping> shipping = ss.selectShipping(page);

		return ResponseEntity.ok().body(shipping);
	}

	@GetMapping("detail")
	public ResponseEntity<Map<String, Object>> selectShippingDetail(
			@RequestParam(name = "shippingNo") String shippingNo) {
		Map<String, Object> response = ss.selectShippingDetail(shippingNo);
		return ResponseEntity.ok().body(response);
	}

	@GetMapping("fish")
	public ResponseEntity<Fishs> selectFish(@RequestParam(name = "fishNo") String fishNo) {
		Fishs fish = fs.selectFish(fishNo);
		return ResponseEntity.ok().body(fish);
	}

	@PostMapping("attention")
	public ResponseEntity<String> insertAttention(@RequestParam(name = "shippingNo") String shippingNo) {
		log.info(shippingNo);
		as.insertAttention(shippingNo);
		return ResponseEntity.ok().body("등록 완료");
	}

	@DeleteMapping("attention")
	public ResponseEntity<String> deleteAttention(@RequestParam(name = "shippingNo") String shippingNo) {
		as.deleteAttention(shippingNo);
		return ResponseEntity.ok().body("삭제 완료");
	}

	@GetMapping("attention")
	public ResponseEntity<?> selectAttention(@RequestParam(name = "shippingNo") String shippingNo) {
		int att = as.selectAttention(shippingNo);
		return ResponseEntity.ok().body(att);
	}

	@GetMapping("update")
	public ResponseEntity<Shipping> selectUpdateForm(@RequestParam(name = "shippingNo") String shippingNo) {
		Shipping shipping = ss.selectUpdateForm(shippingNo);
		return ResponseEntity.ok().body(shipping);
	}

	@GetMapping("fishs")
	public ResponseEntity<List<Fishs>> selectFishs() {
		List<Fishs> list = fs.selectFish();
		return ResponseEntity.ok().body(list);
	}

	@GetMapping("search/port")
	public ResponseEntity<List<Port>> selectSearchPort(@RequestParam(name = "option", defaultValue = "1") String option,
			@RequestParam(name = "searchContent", defaultValue = "") String searchContent) {
		List<Port> list = ss.selectSearchPort(option, searchContent);
		return ResponseEntity.ok().body(list);
	}

	@PutMapping // 얘가 하는일이 너무 많음
	public ResponseEntity<?> updateShipping(@RequestParam(name = "files", required = false) MultipartFile[] files,
			@ModelAttribute UpdateFormDTO shipping, @ModelAttribute(name = "fish") String fishs,
			@ModelAttribute(name = "option") String option, @ModelAttribute(name = "portObj") String port, @ModelAttribute(name="image") String stringImage) {
		ss.updateShipping(files, shipping, fishs, option, port, stringImage);
		return null;
	}
	
	@PostMapping
	public ResponseEntity<?> insertShipping(@RequestParam(name="files", required = false) MultipartFile[] files,
			@ModelAttribute UpdateFormDTO shipping, @ModelAttribute(name = "fish") String fishs,
			@ModelAttribute(name = "option") String option, @ModelAttribute(name = "portObj") String port) {
		ss.insertShipping(files, shipping, fishs, option, port);
		return null;
	}

}
