package com.kh.javaray.manager.model.service;

import org.springframework.stereotype.Service;

import com.kh.javaray.exception.exceptions.NotFoundUserInfoException;
import com.kh.javaray.exception.exceptions.NotMatchUserInfoException;
import com.kh.javaray.manager.model.dto.ManagingDTO;
import com.kh.javaray.manager.model.mapper.ManagerMapper;
import com.kh.javaray.member.model.dto.Member;
import com.kh.javaray.member.model.mapper.MemberMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ManagerServiceImpl implements ManagerService {

	private final MemberMapper mm;
	private final ManagerMapper mgm;

	@Override
	public int changeRole(ManagingDTO member) {

		Member checkedMember = mm.findById(member.getUsername());
		chekedMember(member, checkedMember);
		member.setChangeRole("ROLE_" + member.getChangeRole());
		return mgm.changeRole(member);

	}

	private void chekedMember(ManagingDTO member, Member checkedMember) {
		if (checkedMember == null) {
			throw new NotFoundUserInfoException("조회된 이용자가 없음.");
		}
		if (!member.getNickname().equals(checkedMember.getNickname())
				|| !member.getUserRealName().equals(checkedMember.getUserRealName())
				|| !member.getEmail().equals(checkedMember.getEmail())
				|| !member.getPhone().equals(checkedMember.getPhone())) {
			throw new NotMatchUserInfoException("유저 정보가 일치하지 않습니다.");
		}
	}

}
