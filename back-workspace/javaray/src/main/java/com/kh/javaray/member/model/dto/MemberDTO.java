package com.kh.javaray.member.model.dto;

import java.sql.Date;

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
	private String userRealName;
	private String username;
	private String userPwd;
	private String nickname;
	private String email;
	private String phone;
	private String role;
	private Date createAt;
	
}
