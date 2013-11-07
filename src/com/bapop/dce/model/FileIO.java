package com.bapop.dce.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
@Entity
@Table(name = "tbl_fileIO", schema = "dce_app", catalog = "DCE_REPORTING")
public class FileIO {
	
	private int id;
	private String name;
	private byte[] data;
	private int userId;
	private Date creationDate;
	private String fid;
	private String title;
	private Date dts;
	private Date dtp;
	private byte[] pdata;

	public FileIO() {
	}

	public FileIO(int id) {
		this.id = id;
	}
	
	@Id
	@GeneratedValue
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	@Column(name = "fname", length = 6)
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@Column(name = "fdata")
	public byte[] getData() {
		return data;
	}
	public void setData(byte[] data) {
		this.data = data;
	}
	
	@Column(name = "user_id")
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	
	@Column(name = "up_date")
	public Date getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}
	
	@Column(name = "fid")
	public String getFid() {
		return fid;
	}
	public void setFid(String fid) {
		this.fid = fid;
	}
	
	@Column(name = "title")
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	@Column(name = "dts")
	public Date getDts() {
		return dts;
	}
	public void setDts(Date dts) {
		this.dts = dts;
	}
	
	@Column(name = "dtp")
	public Date getDtp() {
		return dtp;
	}
	public void setDtp(Date dtp) {
		this.dtp = dtp;
	}
	
	@Column(name = "pdata")
	public byte[] getPdata() {
		return pdata;
	}
	public void setPdata(byte[] pdata) {
		this.pdata = pdata;
	}
}
