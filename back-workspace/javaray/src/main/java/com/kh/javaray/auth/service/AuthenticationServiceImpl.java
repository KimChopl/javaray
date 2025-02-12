package com.kh.javaray.auth.service;

import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.kh.javaray.member.model.dto.CustomUserDetails;
import com.kh.javaray.member.model.dto.LoginForm;
import com.kh.javaray.member.model.dto.MemberDTO;
import com.kh.javaray.token.model.service.TokenService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService{
	
	private final AuthenticationManager am;
	private final TokenService ts;

	@Override
	public Map<String, String> login(LoginForm requestMember) {
		Authentication auth = am.authenticate(new UsernamePasswordAuthenticationToken(requestMember.getUsername(), requestMember.getUserPwd()));
		
		CustomUserDetails user = (CustomUserDetails)auth.getPrincipal();
		Map<String, String> token = ts.generateToken(user.getUsername(), user.getUserNo());
		return token;
	}

	@Override
	public CustomUserDetails checkedUser() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		log.info("{}", auth);
		return (CustomUserDetails) auth.getPrincipal();
	}

	@Override
	public void validWriter(String writer, String username) {
		if (writer != null && !writer.equals(username)) {
			throw new RuntimeException("요청 사용자와 게시글 작성자 불일치");
		}		
	}

	@Override
	public void checkedMember(CustomUserDetails user) {
		// TODO Auto-generated method stub
		
	}
	
	

}
