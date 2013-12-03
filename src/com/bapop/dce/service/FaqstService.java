package com.bapop.dce.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.bo.FileBean;
import com.bapop.dce.dao.FaqstDAO;
import com.bapop.dce.model.Faqst;

@Service
public class FaqstService {
	
	private FaqstDAO faqstDAO;
	@Autowired
    public void setFaqstDAO(FaqstDAO faqstDAO) {
        this.faqstDAO = faqstDAO;
    }
	
	@Transactional(readOnly=true)
    public List<Faqst> getList(){
        return faqstDAO.list();
    }
	
	@Transactional
    public List<Faqst> create(Faqst faqst){
        List<Faqst> returnFaqst = new ArrayList<Faqst>();
        
        returnFaqst.add(faqstDAO.save(faqst));
 
        return returnFaqst;
    }
	
	@Transactional
    public List<Faqst> update(Faqst faqst){
 
        List<Faqst> returnFaqst = new ArrayList<Faqst>();
 
        returnFaqst.add(faqstDAO.save(faqst));
 
        return returnFaqst;
    }
	
	@Transactional
	public void delete(Faqst faqst){
		faqstDAO.delete(faqst.getId());
	}

}
