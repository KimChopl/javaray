package com.kh.javaray.template.upload;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.kh.javaray.exception.exceptions.FailDeleteObjectException;
import com.kh.javaray.shipping.dto.Image;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class UploadImage {

private final Path fileLocation;
	
	public UploadImage() {
		this.fileLocation = Paths.get("uploads").toAbsolutePath().normalize(); // 빈등록 못함이렇게 하면
	}
	
	public List<Image> store(MultipartFile[] file, String path, boolean main) {
		int imageLevel = 0;
		List<Image> list = new ArrayList<Image>();
		for(int i = 0; i < file.length; i++) {
			if(main) {
				if(i == 0) {
					imageLevel = 1;
				} else {
					imageLevel = 2;
				}
			} else {
				imageLevel = 2;
			}
			String imagePath = "localhost/uploads/";
			String imageOriginName = file[i].getOriginalFilename();
			String currentTime = new SimpleDateFormat("yyMMddHHmm").format(new Date());
			double random = (Math.random() + 1) * 10000;
			String ex = imageOriginName.substring(imageOriginName.indexOf('.'));
			String imageChangeName = new StringBuilder(currentTime + (int)random + ex).toString();
			
			// 저장 위치 지정
			Path targetLocation = this.fileLocation.resolve(imageChangeName);
			
			// 저장(복사)
			try {
				Files.copy(file[i].getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
				Image image = Image.builder().imagePath(imagePath).imageChangeName(imageChangeName).imageOriginName(imageOriginName).imageLevel(imageLevel).build();
				list.add(image);
			} catch (IOException e) {
				//throw new RuntimeException("파일을 찾을 수 없음.");
			}
		}
		return list;
	}

	public void delete(List<Image> lists) {
		log.info("{}", lists);
		if(!lists.isEmpty() || lists != null) {
			for(Image image : lists) {
				try {
					Files.delete(Paths.get(image.getImageChangeName()));
				} catch (IOException e) {
					throw new FailDeleteObjectException("요청 처리 중 오류가 발생했습니다. 다시 시도해주세요");
				}
			}
		}
	}
	
	public void delete(Image image) {
		if(image != null || !"".equals(image.getImageChangeName()) || image.getImageChangeName() != null) {
			try {
				Files.delete(Paths.get(image.getImageChangeName()));
			} catch (IOException e) {
				throw new FailDeleteObjectException("요청 처리 중 오류가 발생했습니다. 다시 시도해주세요");
			}
		}
	}
	
}
