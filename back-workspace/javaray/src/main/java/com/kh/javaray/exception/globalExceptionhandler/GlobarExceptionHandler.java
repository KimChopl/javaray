package com.kh.javaray.exception.globalExceptionhandler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.kh.javaray.exception.exceptions.AlreadyUseingUsernameException;
import com.kh.javaray.exception.exceptions.NotFoundUserInfoException;
import com.kh.javaray.exception.exceptions.NotMatchUserInfoException;

@RestControllerAdvice
public class GlobarExceptionHandler {
	
	@ExceptionHandler(NotFoundUserInfoException.class)
	public ResponseEntity<?> handleNotfoundUser(NotFoundUserInfoException e){
		return ResponseEntity.badRequest().body(e.getMessage());
	}
	
	@ExceptionHandler(AlreadyUseingUsernameException.class)
	public ResponseEntity<?> hendleAlreadyUser(AlreadyUseingUsernameException e){
		return ResponseEntity.badRequest().body(e.getMessage());
	}
	
	@ExceptionHandler(NotMatchUserInfoException.class)
	public ResponseEntity<?> handleMismatchUser(NotMatchUserInfoException e){
		return ResponseEntity.badRequest().body(e.getMessage());
	}
	
}
