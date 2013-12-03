package com.bapop.dce.bo;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
public class CtistBean {
	
	private int id;
	private int ct2;
	private int ind;
	private int faqid;
	
	public CtistBean() {
	}

	public CtistBean(int id,int ct2, int ind, int faqid) {
		this.id = id;
		this.ct2 = ct2;
		this.ind = ind;
		this.faqid = faqid;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public int getCt2() {
		return ct2;
	}
	public void setCt2(int ct2) {
		this.ct2 = ct2;
	}
	
	public int getInd() {
		return ind;
	}
	public void setInd(int ind) {
		this.ind = ind;
	}

	public int getFaqid() {
		return faqid;
	}

	public void setFaqid(int faqid) {
		this.faqid = faqid;
	}
	

}
