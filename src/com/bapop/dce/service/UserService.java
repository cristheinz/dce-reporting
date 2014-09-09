package com.bapop.dce.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.dao.UserDAO;
import com.bapop.dce.model.User;

@Service
public class UserService {
	private UserDAO userDAO;
 
    @Transactional(readOnly=true)
    public List<User> signin(String pwd){
        return userDAO.getUserByPwd(pwd);
    }
    
    @Transactional
    public List<User> update(User user){
 
        List<User> r = new ArrayList<User>();
 
        r.add(userDAO.save(user));
 
        return r;
    }
 
 
    @Autowired
    public void setUserDAO(UserDAO userDAO) {
        this.userDAO = userDAO;
    }
 
}
