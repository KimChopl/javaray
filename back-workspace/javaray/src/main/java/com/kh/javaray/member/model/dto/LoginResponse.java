package com.kh.javaray.member.model.dto;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Builder
@Getter
@ToString
public class LoginResponse {
	private Long userNo;
	private String username;
	private String role;
	private String nickname;
	private Map<String, String> tokens;
}
