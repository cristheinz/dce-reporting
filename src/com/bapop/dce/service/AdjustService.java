package com.bapop.dce.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.dao.AdjustDAO;
import com.bapop.dce.model.Adjust;
import com.bapop.dce.model.PapelEmi;

@Service
public class AdjustService {
	private AdjustDAO adjustDAO;
 
    @Transactional(readOnly=true)
    public List<Adjust> getAdjusts(int anomes){
        return adjustDAO.getAdjusts(anomes);
    }
    
    @Transactional
    public List<Adjust> create(Adjust adjust){
        List<Adjust> returnObject = new ArrayList<Adjust>();
        
        returnObject.add(adjustDAO.save(adjust));
 
        return returnObject;
    }
	
	@Transactional
    public List<Adjust> update(Adjust adjust){
 
        List<Adjust> returnObject = new ArrayList<Adjust>();
 
        returnObject.add(adjustDAO.save(adjust));
 
        return returnObject;
    }
	
	@Transactional
	public void delete(Adjust adjust){
		adjustDAO.delete(adjust.getId());
	}
    
    public void runAdjusts(String anomes){
    	adjustDAO.adjustAfterAdjust(anomes);
    }
 
 
    @Autowired
    public void setAdjustDAO(AdjustDAO adjustDAO) {
        this.adjustDAO = adjustDAO;
    }
 
}
