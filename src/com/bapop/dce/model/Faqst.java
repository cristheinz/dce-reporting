package com.bapop.dce.model;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
@Entity
@Table(schema="dce_app", name="tbl_faqst")
public class Faqst {
	private int id;
	private int comiss;
	private String tag;
	private String txt;
	private List<Ctist> ctis;

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getComiss() {
		return comiss;
	}
	public void setComiss(int comiss) {
		this.comiss = comiss;
	}
	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	public String getTxt() {
		return txt;
	}
	public void setTxt(String txt) {
		this.txt = txt;
	}
	
	//@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@ManyToMany(//fetch = FetchType.LAZY, 
			fetch = FetchType.EAGER,
			cascade ={CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	@JoinTable(name = "faq_cti", schema = "dce_app", joinColumns = { 
			@JoinColumn(name = "cti_id", nullable = false, updatable = false) }, 
			inverseJoinColumns = { @JoinColumn(name = "faq_id", 
					nullable = false, updatable = false) })
	public List<Ctist> getCtis() {
		return ctis;
	}
	public void setCtis(List<Ctist> ctis) {
		this.ctis = ctis;
	}
	

}
