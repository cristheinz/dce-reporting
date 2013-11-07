package com.bapop.dce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.dao.UserDAO;
import com.bapop.dce.model.User;

@Service
public class UserService {
	private UserDAO userDAO;
	//private Util util;
 
    @Transactional(readOnly=true)
    public List<User> signin(String pwd){
 
        return userDAO.getUserByPwd(pwd);
    }
 
 
    @Autowired
    public void setUserDAO(UserDAO userDAO) {
        this.userDAO = userDAO;
    }
 
}
