package com.bapop.dce.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.dao.FileIODAO;
import com.bapop.dce.model.FileIO;

@Service
public class FileService {
	private FileIODAO FileIODAO;
 
    @Transactional(readOnly=true)
    public List<FileIO> getFileIOList(int userID){
 
        return FileIODAO.getFiles(userID);
    }
 
    @Transactional
    public List<FileIO> create(List<FileIO> list){
 
        List<FileIO> newFileIOs = new ArrayList<FileIO>();
 
        for (FileIO FileIO : list){
            newFileIOs.add(FileIODAO.saveFile(FileIO));
        }
 
        return newFileIOs;
    }
 
    @Autowired
    public void setFileIODAO(FileIODAO FileIODAO) {
        this.FileIODAO = FileIODAO;
    }
 
}
