package com.bapop.dce.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.dao.CtistDAO;
import com.bapop.dce.model.Ctist;
import com.bapop.dce.model.Faqst;

@Service
public class CtistService {
	
	private CtistDAO ctistDAO;
	@Autowired
    public void setFaqstDAO(CtistDAO ctistDAO) {
        this.ctistDAO = ctistDAO;
    }
	
	@Transactional(readOnly=true)
    public List<Ctist> getList(){
        return ctistDAO.list();
    }
	
	@Transactional
    public List<Ctist> create(Ctist ctist){
        List<Ctist> r = new ArrayList<Ctist>();
        
        r.add(ctistDAO.save(ctist));
 
        return r;
    }
	
	@Transactional
    public List<Ctist> update(Ctist ctist){
 
        List<Ctist> r = new ArrayList<Ctist>();
 
        r.add(ctistDAO.save(ctist));
 
        return r;
    }
	
	@Transactional
	public void delete(Ctist ctist){
		ctistDAO.delete(ctist.getId());
	}

}
