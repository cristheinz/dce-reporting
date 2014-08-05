package com.bapop.dce.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.bapop.dce.util.JsonTimeSerializer;

@JsonAutoDetect
@Entity
@Table(name = "vie_batch_steps", schema = "dce_app", catalog = "DCE_REPORTING")
public class BatchStepExecution {

	private long id;
	private int jobid;
	private String step;
	private String status;
	private String msg;
	private Date dti;
	private Date dtf;
	private String runtime;

	public BatchStepExecution() {
	}


	@Id
	@Column(name = "id", unique = true, nullable = false)
	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}


	public int getJobid() {
		return jobid;
	}


	public void setJobid(int jobid) {
		this.jobid = jobid;
	}


	public String getStep() {
		return step;
	}


	public void setStep(String step) {
		this.step = step;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public String getMsg() {
		return msg;
	}


	public void setMsg(String msg) {
		this.msg = msg;
	}

	@JsonSerialize(using=JsonTimeSerializer.class)
	public Date getDti() {
		return dti;
	}


	public void setDti(Date dti) {
		this.dti = dti;
	}

	@JsonSerialize(using=JsonTimeSerializer.class)
	public Date getDtf() {
		return dtf;
	}


	public void setDtf(Date dtf) {
		this.dtf = dtf;
	}


	public String getRuntime() {
		return runtime;
	}


	public void setRuntime(String runtime) {
		this.runtime = runtime;
	}

	
}
