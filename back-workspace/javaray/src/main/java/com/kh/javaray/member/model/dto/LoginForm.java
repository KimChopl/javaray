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
	
	@NotBlank
	@Size(min = 6, max = 25, message = "6 ~ 25자 사이만 가능합니다.")
	private String username;
	
	@NotBlank
	@Size(min = 6, max = 30, message = "너무 짧거나 긴 비밀번호 입니다.")
	private String userPwd;

}
