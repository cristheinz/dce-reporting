package com.bapop.dce.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.bapop.dce.util.JsonDateSerializer;

@JsonAutoDetect
@Entity
@Table(schema="dce_app", name="tbl_papel")
public class Papel {
	private int id;
	//private String prg;
	private String nif;
	private String nam;
	private Date dti;
	private Date dtf;
	private String moe;
	private Double val;
	
	@Id
	@GeneratedValue
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}/*
	public String getPrg() {
		return prg;
	}
	public void setPrg(String prg) {
		this.prg = prg;
	}*/
	public String getNif() {
		return nif;
	}
	public void setNif(String nif) {
		this.nif = nif;
	}
	public String getNam() {
		return nam;
	}
	public void setNam(String nam) {
		this.nam = nam;
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
	public String getMoe() {
		return moe;
	}
	public void setMoe(String moe) {
		this.moe = moe;
	}
	@Column (name="val", columnDefinition="decimal", precision=14, scale=2)
	public Double getVal() {
		return val;
	}
	public void setVal(Double val) {
		this.val = val;
	}
}
