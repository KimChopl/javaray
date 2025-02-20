package com.kh.javaray.template.model.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;

import com.kh.javaray.shipping.dto.Image;

@Mapper
public interface ImageMapper {

	@Delete("UPDATE TB_SHIPPING_IMAGE SET STATUS = 'N' WHERE REF_BOARD_NO = #{boardNo}")
	int deleteImage(Image image);

	int insertImage(Image image);

}
