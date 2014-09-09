package com.bapop.dce.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.dao.UserLogDAO;
import com.bapop.dce.model.UserLog;

@Service
public class UserLogService {
	
	private UserLogDAO userLogDAO;
	@Autowired
    public void setDAO(UserLogDAO userLogDAO) {
        this.userLogDAO = userLogDAO;
    }
	
	@Transactional
    public List<UserLog> save(UserLog log){
        List<UserLog> returnObject = new ArrayList<UserLog>();
 
        returnObject.add(userLogDAO.save(log));
 
        return returnObject;
    }
	

}
