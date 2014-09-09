package com.bapop.dce.model;

import static javax.persistence.GenerationType.IDENTITY;

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
@Table(name = "tbl_user_log", schema = "dce_app", catalog = "DCE_REPORTING")
public class UserLog {
	private int id;
	private int userid;
	private int action;
	private String msg;
	private Date dt;
	
	public UserLog(int userid, int action, String msg) {
		super();
		this.userid = userid;
		this.action = action;
		this.msg = msg;
		this.dt = new Date();
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
	
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	
	@Column(name = "act")
	public int getAction() {
		return action;
	}
	public void setAction(int action) {
		this.action = action;
	}
	
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	@JsonSerialize(using=JsonDateSerializer.class)
	public Date getDt() {
		return dt;
	}
	public void setDt(Date dt) {
		this.dt = dt;
	}
	
	

}
