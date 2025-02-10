package com.kh.javaray.funding.model.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.kh.javaray.funding.model.dto.FundingBusinessNoAPIDTO;

@Mapper
public interface FundingMapper {

	void save(FundingBusinessNoAPIDTO businessNoAPIData);

}
