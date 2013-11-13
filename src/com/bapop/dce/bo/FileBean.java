package com.bapop.dce.bo;

import java.util.Date;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.bapop.dce.model.FileIO;
import com.bapop.dce.util.JsonDateSerializer;

@JsonAutoDetect
public class FileBean {
	
	private int id;
	private String name;
	private Date creationDate;
	private String fid;
	private String title;
	private Date dts;
	private Date dtp;
	private String ext;
	
	public FileBean() {
		
	}
	public FileBean(FileIO file) {
		super();
		this.id = file.getId();
		this.name = file.getName();
		this.creationDate = file.getCreationDate();
		this.fid = file.getFid();
		this.title = file.getTitle();
		this.dts = file.getDts();
		this.dtp = file.getDtp();
		String ext="none";
		String name=file.getName();
		if(name.endsWith(".csv") ||name.endsWith(".csv")|| 
				name.endsWith(".TXT")||name.endsWith(".txt") ||
				name.endsWith(".PDF")||name.endsWith(".pdf")) {
			ext = name.substring(name.lastIndexOf(".")+1, name.length()).toLowerCase();
		}
		this.ext = ext;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@JsonSerialize(using=JsonDateSerializer.class)
	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public String getFid() {
		return fid;
	}

	public void setFid(String fid) {
		this.fid = fid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@JsonSerialize(using=JsonDateSerializer.class)
	public Date getDts() {
		return dts;
	}

	public void setDts(Date dts) {
		this.dts = dts;
	}

	@JsonSerialize(using=JsonDateSerializer.class)
	public Date getDtp() {
		return dtp;
	}

	public void setDtp(Date dtp) {
		this.dtp = dtp;
	}

	public String getExt() {
		return ext;
	}

	public void setExt(String ext) {
		this.ext = ext;
	}

}
