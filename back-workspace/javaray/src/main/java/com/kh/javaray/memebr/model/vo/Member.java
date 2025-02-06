package com.kh.javaray.memebr.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {

	private Long userNo;
	private String userName;
	private String userId;
	private String user_Pwd;
	private String nickName;
	private String email;
	private String role;
	private String createAt;
	private String status;
	
}
