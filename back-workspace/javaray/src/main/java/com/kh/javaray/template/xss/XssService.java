package com.kh.javaray.template.xss;

import org.springframework.stereotype.Component;

@Component
public class XssService {

	public String makingXss(String content) {
		return content.replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("&", "&amp;");
	}
	
	public String changeInsertForm(String content) {
		return content.replaceAll("\n", "<br />");
	}
	
	public String changeSelectForm(String content) {
		return content.replaceAll("<br />", "\n"); // 이건 textarea로 돌려줘야할 때 사용하면 됩니다.(ex. 수정 시)
	}
	
}
