package com.bapop.dce.bo;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
public class ReportTreeItem {

	private int id;
	private String text;
	private String leaf;
	private String cls;
	private int parent;
	private String iconcls;
	
	public ReportTreeItem() {}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	
	public String getCls() {
		return cls;
	}
	public void setCls(String cls) {
		this.cls = cls;
	}
	public int getParent() {
		return parent;
	}
	public void setParent(int parent) {
		this.parent = parent;
	}
	public String getLeaf() {
		return leaf;
	}
	public void setLeaf(String leaf) {
		this.leaf = leaf;
	}
	public String getIconcls() {
		return iconcls;
	}
	public void setIconcls(String iconcls) {
		this.iconcls = iconcls;
	}
	
}
