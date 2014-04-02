package com.bapop.dce.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnore;

@JsonAutoDetect
@Entity
@Table(schema="dce_app", name="vie_balan_ctv")
public class Ctvst {
	
	private int id;
	private int anomes;
	private String ctv;
	
	@Id
	@GeneratedValue
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	@JsonIgnore
	public int getAnomes() {
		return anomes;
	}
	public void setAnomes(int anomes) {
		this.anomes = anomes;
	}
	
	public String getCtv() {
		return ctv;
	}
	public void setCtv(String ctv) {
		this.ctv = ctv;
	}
}
