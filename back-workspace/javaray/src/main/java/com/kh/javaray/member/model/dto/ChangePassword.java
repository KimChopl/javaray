package com.kh.javaray.member.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChangePassword {
	
	private Long userNo;
	private String username;
	private String originUserPwd;
	private String changeUserPwd;

}
