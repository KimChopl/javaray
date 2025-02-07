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
		Member member = mm.findById(username);
		if(member == null) {
			throw new NotFoundUserInfoException("존재하지 않는 사용자 입니다.");
		}
		return CustomUserDetails.builder().userNo(member.getUserNo()).username(member.getUsername()).password(member.getUserPwd()).
				userRealName(member.getUserRealName()).nickname(member.getNickname()).
				authorities(Collections.singletonList(new SimpleGrantedAuthority(member.getRole()))).build();
	}

}
