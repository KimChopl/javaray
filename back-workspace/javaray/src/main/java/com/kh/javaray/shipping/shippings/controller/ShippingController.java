package com.kh.javaray.shipping.shippings.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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
import com.kh.javaray.shipping.shippings.model.dto.ShippingFormDTO;
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

	private final ShippingService shippingService;
	private final AttentionService attentionService;
	private final FishService fishService;

	@GetMapping
	public ResponseEntity<List<Shipping>> selectShippings(@RequestParam(name = "page", defaultValue = "0") int page) {

		List<Shipping> shipping = shippingService.selectShipping(page);

		return ResponseEntity.ok().body(shipping);
	}

	@GetMapping("detail")
	public ResponseEntity<Map<String, Object>> selectShippingDetail(
			@RequestParam(name = "shippingNo") String shippingNo) {
		Map<String, Object> response = shippingService.selectShippingDetail(shippingNo);
		return ResponseEntity.ok().body(response);
	}

	@GetMapping("fish")
	public ResponseEntity<Fishs> selectFish(@RequestParam(name = "fishNo") String fishNo) {
		Fishs fish = fishService.selectFish(fishNo);
		return ResponseEntity.ok().body(fish);
	}

	@PostMapping("attention")
	public ResponseEntity<String> insertAttention(@RequestParam(name = "shippingNo") String shippingNo) {
		attentionService.insertAttention(shippingNo);
		return ResponseEntity.status(HttpStatusCode.valueOf(201)).body("등록 완료");
	}

	@DeleteMapping("attention")
	public ResponseEntity<String> deleteAttention(@RequestParam(name = "shippingNo") String shippingNo) {
		attentionService.deleteAttention(shippingNo);
		return ResponseEntity.status(HttpStatusCode.valueOf(201)).body("삭제 완료");
	}

	@GetMapping("attention")
	public ResponseEntity<?> selectAttention(@RequestParam(name = "shippingNo") String shippingNo) {
		int att = attentionService.selectAttention(shippingNo);
		return ResponseEntity.ok().body(att);
	}

	@GetMapping("update")
	public ResponseEntity<Shipping> selectUpdateForm(@RequestParam(name = "shippingNo") String shippingNo) {
		Shipping shipping = shippingService.selectUpdateForm(shippingNo);
		return ResponseEntity.ok().body(shipping);
	}

	@GetMapping("fishs")
	public ResponseEntity<List<Fishs>> selectFishs() {
		List<Fishs> list = fishService.selectFish();
		return ResponseEntity.ok().body(list);
	}

	@GetMapping("search/port")
	public ResponseEntity<List<Port>> selectSearchPort(@RequestParam(name = "option", defaultValue = "1") String option,
			@RequestParam(name = "searchContent", defaultValue = "") String searchContent) {
		List<Port> list = shippingService.selectSearchPort(option, searchContent);
		return ResponseEntity.ok().body(list);
	}

	@PutMapping
	public ResponseEntity<ShippingFormDTO> updateShipping(
			@RequestParam(name = "files", required = false) MultipartFile[] files,
			@RequestParam(name = "shipping") String shipping) {
		ShippingFormDTO updateShipping = shippingService.updateShipping(files, shipping);
		return ResponseEntity.status(HttpStatus.CREATED).body(updateShipping);
	}

	@PostMapping
	public ResponseEntity<ShippingFormDTO> insertShipping(@RequestParam(name = "files", required = false) MultipartFile[] files,
			@RequestParam(name = "shipping") String shipping) {
		ShippingFormDTO insertShipping = shippingService.insertShipping(files, shipping);
		return ResponseEntity.status(HttpStatusCode.valueOf(201)).body(insertShipping);
	}

}
