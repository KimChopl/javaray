package com.kh.javaray.fishing.review.model.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;



@Service
public class ReviewFileService {
	
	private final Path fileLocation;
	
	public ReviewFileService() {
		this.fileLocation = Paths.get("uploads/fishing/review").toAbsolutePath().normalize();
	}
	
	public String store(MultipartFile file) {
		String fileName = Paths.get(file.getOriginalFilename()).getFileName().toString();
		
		Path targetLocation = this.fileLocation.resolve(fileName);
		
		try {
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
			return "http://uploads/uploads/fishing/review/" + fileName;
		} catch (IOException e) {
			throw new RuntimeException("파일이 존재하지 않습니다.");
		}
		
	}


}
