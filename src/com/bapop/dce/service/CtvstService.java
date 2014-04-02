package com.bapop.dce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.dao.CtvstDAO;
import com.bapop.dce.model.Ctvst;

@Service
public class CtvstService {
	private CtvstDAO ctvstDAO;
 
    @Transactional(readOnly=true)
    public List<Ctvst> getCtvs(int anomes){
        return ctvstDAO.getCtvs(anomes);
    }
 
 
    @Autowired
    public void setCtvstDAO(CtvstDAO ctvstDAO) {
        this.ctvstDAO = ctvstDAO;
    }
 
}
