package com.bapop.dce.model;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
@Entity
@Table(name = "tbl_balan_adjust", schema = "dce_app", catalog = "DCE_REPORTING")
public class Adjust {

	private int id;
	private int anomes;
	private String cta;
	private int ct2;
	private Double vald;
	private Double valc;
	private int flg;

	public Adjust() {
	}

	public Adjust(int id) {
		this.id = id;
	}

	public Adjust(String cta,int ct2,Double valD,
			Double valC,int flg) {
		this.cta = cta;
		this.ct2 = ct2;
		this.vald = valD;
		this.valc = valC;
		this.flg = flg;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = false)
	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "anomes")
	public int getAnomes() {
		return anomes;
	}

	public void setAnomes(int anomes) {
		this.anomes = anomes;
	}

	@Column(name = "cta")
	public String getCta() {
		return cta;
	}

	public void setCta(String cta) {
		this.cta = cta;
	}

	@Column(name = "ct2")
	public int getCt2() {
		return ct2;
	}

	public void setCt2(int ct2) {
		this.ct2 = ct2;
	}

	@Column(name = "val_d", precision = 14, scale=2, columnDefinition = "decimal")
	public Double getVald() {
		return vald;
	}

	public void setVald(Double valD) {
		this.vald = valD;
	}

	@Column(name = "val_c", precision = 14, scale=2, columnDefinition = "decimal")
	public Double getValc() {
		return valc;
	}

	public void setValc(Double valC) {
		this.valc = valC;
	}

	@Column(name = "flg")
	public int getFlg() {
		return flg;
	}

	public void setFlg(int flg) {
		this.flg = flg;
	}
}
