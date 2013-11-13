package com.bapop.dce.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.bo.FileBean;
import com.bapop.dce.dao.FileIODAO;
import com.bapop.dce.model.FileIO;

@Service
public class FileService {
	private FileIODAO fileIODAO;
 
    @Transactional(readOnly=true)
    public List<FileIO> getFileIOList(int userID){
 
        return fileIODAO.getFiles(userID);
    }
    
    @Transactional(readOnly=true)
    public List<FileIO> getFileIO(String id){
        return fileIODAO.getFileIO(id);
    }
 
    @Transactional
    public List<FileIO> create(List<FileIO> list){
 
        List<FileIO> newFileIOs = new ArrayList<FileIO>();
 
        for (FileIO FileIO : list){
            newFileIOs.add(fileIODAO.saveFile(FileIO));
        }
 
        return newFileIOs;
    }
    
    @Transactional
    public void delete(FileBean data){
    	fileIODAO.deleteFile(data.getId());
 
    }
 
    @Autowired
    public void setFileIODAO(FileIODAO FileIODAO) {
        this.fileIODAO = FileIODAO;
    }
 
}
