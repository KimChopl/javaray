package com.kh.javaray.auth.util;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.kh.javaray.auth.service.UserServiceImpl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;    
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain; 
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtFilter extends OncePerRequestFilter{
	
	private final JwtUtil jwtUtil;
	private final UserServiceImpl us;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		
		String header = request.getRequestURI();
		String method = request.getMethod();
		if((header.equals("/members") || header.equals("/members/login")) && method.equals("POST")) {
			filterChain.doFilter(request, response);
			return;
		}
		
		String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
		
		if(authorization == null || !authorization.startsWith("Bearer ")) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			response.getWriter().write("접근 권환이 없음.");
			filterChain.doFilter(request, response);
			return;
		}
		String token = authorization.split(" ")[1];
		try {
			
			Claims claims =  jwtUtil.parseJwt(token);
			
			String username = claims.getSubject();
			
			
			UserDetails userDetails = us.loadUserByUsername(username); 
			
			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
			
			authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request)); 
			
			SecurityContextHolder.getContext().setAuthentication(authentication);
			
		} catch(ExpiredJwtException e) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); 
			response.getWriter().write("Expired Token");
			return;
		} catch(JwtException e) {
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); 
			response.getWriter().write("Expired Token");
			return;
		}
		
		filterChain.doFilter(request, response);
	}

}
