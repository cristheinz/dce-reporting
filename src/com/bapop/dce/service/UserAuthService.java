package com.bapop.dce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.dao.UserAuthDAO;
import com.bapop.dce.model.UserAuth;

@Service
public class UserAuthService {
	
	private UserAuthDAO userAuthDAO;
	@Autowired
    public void setUserAuthDAO(UserAuthDAO userAuthDAO) {
        this.userAuthDAO = userAuthDAO;
    }
	
	@Transactional(readOnly=true)
    public List<UserAuth> getList(int userid){
        return userAuthDAO.list(userid);
    }
	

}
