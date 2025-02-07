package com.kh.javaray.manager.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

import com.kh.javaray.manager.model.dto.ManagingDTO;

@Mapper
public interface ManagerMapper {

	@Update("UPDATE TB_MEMBER SET ROLE = #{changeRole} WHERE USER_ID = #{username}")
	void changeRole(ManagingDTO member);
	
	

}
