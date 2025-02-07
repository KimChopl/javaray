package com.kh.javaray.token.model.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.kh.javaray.token.model.dto.RefreshTokenDTO;

@Mapper
public interface TokenMapper {

	@Delete("DELETE FROM TB_TOKEN WHERE USER_NO = #{userNo}")
	void deleteExpiredRefreshToken(Long userNo);
	
	@Insert("INSERT INTO TB_TOKEN VALUES (#{userNo}, #{refreshToken}, #{expiredAt})")
	void saveToken(RefreshTokenDTO refreshToken);

	@Select("SELECT REFRESH_TOKEN refreshToken, EXPIRED_AT expiredAt FROM TB_REFRESH_TOKEN WHERE REFRESH_TOKEN=#{refreshToken}")
	RefreshTokenDTO findByToken(String refreshToken);


}
