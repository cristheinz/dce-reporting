package com.bapop.dce.model;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.annotate.JsonIgnore;

@JsonAutoDetect
@Entity
@Table(schema="dce_app", name="tbl_ctist")
public class Ctist {
	
	private int id;
	private int ct2;
	private int ind;
	private List<Faqst> faqs;
	
	public Ctist() {
	}

	public Ctist(int ct2, int ind) {
		this.ct2 = ct2;
		this.ind = ind;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public int getCt2() {
		return ct2;
	}
	public void setCt2(int ct2) {
		this.ct2 = ct2;
	}
	
	public int getInd() {
		return ind;
	}
	public void setInd(int ind) {
		this.ind = ind;
	}
	
	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "ctis",
		cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	public List<Faqst> getFaqs() {
		return faqs;
	}
	public void setFaqs(List<Faqst> faqs) {
		this.faqs = faqs;
	}

}
