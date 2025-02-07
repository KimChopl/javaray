package com.kh.javaray.member.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class UpdateMemberDTO {
	
	private Long userNo;
	
	private String userRealName;
	
	@NotBlank
	@Size(min = 6, max = 25, message = "6 ~ 25자 사이만 가능합니다.")
	private String username;
	
	
	private String nickname;
	
	private String email;
	private String phone;
	private String role;
	private String createAt;

}
