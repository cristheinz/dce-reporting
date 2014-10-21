package com.bapop.dce.bo;

import java.math.BigDecimal;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
public class DashBoardBean {

	private String name;
	private BigDecimal data1;
	private BigDecimal data2;
	private BigDecimal data3;
	private BigDecimal data4;
	private BigDecimal data5;
	
	public DashBoardBean(){}
	
	public DashBoardBean(String name, BigDecimal data1, BigDecimal data2,
			BigDecimal data3, BigDecimal data4, BigDecimal data5) {
		//super();
		this.name = name;
		this.data1 = data1;
		this.data2 = data2;
		this.data3 = data3;
		this.data4 = data4;
		this.data5 = data5;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public BigDecimal getData1() {
		return data1;
	}
	public void setData1(BigDecimal data1) {
		this.data1 = data1;
	}
	public BigDecimal getData2() {
		return data2;
	}
	public void setData2(BigDecimal data2) {
		this.data2 = data2;
	}
	public BigDecimal getData3() {
		return data3;
	}
	public void setData3(BigDecimal data3) {
		this.data3 = data3;
	}
	public BigDecimal getData4() {
		return data4;
	}
	public void setData4(BigDecimal data4) {
		this.data4 = data4;
	}
	public BigDecimal getData5() {
		return data5;
	}
	public void setData5(BigDecimal data5) {
		this.data5 = data5;
	}
	
	
	

}
