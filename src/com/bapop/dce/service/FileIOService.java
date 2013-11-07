package com.bapop.dce.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.dao.FileIODAO;
import com.bapop.dce.model.FileIO;
import com.bapop.dce.util.Util;

@Service
public class FileIOService {
	private FileIODAO FileIODAO;
	private Util util;
 
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
 
    @Transactional
    public List<FileIO> update(FileIO FileIO){
 
        List<FileIO> returnFileIOs = new ArrayList<FileIO>();
 
        //List<FileIO> updatedFileIOs = util.getFileIOsFromRequest(data);
 
        //for (FileIO FileIO : updatedFileIOs){
        //    returnFileIOs.add(FileIODAO.saveFileIO(FileIO));
        //}
        returnFileIOs.add(FileIODAO.saveFile(FileIO));
 
        return returnFileIOs;
    }
 
    @Transactional
    public void delete(Object data){
 
        //it is an array - have to cast to array object
        if (data.toString().indexOf('[') > -1){
 
            List<Integer> deleteFileIOs = util.getListIdFromJSON(data);
 
            for (Integer id : deleteFileIOs){
                FileIODAO.deleteFile(id);
            }
 
        } else { //it is only one object - cast to object/bean
 
            Integer id = Integer.parseInt(data.toString());
 
            FileIODAO.deleteFile(id);
        }
    }
 
    @Autowired
    public void setFileIODAO(FileIODAO FileIODAO) {
        this.FileIODAO = FileIODAO;
    }
 
}
