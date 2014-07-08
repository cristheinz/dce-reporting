package com.bapop.dce.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.dao.PapelDAO;
import com.bapop.dce.model.Papel;

@Service
public class PapelService {
	
	private PapelDAO papelDAO;
	@Autowired
    public void setFaqstDAO(PapelDAO papelDAO) {
        this.papelDAO = papelDAO;
    }
	
	@Transactional(readOnly=true)
    public List<Papel> getList(){
        return papelDAO.list();
    }
	
	@Transactional
    public List<Papel> create(Papel papel){
        List<Papel> returnObject = new ArrayList<Papel>();
        
        returnObject.add(papelDAO.save(papel));
 
        return returnObject;
    }
	
	@Transactional
    public List<Papel> update(Papel papel){
 
        List<Papel> returnObject = new ArrayList<Papel>();
 
        returnObject.add(papelDAO.save(papel));
 
        return returnObject;
    }
	
	@Transactional
	public void delete(Papel papel){
		papelDAO.delete(papel.getId());
	}

}
