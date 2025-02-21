package com.kh.javaray.manager.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.javaray.manager.model.dto.DeleteFormDTO;
import com.kh.javaray.manager.model.dto.ManagingDTO;
import com.kh.javaray.manager.model.service.ManagerService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(value = "manager")
@RequiredArgsConstructor
@Slf4j
public class ManagerController {
	
	private final ManagerService ms;
	
	@PutMapping("changeRole")
	public ResponseEntity<?> changeRole(@Valid @RequestBody ManagingDTO member){
		log.info("{}", member);
		ms.changeRole(member);
		return ResponseEntity.ok("권한 변경 완료");
	}
	
	@DeleteMapping("shippings") //구분자는 URI에 포함
	public ResponseEntity<?> deleteShipping(@RequestBody DeleteFormDTO deleteReason){
		ms.deleteShipping(deleteReason);
		return ResponseEntity.ok().body("삭제 완료");
	}

}
