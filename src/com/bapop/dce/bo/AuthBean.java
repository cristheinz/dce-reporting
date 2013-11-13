package com.bapop.dce.bo;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
public class AuthBean {
	private String key;

	public AuthBean(String key) {
		this.key=key;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

}
