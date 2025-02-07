package com.kh.javaray.member.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

import com.kh.javaray.member.model.dto.Member;
import com.kh.javaray.member.model.dto.MemberDTO;

@Mapper
public interface MemberMapper {

	Member findById(String username);

	void insertMember(Member member);

}
