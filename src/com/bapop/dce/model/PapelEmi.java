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
@Table(schema="dce_app", name="tbl_papel_emi")
public class PapelEmi {
	private int id;
	private int papel;
	private String emi;
	private String nif;
	private String nam;
	private int suc;
	private Date dti;
	private Date dtf;
	private Double val;
	private String isin;
	
	@Id
	@GeneratedValue
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getPapel() {
		return papel;
	}
	public void setPapel(int papel) {
		this.papel = papel;
	}
	public String getEmi() {
		return emi;
	}
	public void setEmi(String emi) {
		this.emi = emi;
	}
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
	public int getSuc() {
		return suc;
	}
	public void setSuc(int suc) {
		this.suc = suc;
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
	@Column (name="val", columnDefinition="decimal", precision=14, scale=2)
	public Double getVal() {
		return val;
	}
	public void setVal(Double val) {
		this.val = val;
	}
	public String getIsin() {
		return isin;
	}
	public void setIsin(String isin) {
		this.isin = isin;
	}
}
