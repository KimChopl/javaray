package com.kh.javaray.shipping.shippings.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.session.RowBounds;

import com.kh.javaray.shipping.shippings.model.dto.Attention;
import com.kh.javaray.shipping.shippings.model.dto.Fishs;
import com.kh.javaray.shipping.shippings.model.dto.Port;
import com.kh.javaray.shipping.shippings.model.dto.SearchPort;
import com.kh.javaray.shipping.shippings.model.dto.Shipping;
import com.kh.javaray.shipping.shippings.model.dto.ShippingOption;
import com.kh.javaray.shipping.shippings.model.dto.UpdateFormDTO;

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
	
	String findByShippingNo(String shippingNo);

	void updateShipping(UpdateFormDTO shipping);
	
	@Insert("INSERT INTO TB_ENABLE_FISH VALUES(#{shippingNo}, #{fishNo})")
	void updateFish(Fishs fish);

	@Insert("INSERT INTO TB_SHIPPING_SERVICE VALUES(#{shippingNo}, #{serviceNo})")
	int updateOption(ShippingOption option);
	
	@Delete("DELETE FROM TB_SHIPPING_SERVICE WHERE SHIPPING_NO = #{shippingNo}")
	void deleteOption(String shippingNo);

	@Select("SELECT SHIPPING_NO shippingNo, SHIPPING_SERVICE serviceNo FROM TB_SHIPPING_SERVICE WHERE SHIPPING_NO = #{shippingNo}")
	List<ShippingOption> selectOption(String shippingNo);

	@Select("SELECT SHIPPING_NO shippingNo, FISH_NO fishNo FROM TB_ENABLE_FISH WHERE SHIPPING_NO = #{shippingNo}")
	List<Fishs> selectFishsByShippingNo(String shippingNo);
	
	@Delete("DELETE FROM TB_ENABLE_FISH WHERE SHIPPING_NO = #{shippingNo}")
	void deleteFish(String shippingNo);

	void insertShipping(UpdateFormDTO shipping);

	@Update("UPDATE TB_SHIPPING SET STATUS = 'N' WHERE SHIPPING_NO = #{shippingNo}")
	int deleteShipping(String shippingNo);

}
