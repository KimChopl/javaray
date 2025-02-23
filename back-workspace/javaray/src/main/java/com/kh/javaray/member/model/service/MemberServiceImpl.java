package com.kh.javaray.member.model.service;

import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kh.javaray.auth.service.AuthenticationService;
import com.kh.javaray.exception.exceptions.AlreadyUseingUsernameException;
import com.kh.javaray.exception.exceptions.FailUpdateUserInfoException;
import com.kh.javaray.exception.exceptions.NotMatchUserInfoException;
import com.kh.javaray.member.model.dto.ChangePassword;
import com.kh.javaray.member.model.dto.CustomUserDetails;
import com.kh.javaray.member.model.dto.LoginForm;
import com.kh.javaray.member.model.dto.LoginResponse;
import com.kh.javaray.member.model.dto.Member;
import com.kh.javaray.member.model.dto.MemberDTO;
import com.kh.javaray.member.model.dto.UpdateMemberDTO;
import com.kh.javaray.member.model.mapper.MemberMapper;

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
		MemberDTO isMember = mm.findById(member.getUsername()); // DTO
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
		MemberDTO member = mm.findById(requestMember.getUsername()); //DTO
		LoginResponse user = LoginResponse.builder().username(member.getUsername()).role(cutRole(member.getRole()))
				.tokens(token).nickname(member.getNickname()).userNo(member.getUserNo()).build();
		return user;
	}

	private String cutRole(String role) {
		return role.substring(role.indexOf('_') + 1);
	}

	@Override
	public void updateAll(UpdateMemberDTO member) {
		CustomUserDetails user = as.checkedUser();
		if (!user.getUsername().equals(member.getUsername())) {
			throw new NotMatchUserInfoException("현제 페이지에서는 아이디를 변경할 수 없습니다. 고객센터를 통해 아이디를 변경해주세요.");
		}
		member.setUserNo(user.getUserNo());
		mm.updateAll(member);
	}

	private CustomUserDetails checkedUserInfo(ChangePassword password) {
		CustomUserDetails user = as.checkedUser();
		if (!user.getUsername().equals(password.getUsername())) {
			throw new NotMatchUserInfoException("유저 정보가 일치하지 않습니다. 다시 시도해주세요.");
		}
		if (!pwe.matches(password.getOriginUserPwd(), user.getPassword())) {
			throw new NotMatchUserInfoException("비밀번호가 일치하지 않습니다. 다시 시도해주세요.");
		}
		return user;
	}

	@Override
	public void updatePassword(ChangePassword password) {
		CustomUserDetails user = checkedUserInfo(password);
		password.setUserNo(user.getUserNo());
		password.setChangeUserPwd(pwe.encode(password.getChangeUserPwd()));
		int result = mm.updatePassword(password);
		if (result < 1) {
			throw new FailUpdateUserInfoException("업데이트에 싪패했습니다. 다시 시도해주세요.");
		}
	}

	@Override
	public void deleteMember(LoginForm userPwd) {
		CustomUserDetails user = as.checkedUser();
		if (!pwe.matches(userPwd.getUserPwd(), user.getPassword())) {
			throw new NotMatchUserInfoException("비밀번호가 일치하지 않습니다. 다시 시도해주세요.");
		}
		mm.deleteMember(user.getUserNo());
	}

	@Override
	public Member selectUserRole() {
		CustomUserDetails user = as.checkedUser();
		return mm.selectUserRole(user.getUserNo());
	}

}
