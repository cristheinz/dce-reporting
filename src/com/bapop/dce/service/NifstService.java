package com.bapop.dce.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.dao.NifstDAO;
import com.bapop.dce.model.Nifst;

@Service
public class NifstService {
	
	private NifstDAO nifstDAO;
	@Autowired
    public void setFaqstDAO(NifstDAO nifstDAO) {
        this.nifstDAO = nifstDAO;
    }
	
	@Transactional(readOnly=true)
    public List<Nifst> getList(){
        return nifstDAO.list();
    }
	
	@Transactional(readOnly=true)
    public List<Nifst> findName(String name){
        return nifstDAO.searchByName(name);
    }
	@Transactional(readOnly=true)
    public List<Nifst> findNIF(String nif){
        return nifstDAO.searchByNif(nif);
    }
	
	@Transactional
    public List<Nifst> create(Nifst nifst){
        List<Nifst> returnObject = new ArrayList<Nifst>();
        
        returnObject.add(nifstDAO.save(nifst));
 
        return returnObject;
    }
	
	@Transactional
    public List<Nifst> update(Nifst nifst){
 
        List<Nifst> returnObject = new ArrayList<Nifst>();
 
        returnObject.add(nifstDAO.save(nifst));
 
        return returnObject;
    }
	
	@Transactional
	public void delete(Nifst nifst){
		nifstDAO.delete(nifst.getId());
	}

}
