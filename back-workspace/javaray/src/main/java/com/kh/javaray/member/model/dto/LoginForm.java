package com.kh.javaray.member.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class LoginForm {
	
	@NotBlank(message ="아이디 또는 비밀번호를 입력하세요.")
	@Size(min = 6, max = 30, message = "너무 짧거나 깁니다.")
	private String username;
	
	@NotBlank(message ="아이디 또는 비밀번호를 입력하세요.")
	@Size(min = 6, max = 30, message = "너무 짧거나 깁니다.")
	private String userPwd;

}
