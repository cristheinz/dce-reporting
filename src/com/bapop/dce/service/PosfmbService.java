package com.bapop.dce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.bo.DashBoardBean;
import com.bapop.dce.dao.PosfmbDAO;

@Service
public class PosfmbService {
	private PosfmbDAO posfmbDAO;
 
    @Transactional(readOnly=true)
    public List<DashBoardBean> view(String anomes){
    //public List<Object[]> view(String anomes){
        return posfmbDAO.getPosfmb(anomes);
    }
 
 
    @Autowired
    public void setPosfmbDAO(PosfmbDAO posfmbDAO) {
        this.posfmbDAO = posfmbDAO;
    }
 
}
