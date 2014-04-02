package com.bapop.dce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.dao.AdjustDAO;
import com.bapop.dce.model.Adjust;

@Service
public class AdjustService {
	private AdjustDAO adjustDAO;
 
    @Transactional(readOnly=true)
    public List<Adjust> getAdjusts(int anomes){
        return adjustDAO.getAdjusts(anomes);
    }
 
 
    @Autowired
    public void setAdjustDAO(AdjustDAO adjustDAO) {
        this.adjustDAO = adjustDAO;
    }
 
}
