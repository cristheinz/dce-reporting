package com.bapop.dce.bo;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

public class FileUploadBean {
	
	private CommonsMultipartFile file;
	
	public CommonsMultipartFile getFile() {
		return file;
	}
	 
	public void setFile(CommonsMultipartFile file) {
		this.file = file;
	}
	/*
	private MultipartFile file;

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public MultipartFile getFile() {
        return file;
    }*/

}
