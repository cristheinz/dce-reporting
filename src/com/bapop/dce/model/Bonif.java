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
@Table(schema="dce_app", name="vie_bonif")
public class Bonif {
	private int id;
	private String doc;
	private Double val;
	private Double vali;
	private String fname;
	private Date dts;
	private Date dtp;
	private Date dti;
	private Date dtl;
	private String owner;

	@Id
	@GeneratedValue
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getDoc() {
		return doc;
	}
	public void setDoc(String doc) {
		this.doc = doc;
	}
	
	@Column (name="val", columnDefinition="decimal", precision=14, scale=2)
	public Double getVal() {
		return val;
	}
	public void setVal(Double val) {
		this.val = val;
	}

	@Column (name="val_i", columnDefinition="decimal", precision=14, scale=2)
	public Double getVali() {
		return vali;
	}
	public void setVali(Double vali) {
		this.vali = vali;
	}

	public String getFname() {
		return fname;
	}
	public void setFname(String fname) {
		this.fname = fname;
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
	
	@JsonSerialize(using=JsonDateSerializer.class)
	public Date getDti() {
		return dti;
	}
	public void setDti(Date dti) {
		this.dti = dti;
	}
	
	@JsonSerialize(using=JsonDateSerializer.class)
	public Date getDtl() {
		return dtl;
	}
	public void setDtl(Date dtl) {
		this.dtl = dtl;
	}
	
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}

}
