package com.bapop.dce.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
@Entity
//@Table(name = "tbl_nifst", schema = "dce_batch", catalog = "DCE_REPORTING", uniqueConstraints = @UniqueConstraint(columnNames = "nif"))
//@Table(name = "vie_nifst", schema = "dce_app", catalog = "DCE_REPORTING")
@Table(name = "fm2_nifst", schema = "dce_batch", catalog = "DCE_REPORTING")
public class Nifst {

	private int id;
	private String nif;
	private Integer sbp;
	private Integer sec;
	private String cae;
	private Integer big;
	private String nam;

	@Id
	@GeneratedValue
	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "nif", unique = true)
	public String getNif() {
		return this.nif;
	}

	public void setNif(String nif) {
		this.nif = nif;
	}

	@Column (name="sbp", columnDefinition="numeric")
	public Integer getSbp() {
		return this.sbp;
	}

	public void setSbp(Integer sbp) {
		this.sbp = sbp;
	}

	@Column (name="sec", columnDefinition="numeric")
	public Integer getSec() {
		return this.sec;
	}

	public void setSec(Integer sec) {
		this.sec = sec;
	}

	public String getCae() {
		return this.cae;
	}

	public void setCae(String cae) {
		this.cae = cae;
	}

	@Column(name = "big")
	public Integer getBig() {
		return this.big;
	}

	public void setBig(Integer big) {
		this.big = big;
	}

	@Column(name = "nam")
	public String getNam() {
		return this.nam;
	}

	public void setNam(String nam) {
		this.nam = nam;
	}
}
