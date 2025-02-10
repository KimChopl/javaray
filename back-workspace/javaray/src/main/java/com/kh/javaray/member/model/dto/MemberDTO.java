package com.kh.javaray.member.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class MemberDTO {

	private Long userNo;
	
	@NotBlank(message = "필수 입력 사항이 비어있습니다.")
	private String userRealName;
	
	@NotBlank(message = "필수 입력 사항이 비어있습니다.")
	@Size(min = 6, max = 25, message = "6 ~ 25자 사이만 가능합니다.")
	private String username;
	
	@NotBlank(message = "필수 입력 사항이 비어있습니다.")
	@Size(min = 6, max = 30, message = "너무 짧거나 긴 비밀번호 입니다.")
	private String userPwd;
	
	@NotBlank(message = "필수 입력 사항이 비어있습니다.")
	private String nickname;
	
	@NotBlank(message = "필수 입력 사항이 비어있습니다.")
	private String email;
	
	@NotBlank(message = "필수 입력 사항이 비어있습니다.")
	private String phone;
	
}
