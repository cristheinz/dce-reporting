package com.bapop.dce.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
@Entity
@Table(schema="dce_app", name="vie_balan")
public class Balan {
	private int id;
	private int anomes;
	private String cta;
	private String text;
	private Double vald;
	private Double valc;
	private String iconCls;
	private boolean leaf;
	private String parent;

	@Id
	@GeneratedValue
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public int getAnomes() {
		return anomes;
	}
	public void setAnomes(int anomes) {
		this.anomes = anomes;
	}
	
	public String getCta() {
		return cta;
	}
	public void setCta(String cta) {
		this.cta = cta;
	}

	@Column (name="txt")
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}

	@Column (name="val_d", columnDefinition="decimal", precision=38, scale=2)
	public Double getVald() {
		return vald;
	}
	public void setVald(Double vald) {
		this.vald = vald;
	}

	@Column (name="val_c", columnDefinition="decimal", precision=38, scale=2)
	public Double getValc() {
		return valc;
	}
	public void setValc(Double valc) {
		this.valc = valc;
	}

	@Column (name="iconcls")
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	@Column (name="parent_cta")
	public String getParent() {
		return parent;
	}
	public void setParent(String parent) {
		this.parent = parent;
	}


}
