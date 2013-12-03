package com.bapop.dce.bo;

import java.util.List;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
public class FaqstBean {
	private int id;
	private int comiss;
	private String tag;
	private String txt;
	private List<CtistBean> ctis;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getComiss() {
		return comiss;
	}
	public void setComiss(int comiss) {
		this.comiss = comiss;
	}
	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	public String getTxt() {
		return txt;
	}
	public void setTxt(String txt) {
		this.txt = txt;
	}
	
	public List<CtistBean> getCtis() {
		return ctis;
	}
	public void setCtis(List<CtistBean> ctis) {
		this.ctis = ctis;
	}
	

}
