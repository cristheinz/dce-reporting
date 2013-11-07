package com.bapop.dce.model;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
public class Auth {
	private String key;

	public Auth(String key) {
		this.key=key;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

}
