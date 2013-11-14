package com.bapop.dce.bo;

import java.util.Date;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.bapop.dce.model.FileIO;
import com.bapop.dce.util.JsonDateSerializer;
import com.bapop.dce.util.FileUtils;

@JsonAutoDetect
public class FileBean {
	
	private int id;
	private String name;
	private Date creationDate;
	private String fid;
	private String title;
	private Date dts;
	private Date dtp;
	private int siz;
	
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
		
		this.siz = FileUtils.getFileSize(file.getData().length, FileUtils.KILOBYTES);
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

	public int getSiz() {
		return siz;
	}

	public void setSiz(int siz) {
		this.siz = siz;
	}

}
