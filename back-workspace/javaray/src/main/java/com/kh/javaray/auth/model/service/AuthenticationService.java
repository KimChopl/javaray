package com.kh.javaray.auth.model.service;

import java.util.Map;

import com.kh.javaray.auth.model.vo.CustomUserDetails;

public interface AuthenticationService {

	
	Map<String, String> login(MemberDTO requestMember);
	
	CustomUserDetails getAuthenticatedUser();
	

}
