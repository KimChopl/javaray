package com.kh.javaray.auth.service;


import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kh.javaray.exception.exceptions.NotFoundUserInfoException;
import com.kh.javaray.member.model.dto.CustomUserDetails;
import com.kh.javaray.member.model.dto.Member;
import com.kh.javaray.member.model.dto.MemberDTO;
import com.kh.javaray.member.model.mapper.MemberMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserDetailsService {

	private final MemberMapper mm;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		MemberDTO member = mm.findById(username);
		if(member == null) {
			throw new NotFoundUserInfoException("아이디 또는 비밀번호가 일치하지 않습니다.");
		}
		return CustomUserDetails.builder().userNo(member.getUserNo()).username(member.getUsername()).password(member.getUserPwd()).
				userRealName(member.getUserRealName()).nickname(member.getNickname()).
				authorities(Collections.singletonList(new SimpleGrantedAuthority(member.getRole()))).build();
	}

}
