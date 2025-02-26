package com.kh.javaray.member.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

import com.kh.javaray.member.model.dto.ChangePassword;
import com.kh.javaray.member.model.dto.Member;
import com.kh.javaray.member.model.dto.MemberDTO;
import com.kh.javaray.member.model.dto.UpdateMemberDTO;

import jakarta.validation.Valid;

@Mapper
public interface MemberMapper {

	MemberDTO findById(String username);

	void insertMember(Member member);

	void updateAll(UpdateMemberDTO member);

	@Update("UPDATE TB_MEMBER SET USER_PWD = #{changeUserPwd}, MODIFY_AT = SYSDATE WHERE USER_NO = #{userNo}")
	int updatePassword(ChangePassword password);

	@Update("UPDATE TB_MEMBER SET STATUS = 'N', MODIFY_AT = SYSDATE WHERE USER_NO = #{userNo}")
	void deleteMember(Long userNo);

	MemberDTO selectUserRole(Long userNo);


}
