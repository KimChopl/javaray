package com.kh.javaray.shipping.shippings.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.kh.javaray.shipping.shippings.model.dto.Shipping;

@Mapper
public interface ShippingMapper {

	List<Shipping> selectShipping(RowBounds rb);

}
