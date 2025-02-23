package com.kh.javaray.member.model.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
@Builder
public class Member {

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
