package com.kh.javaray.exception.globalExceptionhandler;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.kh.javaray.exception.exceptions.AlreadyUseingUsernameException;
import com.kh.javaray.exception.exceptions.FailUpdateUserInfoException;
import com.kh.javaray.exception.exceptions.NotFoundUserInfoException;
import com.kh.javaray.exception.exceptions.NotMatchBoardInfoException;
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
	
	@ExceptionHandler(FailUpdateUserInfoException.class)
	public ResponseEntity<?> handleFailUpdate(FailUpdateUserInfoException e){
		return ResponseEntity.badRequest().body(e.getMessage());
	}
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleArgumentNotValid(MethodArgumentNotValidException e) {
		Map<String, String> errors = new HashMap<String, String>();
		e.getBindingResult().getFieldErrors().forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
		return ResponseEntity.badRequest().body(errors);
	}
	@ExceptionHandler(NotMatchBoardInfoException.class)
	public ResponseEntity<?> handleBoardNotMatch(NotMatchBoardInfoException e){
		return ResponseEntity.badRequest().body(e.getMessage());
	}
	
}
