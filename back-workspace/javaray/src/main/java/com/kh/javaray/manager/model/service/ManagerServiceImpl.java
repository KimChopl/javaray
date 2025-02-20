package com.kh.javaray.manager.model.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kh.javaray.exception.exceptions.FailDeleteObjectException;
import com.kh.javaray.exception.exceptions.NotFoundInfoException;
import com.kh.javaray.exception.exceptions.NotFoundUserInfoException;
import com.kh.javaray.exception.exceptions.NotMatchUserInfoException;
import com.kh.javaray.manager.model.dto.DeleteFormDTO;
import com.kh.javaray.manager.model.dto.ManagingDTO;
import com.kh.javaray.manager.model.mapper.ManagerMapper;
import com.kh.javaray.member.model.dto.Member;
import com.kh.javaray.member.model.mapper.MemberMapper;
import com.kh.javaray.shipping.shippings.model.dto.Shipping;
import com.kh.javaray.shipping.shippings.model.mapper.ShippingMapper;
import com.kh.javaray.template.xss.XssService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ManagerServiceImpl implements ManagerService {

	private final MemberMapper mm;
	private final ManagerMapper mgm;
	private final ShippingMapper sm;
	private final XssService xs;

	@Override
	public int changeRole(ManagingDTO member) {
		Member checkedMember = mm.findById(member.getUsername());
		chekedMember(member, checkedMember);
		member.setChangeRole("ROLE_" + member.getChangeRole());
		return mgm.changeRole(member);
	}

	private void chekedMember(ManagingDTO member, Member checkedMember) {
		if (checkedMember == null) {
			throw new NotFoundUserInfoException("조회된 이용자가 없음.");
		}
		if (!member.getNickname().equals(checkedMember.getNickname())
				|| !member.getUserRealName().equals(checkedMember.getUserRealName())
				|| !member.getEmail().equals(checkedMember.getEmail())
				|| !member.getPhone().equals(checkedMember.getPhone())) {
			throw new NotMatchUserInfoException("유저 정보가 일치하지 않습니다.");
		}
	}

	private void checkedShippingNo(String shippingNo) {
		Shipping shipping = sm.selectShippingDetail(shippingNo);
		if(shipping == null) {
			throw new NotFoundInfoException("관련 게시들이 없습니다.");
		}
	}
	
	private DeleteFormDTO settingXss(DeleteFormDTO deleteReason) {
		checkedShippingNo(deleteReason.getShippingNo());
		String xssString = xs.changeInsertForm(xs.makingXss(deleteReason.getDeleteReason()));
		deleteReason.setDeleteReason(xssString);
		return deleteReason;
	}
	
	@Override
	@Transactional
	public void deleteShipping(DeleteFormDTO deleteReason) {
		DeleteFormDTO settings = settingXss(deleteReason);
		checkedInsert(sm.deleteShipping(settings.getShippingNo()));
		checkedInsert(mgm.deleteShipping(settings));
		
	}
	private void checkedInsert(int a) {
		if(a == 0) {
			throw new FailDeleteObjectException("삭제에 실패하였습니다.");
		}
	}

}
