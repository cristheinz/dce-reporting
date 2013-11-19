package com.bapop.dce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.dao.BalanDAO;
import com.bapop.dce.model.Balan;

@Service
public class BalanService {
	private BalanDAO balanDAO;
 
    @Transactional(readOnly=true)
    public List<Balan> getBalanNodes(int anomes, String id){
        return balanDAO.getNodes(anomes, id);
    }
 
 
    @Autowired
    public void setBalanDAO(BalanDAO BalanDAO) {
        this.balanDAO = BalanDAO;
    }
 
}
