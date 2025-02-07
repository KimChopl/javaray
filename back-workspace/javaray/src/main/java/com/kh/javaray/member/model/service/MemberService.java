package com.kh.javaray.member.model.service;

import com.kh.javaray.member.model.dto.LoginForm;
import com.kh.javaray.member.model.dto.LoginResponse;
import com.kh.javaray.member.model.dto.MemberDTO;

import jakarta.validation.Valid;


public interface MemberService {

	void insertMember(MemberDTO member);

	LoginResponse login(LoginForm requestMember);

}
