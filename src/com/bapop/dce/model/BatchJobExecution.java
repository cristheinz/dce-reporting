package com.bapop.dce.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.bapop.dce.util.JsonDateSerializer;

@JsonAutoDetect
@Entity
@Table(name = "vie_batch_jobs", schema = "dce_app", catalog = "DCE_REPORTING")
public class BatchJobExecution {

	private int id;
	private String job;
	private String anomes;
	private String status;
	private Date dti;
	private String runtime;

	public BatchJobExecution() {
	}


	@Id
	@Column(name = "id", unique = true, nullable = false)
	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}


	public String getJob() {
		return job;
	}


	public void setJob(String job) {
		this.job = job;
	}


	public String getAnomes() {
		return anomes;
	}


	public void setAnomes(String anomes) {
		this.anomes = anomes;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}

	@JsonSerialize(using=JsonDateSerializer.class)
	public Date getDti() {
		return dti;
	}


	public void setDti(Date dti) {
		this.dti = dti;
	}


	public String getRuntime() {
		return runtime;
	}


	public void setRuntime(String runtime) {
		this.runtime = runtime;
	}


	

	

}
