package com.kh.javaray.funding.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.kh.javaray.funding.model.mapper.FundingMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class FundingServiceImpl implements FundingService {
	
	private final FundingMapper fundingMapper;

	@Override
	public String save(String companyBusinessNo) {

		String requestUrl = "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=wEwhMTWtjVI9KGVEmOKO%2FwKk49JtMGEmWn0UNTqvM1d5sLt7f%2BowhHh0ZyE8Z95%2BvTVVRH52zHZI3YTo%2Fn0l%2BQ%3D%3D";
	    
		Map<String, Object> requestBody = new HashMap();
		requestBody.put("b_no", new String[] {companyBusinessNo});
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
		RestTemplate restTemplate = new RestTemplate();
		
		String response = restTemplate.postForObject(requestUrl, requestEntity, String.class);
		log.info("{}", response);
		
		return null;
		/*
		URI uri = null;
		
		try {
			uri = new URI(requestUrl);
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
		
		RestTemplate restTemplate = new RestTemplate();
		String response = restTemplate.getForObject(uri, String.class);
		return response;
		*/
	}

}
