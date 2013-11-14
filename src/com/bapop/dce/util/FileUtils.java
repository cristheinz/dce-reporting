package com.bapop.dce.util;

public class FileUtils {
	public static final int BYTES = 0;
	public static final int KILOBYTES = 1;
	public static final int MEGABYTES = 2;
	public static final int GIGABYTES = 3;
	public static final int TERABYTES = 4;
	public static final int PETABYTES = 5;
	public static final int EXABYTES = 6;
	public static final int ZETTABYTES = 7;
	public static final int YOTTABYTES = 8;
	
	
	public static String getFileSizeStr(int len, int unit){
		String siz="0";
		int bytes=len;
		int kilobytes = (bytes / 1024);
		int megabytes = (kilobytes / 1024);
		int gigabytes = (megabytes / 1024);
		int terabytes = (gigabytes / 1024);
		int petabytes = (terabytes / 1024);
		int exabytes = (petabytes / 1024);
		int zettabytes = (exabytes / 1024);
		int yottabytes = (zettabytes / 1024);
		
		switch(unit){
		case BYTES: siz = String.valueOf(bytes)+" bytes";
			break;
		case KILOBYTES: siz = String.valueOf(kilobytes>0 ? kilobytes : 1)+" KB";
			break;
		case MEGABYTES: siz = String.valueOf(megabytes>0 ? megabytes : 1)+ "MB";
			break;
		case GIGABYTES: siz = String.valueOf(gigabytes>0 ? gigabytes : 1)+ "GB";
			break;
		case TERABYTES: siz = String.valueOf(terabytes>0 ? terabytes : 1)+ "TB";
			break;
		case PETABYTES: siz = String.valueOf(petabytes>0 ? petabytes : 1)+ "PB";
			break;
		case EXABYTES: siz = String.valueOf(exabytes>0 ? exabytes : 1)+ "EB";
			break;
		case ZETTABYTES: siz = String.valueOf(zettabytes>0 ? zettabytes : 1)+ "ZB";
			break;
		case YOTTABYTES: siz = String.valueOf(yottabytes>0 ? yottabytes : 1)+ "YB";
			break;
		default:
			if(yottabytes < 1024) siz = String.valueOf(yottabytes)+ "YB";
			if(zettabytes < 1024) siz = String.valueOf(zettabytes)+ "ZB";
			if(exabytes < 1024) siz = String.valueOf(exabytes)+ "EB";
			if(petabytes < 1024) siz = String.valueOf(petabytes)+ "PB";
			if(terabytes < 1024) siz = String.valueOf(terabytes)+ "TB";
			if(gigabytes < 1024) siz = String.valueOf(gigabytes)+ "GB";
			if(megabytes < 1024) siz = String.valueOf(megabytes)+ "MB";
			if(kilobytes < 1024) siz = String.valueOf(kilobytes)+" KB";
			if(bytes < 1024) siz = String.valueOf(bytes)+" bytes";
			break;
		}
		
		return siz;
	}

	public static int getFileSize(int len, int unit){
		int siz=0;
		int bytes=len;
		int kilobytes = (bytes / 1024);
		int megabytes = (kilobytes / 1024);
		int gigabytes = (megabytes / 1024);
		int terabytes = (gigabytes / 1024);
		int petabytes = (terabytes / 1024);
		int exabytes = (petabytes / 1024);
		int zettabytes = (exabytes / 1024);
		int yottabytes = (zettabytes / 1024);
		
		switch(unit){
		case BYTES: siz =bytes;
			break;
		case KILOBYTES: siz= kilobytes>0 ? kilobytes : 1;
			break;
		case MEGABYTES: siz = megabytes>0 ? megabytes : 1;
			break;
		case GIGABYTES: siz = gigabytes>0 ? gigabytes : 1;
			break;
		case TERABYTES: siz = terabytes>0 ? terabytes : 1;
			break;
		case PETABYTES: siz = petabytes>0 ? petabytes : 1;
			break;
		case EXABYTES: siz = exabytes>0 ? exabytes : 1;
			break;
		case ZETTABYTES: siz = zettabytes>0 ? zettabytes : 1;
			break;
		case YOTTABYTES: siz = yottabytes>0 ? yottabytes : 1;
			break;
		default:
			if(yottabytes < 1024) siz = yottabytes;
			if(zettabytes < 1024) siz = zettabytes;
			if(exabytes < 1024) siz = exabytes;
			if(petabytes < 1024) siz = petabytes;
			if(terabytes < 1024) siz = terabytes;
			if(gigabytes < 1024) siz = gigabytes;
			if(megabytes < 1024) siz = megabytes;
			if(kilobytes < 1024) siz = kilobytes;
			if(bytes < 1024) siz = bytes;
			break;
		}
		
		return siz;
	}

}
