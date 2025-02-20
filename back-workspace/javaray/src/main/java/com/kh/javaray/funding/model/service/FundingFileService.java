package com.kh.javaray.funding.model.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FundingFileService {

	private final Path fileLocation;
	
	public FundingFileService() {
		this.fileLocation = Paths.get("uploads").toAbsolutePath().normalize();
	}
	
	public String store(MultipartFile file) {
		
		
		String fileName = Paths.get(file.getOriginalFilename()).getFileName().toString();
		
		Path targetLocation = this.fileLocation.resolve(fileName);
		
		try {
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
			
			return "http://localhost/uploads/" + fileName;
		} catch (IOException e) {
			throw new RuntimeException("파일을 찾을 수 없습니다.");
		}
		
	}
}