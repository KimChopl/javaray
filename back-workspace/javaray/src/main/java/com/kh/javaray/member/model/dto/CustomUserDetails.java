package com.kh.javaray.member.model.dto;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@Builder
@ToString
public class CustomUserDetails implements UserDetails {

	private Long userNo;
	private String userRealName;
	private String nickname;
	private String email;
	private String phone;
	private String create_at;
	private String username; // ID
	private String password;
	private Collection<? extends GrantedAuthority> authorities;

}
