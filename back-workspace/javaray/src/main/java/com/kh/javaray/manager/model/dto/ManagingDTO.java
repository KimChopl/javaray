package com.kh.javaray.manager.model.dto;

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
@Builder
@ToString
public class ManagingDTO {
	
	private String userRealName;
	private String username;
	private String userPwd;
	private String nickname;
	private String email;
	private String phone;
	private String changeRole;

}
