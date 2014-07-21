package com.bapop.dce.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;


public class Utils {
	public static String generateFseisFileName() {
		DateFormat yyMMdd = new SimpleDateFormat("yyMMdd");
		DateFormat HHmmss = new SimpleDateFormat("HHmmss");
		Date now = new Date();
		return "RDCIAS.D" + yyMMdd.format(now) + ".H" + HHmmss.format(now);
	}
	
	public static String generateFreguFileName(String maxName){
		String name="";
		DateFormat df1 = new SimpleDateFormat("yyyyMMddHHmm");
		name="KNCTOMA_00460600_"+df1.format(new Date())+".TXT";
		while (maxName.equals(name)) {
			name="KNCTOMA_00460600_"+df1.format(new Date())+".TXT";
		}
		return name;
	}
	
	public static String[] getDashboradPeriods(String anomes) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
		
		int y=Integer.parseInt(anomes.substring(0, 4));
		int m=Integer.parseInt(anomes.substring(4));
		m=m-1;
		//System.out.println(m+";"+y);

		Calendar cal = Calendar.getInstance();
		cal.set(y, m, 1);
		Date d1 = cal.getTime();
		//System.out.println(sdf.format(d1));
		
		cal.add(Calendar.MONTH, -1);
		d1 = cal.getTime();
		//System.out.println(d1.toString());
		
		cal.add(Calendar.MONTH, -1);
		Date d2 = cal.getTime();
		//System.out.println(d2.toString());

		cal.add(Calendar.MONTH, -1);
		Date d3 = cal.getTime();
		//System.out.println(d3.toString());

		cal.add(Calendar.MONTH, -9);
		Date dh = cal.getTime();
		//System.out.println(dh.toString());

		return new String[]{sdf.format(d1),sdf.format(d2),sdf.format(d3),sdf.format(dh)};
	}
	
	public static void main(String[] args) {
		/*for(String s:Utils.getDashboradPeriods("201309")) {
			System.out.println(s);
		};*/
		
		System.out.println("aaaaaaa");
		String content="0           BALANÇO RESERVADO DO PORTUGAL COM AJUSTES INCLUÍDOS                                              DATA:31-12-2011";
		int i=content.indexOf(" DATA:");
		String[] dt=content.substring(i+6, i+16).split("-");
		String filenamePrefix=dt[2]+dt[1]+"_";
		System.out.println(filenamePrefix);
	}

}
