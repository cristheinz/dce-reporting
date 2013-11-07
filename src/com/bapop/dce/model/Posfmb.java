package com.bapop.dce.model;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
@Entity
@Table(schema="dce_batch", name="vie_posfm2b", catalog = "DCE_REPORTING")
public class Posfmb {

	private PosfmbID id;
	private double val;

	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "anomes", column = @Column(name = "anomes", nullable = false)),
			@AttributeOverride(name = "id", column = @Column(name = "grp")) })
	public PosfmbID getId() {
		return this.id;
	}

	public void setId(PosfmbID id) {
		this.id = id;
	}
	
	@Column (name="val", columnDefinition="decimal", precision=38, scale=2)  
	public double getVal() {
		return val;
	}
	public void setVal(double val) {
		this.val = val;
	}
	
	

}
