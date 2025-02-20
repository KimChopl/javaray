package com.kh.javaray.member.model.service;

import com.kh.javaray.member.model.dto.ChangePassword;
import com.kh.javaray.member.model.dto.LoginForm;
import com.kh.javaray.member.model.dto.LoginResponse;
import com.kh.javaray.member.model.dto.Member;
import com.kh.javaray.member.model.dto.MemberDTO;
import com.kh.javaray.member.model.dto.UpdateMemberDTO;

import jakarta.validation.Valid;


public interface MemberService {

	void insertMember(MemberDTO member);

	LoginResponse login(LoginForm requestMember);

	void updateAll(UpdateMemberDTO member);

	void updatePassword(ChangePassword password);

	void deleteMember(LoginForm userPwd);

	Member selectUserRole();

}
