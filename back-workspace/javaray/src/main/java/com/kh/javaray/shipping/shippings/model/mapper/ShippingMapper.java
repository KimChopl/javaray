package com.kh.javaray.shipping.shippings.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.session.RowBounds;

import com.kh.javaray.shipping.shippings.model.dto.Attention;
import com.kh.javaray.shipping.shippings.model.dto.Fishs;
import com.kh.javaray.shipping.shippings.model.dto.Port;
import com.kh.javaray.shipping.shippings.model.dto.SearchPort;
import com.kh.javaray.shipping.shippings.model.dto.Shipping;

@Mapper
public interface ShippingMapper {

	List<Shipping> selectShipping(RowBounds rb);

	Shipping selectShippingDetail(String shippingNo);

	Fishs selectFish(String fishNo);
	
	int insertAttention(Attention attention);
	
	@Delete("DELETE FROM TB_SHIPPING_ATTENTION WHERE SHIPPING_NO = #{shippingNo} AND USER_NO = #{userNo}")
	int deleteAttention(Attention attention);

	@Select("SELECT COUNT(USER_NO) FROM TB_SHIPPING_ATTENTION WHERE SHIPPING_NO = #{shippingNo} AND USER_NO = #{userNo}")
	int selectAttention(Attention att);
	
	@Select("SELECT FISH_NO fishNo, FISH_NAME fishName FROM TB_FISH")
	List<Fishs> selectFishs();

	List<Port> selectSearchPort(SearchPort search);

}
