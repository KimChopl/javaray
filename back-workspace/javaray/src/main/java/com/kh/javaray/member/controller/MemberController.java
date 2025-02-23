package com.kh.javaray.member.controller;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.javaray.member.model.dto.ChangePassword;
import com.kh.javaray.member.model.dto.LoginForm;
import com.kh.javaray.member.model.dto.LoginResponse;
import com.kh.javaray.member.model.dto.Member;
import com.kh.javaray.member.model.dto.MemberDTO;
import com.kh.javaray.member.model.dto.UpdateMemberDTO;
import com.kh.javaray.member.model.service.MemberService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping(value = "members")
@RequiredArgsConstructor
@Slf4j
public class MemberController {
	
	private final MemberService ms;
	
	@PostMapping
	public ResponseEntity<?> insertMember(@Valid @RequestBody MemberDTO member) {
		ms.insertMember(member);
		return ResponseEntity.ok("회원가입에 완료하였습니다.");
	}
	
	@PostMapping("login")
	public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginForm requestMember){
		LoginResponse response = ms.login(requestMember);
		return ResponseEntity.ok(response);
	}
	
	@PutMapping("update/all")
	public ResponseEntity<?> update (@Valid @RequestBody UpdateMemberDTO member){
		ms.updateAll(member);
		return ResponseEntity.status(HttpStatusCode.valueOf(201)).body("수정에 성공했습니다.");
	}
	
	@PutMapping("update/password")
	public ResponseEntity<?> updatePassword (@Valid @RequestBody ChangePassword password){
		ms.updatePassword(password);
		return ResponseEntity.status(HttpStatusCode.valueOf(201)).body("비밀번호 변경에 성공했습니다. 다시 로그인 하세요.");
	}
	
	@DeleteMapping
	public ResponseEntity<?> deleteMember (@RequestBody LoginForm userPwd) {
		ms.deleteMember(userPwd);
		return ResponseEntity.status(HttpStatusCode.valueOf(201)).body("회원 탈퇴에 완료하였습니다.");
	}
	
	@GetMapping("users")
	public ResponseEntity<Member> selectUserRole(){
		Member member = ms.selectUserRole();
		return ResponseEntity.ok().body(member);
	}

}
