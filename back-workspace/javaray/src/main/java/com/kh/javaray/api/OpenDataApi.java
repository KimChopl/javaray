package com.kh.javaray.api;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import com.kh.javaray.exception.exceptions.NotMatchUserInfoException;
import com.kh.javaray.shipping.dto.Weather;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class OpenDataApi {
	
	@Value("${api.key}")
	private String key;

	private Map<String, String> today() {
		Map<String, String> map = new HashMap<String, String>();
		Date today = new Date();
		SimpleDateFormat endDateForm = new SimpleDateFormat("yyyyMMdd");
		SimpleDateFormat hourForm = new SimpleDateFormat("HH");
		SimpleDateFormat dayForm = new SimpleDateFormat("dd");
		int day = Integer.parseInt(dayForm.format(today));
		int hour = Integer.parseInt(hourForm.format(today));
		Calendar calendar = Calendar.getInstance();
		if (hour >= 0 && hour <= 8) {
			calendar.setTime(today);
			calendar.set(Calendar.HOUR_OF_DAY, 15);
			calendar.set(Calendar.DAY_OF_MONTH, day - 1);
			today = calendar.getTime(); // 변경된 Date 객체 얻기
		} else {
			calendar.setTime(today);
			calendar.set(Calendar.HOUR_OF_DAY, 9);
			today = calendar.getTime();
		}
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHH");
		String endDate = endDateForm.format(today);
		String startDate = format.format(today);
		map.put("startDate", startDate);
		map.put("endDate", endDate);
		return map;
	}

	private StringBuilder makingURL(String spotCode) {
		Map<String, String> map = today();
		StringBuilder requestUrl = new StringBuilder("https://apihub.kma.go.kr/api/typ01/url/fct_afs_do.php");
		try {
			requestUrl.append("?authKey=" + URLEncoder.encode(key, "UTF-8"));
			requestUrl.append("&reg=" + URLEncoder.encode(spotCode, "UTF-8"));
			requestUrl.append("&tmfc1=" + URLEncoder.encode(map.get("startDate"), "UTF-8"));
			requestUrl.append("&tmfc2=" + URLEncoder.encode((map.get("endDate") + "18"), "UTF-8"));
			requestUrl.append("&disp=1");
			requestUrl.append("&help=0");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			throw new NotMatchUserInfoException("네트워크 오류.");
		}
		return requestUrl;
	}

	public List<Weather> weatherApi(String spotCode) {
		StringBuilder requestUrl = makingURL(spotCode);
		log.info(requestUrl.toString());
		List<Weather> list = new ArrayList<Weather>();
		try {
			SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
			factory.setConnectTimeout(2000); // 연결 타임아웃 2초
			factory.setReadTimeout(5000);
			RestTemplate rt = new RestTemplate(factory);
			URI uri = new URI(requestUrl.toString());
			String result = rt.getForObject(uri, String.class);
			String[] split = result.split(",=\n");
			log.info(result);
			if (split.length < 3) {
				return list;
			}
			for (int i = 0; i < 8; i++) {
				if (i == 0) {
					String[] info = split[i].split("\n");
					String[] infos = info[2].split(",");
					Weather weather = Weather.builder().regName(infos[0]).tmef(infos[2]).s1(infos[12]).s2(infos[13])
							.wh1(infos[14]).wh2(infos[15]).prep(infos[17]).wf(infos[18]).sky(infos[16]).build();
					list.add(weather);
				} else {
					String[] infos = split[i].split(",");
					if(infos.length == 19) {
						Weather weather = Weather.builder().regName(infos[0]).tmef(infos[2]).s1(infos[12]).s2(infos[13])
								.wh1(infos[14]).wh2(infos[15]).prep(infos[17]).wf(infos[18]).sky(infos[16]).build();
						list.add(weather);
					}
				}
			}
			return list;
		} catch (ResourceAccessException e) {
			return list;

		} catch (URISyntaxException e) {
			e.printStackTrace();
			return list;
		}

	}

}
