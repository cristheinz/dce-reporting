package com.bapop.dce.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.dao.BonifDAO;
import com.bapop.dce.model.Bonif;

@Service
public class BonifService {
	private BonifDAO bonifDAO;
 
    @Transactional(readOnly=true)
    public List<Bonif> getBonifList(){
 
        return bonifDAO.getBonifs();
    }
    
    @Transactional
    public List<Bonif> update(Bonif bonif){
 
        List<Bonif> returnObject = new ArrayList<Bonif>();
 
        returnObject.add(bonifDAO.save(bonif));
 
        return returnObject;
    }
 
 
    @Autowired
    public void setBonifDAO(BonifDAO bonifDAO) {
        this.bonifDAO = bonifDAO;
    }
 
}
