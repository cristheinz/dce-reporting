package com.bapop.dce.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.bapop.dce.util.JsonDateSerializer;

@JsonAutoDetect
@Entity
@Table(schema="dce_batch", name="tbl_sucst")
public class Branch {

	private int id;
	private Integer suc;
	private String alf;
	private String txt;
	private Date dti;
	private Date dtf;
	private String zon;
	private Integer suct;
	private String lat;
	private String lng;

	@Id
	@GeneratedValue
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public Integer getSuc() {
		return suc;
	}
	public void setSuc(Integer suc) {
		this.suc = suc;
	}
	
	public String getAlf() {
		return alf;
	}
	public void setAlf(String alf) {
		this.alf = alf;
	}
	
	public String getTxt() {
		return txt;
	}
	public void setTxt(String txt) {
		this.txt = txt;
	}
	
	@JsonSerialize(using=JsonDateSerializer.class)
	public Date getDti() {
		return dti;
	}
	public void setDti(Date dti) {
		this.dti = dti;
	}
	
	@JsonSerialize(using=JsonDateSerializer.class)
	public Date getDtf() {
		return dtf;
	}
	public void setDtf(Date dtf) {
		this.dtf = dtf;
	}
	
	public String getZon() {
		return zon;
	}
	public void setZon(String zon) {
		this.zon = zon;
	}
	
	public Integer getSuct() {
		return suct;
	}
	public void setSuct(Integer suct) {
		this.suct = suct;
	}
	public String getLat() {
		return lat;
	}
	public void setLat(String lat) {
		this.lat = lat;
	}
	public String getLng() {
		return lng;
	}
	public void setLng(String lng) {
		this.lng = lng;
	}
}
