package com.kh.javaray.auth.service;

import java.util.Map;

import com.kh.javaray.member.model.dto.CustomUserDetails;
import com.kh.javaray.member.model.dto.LoginForm;
import com.kh.javaray.member.model.dto.MemberDTO;

public interface AuthenticationService {
	Map<String, String> login(LoginForm requestMember);
	
	CustomUserDetails checkedUser();
	
	void validWriter(String writer, String username);
	
	void checkedMember(CustomUserDetails user);
	
}
