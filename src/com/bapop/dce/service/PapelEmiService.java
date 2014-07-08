package com.bapop.dce.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.dao.PapelEmiDAO;
import com.bapop.dce.model.PapelEmi;

@Service
public class PapelEmiService {
	
	private PapelEmiDAO papelEmiDAO;
	@Autowired
    public void setFaqstDAO(PapelEmiDAO papelEmiDAO) {
        this.papelEmiDAO = papelEmiDAO;
    }
	
	@Transactional(readOnly=true)
    public List<PapelEmi> getList(){
        return papelEmiDAO.list();
    }
	
	@Transactional(readOnly=true)
    public List<PapelEmi> getList(int papelId){
        return papelEmiDAO.list(papelId);
    }
	
	@Transactional
    public List<PapelEmi> create(PapelEmi papelEmi){
        List<PapelEmi> returnObject = new ArrayList<PapelEmi>();
        
        returnObject.add(papelEmiDAO.save(papelEmi));
 
        return returnObject;
    }
	
	@Transactional
    public List<PapelEmi> update(PapelEmi papelEmi){
 
        List<PapelEmi> returnObject = new ArrayList<PapelEmi>();
 
        returnObject.add(papelEmiDAO.save(papelEmi));
 
        return returnObject;
    }
	
	@Transactional
	public void delete(PapelEmi papelEmi){
		papelEmiDAO.delete(papelEmi.getId());
	}

}
