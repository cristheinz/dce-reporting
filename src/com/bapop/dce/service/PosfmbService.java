package com.bapop.dce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.dao.PosfmbDAO;
import com.bapop.dce.model.PosfmbTO;

@Service
public class PosfmbService {
	private PosfmbDAO posfmbDAO;
	//private Util util;
 
    @Transactional(readOnly=true)
    public List<PosfmbTO> view(String anomes){
    	/*List<PosfmbTO> tos=posfmbDAO.getPosfmb(anomes);
        for(PosfmbTO to : tos) {
        	System.out.println(to.getCtab());
        }
        return tos;*/
        return posfmbDAO.getPosfmb(anomes);
    }
 
 
    @Autowired
    public void setPosfmbDAO(PosfmbDAO posfmbDAO) {
        this.posfmbDAO = posfmbDAO;
    }
 
}
