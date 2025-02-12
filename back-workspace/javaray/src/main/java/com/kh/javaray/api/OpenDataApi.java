package com.kh.javaray.api;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.kh.javaray.exception.exceptions.NotMatchUserInfoException;
import com.kh.javaray.shipping.dto.MiddleWeather;
import com.kh.javaray.shipping.dto.Weather;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class OpenDataApi {
	
	private String today() {
		Date today = new Date();
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
		String day = format.format(today);
		return day;
	}
	
	public List<Weather> weatherApi(String spotCode) {
		StringBuilder requestUrl = new StringBuilder("https://apihub.kma.go.kr/api/typ01/url/fct_afs_do.php");
		String key = "t3nuxM67Qvq57sTOu5L69w";
		try {
			requestUrl.append("?authKey=" + URLEncoder.encode(key , "UTF-8"));
			requestUrl.append("&reg=" + URLEncoder.encode(spotCode, "UTF-8"));
			requestUrl.append("&tmfc1=" + URLEncoder.encode((today() + "00"), "UTF-8"));
			requestUrl.append("&tmfc2=" + URLEncoder.encode((today() + "18"), "UTF-8"));
			requestUrl.append("&disp=1");
			requestUrl.append("&help=0");
			URI uri = new URI(requestUrl.toString());
			RestTemplate rt = new RestTemplate();
			String result = rt.getForObject(uri, String.class);
			log.info(result);
			List<Weather> list = new ArrayList<Weather>();
			String[] split = result.split(",=\n");	
			for(int i = 1; i < 9; i ++) {
				String[] infos = split[i].split(",");
				Weather weather = Weather.builder().regName(infos[0]).tmef(infos[2]).s1(infos[12]).s2(infos[13]).wh1(infos[14]).wh2(infos[15]).prep(infos[17]).wf(infos[18]).sky(infos[16]).build();
				list.add(weather);
			}
			return list;
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			throw new NotMatchUserInfoException("네트워크 오류.");
		} catch (URISyntaxException e) {
			e.printStackTrace();
			throw new NotMatchUserInfoException("네트워크 오류.");
		}
		
	}
	
}
