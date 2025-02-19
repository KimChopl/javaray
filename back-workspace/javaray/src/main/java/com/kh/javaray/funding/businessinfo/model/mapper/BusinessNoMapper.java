package com.kh.javaray.funding.businessinfo.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.kh.javaray.funding.businessinfo.model.dto.BusinessNoAPIDTO;
import com.kh.javaray.funding.businessinfo.model.dto.BusinessNoDTO;

@Mapper
public interface BusinessNoMapper {

	void save(BusinessNoAPIDTO businessNoAPIData);

	BusinessNoAPIDTO selectBusinessNo(String userNo);

	void insertBoard(BusinessNoDTO businessNoData);
}
