package com.kh.javaray.token.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.kh.javaray.auth.util.JwtUtil;
import com.kh.javaray.member.model.dto.CustomUserDetails;
import com.kh.javaray.token.model.dto.RefreshTokenDTO;
import com.kh.javaray.token.model.mapper.TokenMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {
	
	private final JwtUtil jwt;
	private final TokenMapper tm;

	@Override
	public Map<String, String> generateToken(String username, Long userNo) {
		Map<String, String> map = createToken(username);
		deleteExpiredRefreshToken(userNo);
		saveToken(map.get("refreshToken"), userNo);
		return map;
	}

	private void deleteExpiredRefreshToken(Long userNo) {
		
		tm.deleteExpiredRefreshToken(userNo);
		
	}

	private Map<String, String> createToken(String username) {
		String accessToken = jwt.getAccessToken(username);
		String refreshToken = jwt.getRefrshToken(username);
		Map<String, String> map = new HashMap<String, String>();
		map.put("accessToken", accessToken);
		map.put("refreshToken", refreshToken);
		return map;
	}

	private void saveToken(String rfreshToken, Long userNo) {
		RefreshTokenDTO refreshToken = RefreshTokenDTO.builder().userNo(userNo).refreshToken(rfreshToken)
				.expiredAt((Long)(System.currentTimeMillis() + 3600000L * 72)).build();
		tm.saveToken(refreshToken);
	}

	@Override
	public Map<String, String> refreshTokens(String refreshToken) {
		System.out.println(refreshToken);
		RefreshTokenDTO token = tm.findByToken(refreshToken);
		
		if(token == null || token.getExpiredAt() < System.currentTimeMillis()) {
			throw new RuntimeException("토큰 오류");
		}
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails user = (CustomUserDetails)auth.getPrincipal();
		
		return generateToken(user.getUsername(), user.getUserNo());
	}

}
