package com.kh.javaray.template.model.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;

import com.kh.javaray.shipping.dto.Image;

@Mapper
public interface ImageMapper {

	@Update("UPDATE TB_SHIPPING_IMAGE SET STATUS = 'N' WHERE IMAGE_NO = #{imageNo}")
	int deleteImage(Image image);

	int insertImage(Image image);

	@Update("UPDATE TB_SHIPPING_IMAGE SET IMAGE_LEVEL = 1 WHERE IMAGE_NO = #{imageNo}")
	void updateImageLevel(Long imageNo);
	

}
