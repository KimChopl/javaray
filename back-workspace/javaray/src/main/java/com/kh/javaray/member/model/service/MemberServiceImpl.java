package com.kh.javaray.member.model.service;

import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kh.javaray.auth.service.AuthenticationService;
import com.kh.javaray.exception.exceptions.AlreadyUseingUsernameException;
import com.kh.javaray.exception.exceptions.NotMatchUserInfoException;
import com.kh.javaray.member.model.dto.CustomUserDetails;
import com.kh.javaray.member.model.dto.LoginForm;
import com.kh.javaray.member.model.dto.LoginResponse;
import com.kh.javaray.member.model.dto.Member;
import com.kh.javaray.member.model.dto.MemberDTO;
import com.kh.javaray.member.model.mapper.MemberMapper;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

	private final MemberMapper mm;
	private final PasswordEncoder pwe;
	private final AuthenticationService as;

	@Override
	public void insertMember(MemberDTO member) {

		Member isMember = mm.findById(member.getUsername());

		if (isMember != null) {
			throw new AlreadyUseingUsernameException("이미 존재하는 사용자 입니다.");
		}

		Member newMember = Member.builder().username(member.getUsername()).userPwd(pwe.encode(member.getUserPwd()))
				.nickname(member.getNickname()).email(member.getEmail()).phone(member.getPhone())
				.userRealName(member.getUserRealName()).role("ROLE_USER").build();

		mm.insertMember(newMember);

	}


	@Override
	public LoginResponse login(LoginForm requestMember) {
		Map<String, String> token = as.login(requestMember);
		log.info("{}", token);
		Member member = mm.findById(requestMember.getUsername());
		LoginResponse user = LoginResponse.builder().username(member.getUsername()).role(member.getRole()).tokens(token).nickname(member.getNickname()).build();
		return user;
	}
	
	private Member findById(String username) {
		return null;
	}

	@Override
	public void updateAll(MemberDTO member) {
		CustomUserDetails user = as.checkedUser();
		log.info("{} /n{}", member, user);
	}

}
