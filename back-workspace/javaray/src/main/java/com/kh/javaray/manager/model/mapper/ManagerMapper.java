package com.kh.javaray.manager.model.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

import com.kh.javaray.manager.model.dto.DeleteFormDTO;
import com.kh.javaray.manager.model.dto.ManagingDTO;

@Mapper
public interface ManagerMapper {

	@Update("UPDATE TB_MEMBER SET ROLE = #{changeRole} WHERE USER_ID = #{username}")
	int changeRole(ManagingDTO member);

	@Insert("INSERT INTO TB_SHIPPING_DELETE VALUES (#{shippingNo}, #{deleteReason}, SYSDATE)")
	int deleteShipping(DeleteFormDTO deleteReason);
	

}
