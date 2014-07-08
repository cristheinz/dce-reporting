package com.bapop.dce.web;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.bapop.dce.bo.AuthBean;
import com.bapop.dce.model.User;
import com.bapop.dce.service.UserService;
import com.bapop.dce.util.ExtJSReturn;

@Controller
public class AuthenticationController {
	private UserService userService;
	
	@RequestMapping(value="/home.action")
    public ModelAndView home(HttpSession session) throws Exception {

		if (session.getAttribute("userID")==null) {
			return new ModelAndView("login");
        } else {
        	return new ModelAndView("home");
        }
            
    }
	
	@RequestMapping(value="/signin.action")
	public @ResponseBody Map<String,? extends Object> signin(@RequestParam("loginPassword") String password, HttpSession session) throws Exception {
		try {
			List<User> l=userService.signin(password);
			if(l.size()==0) 
				return ExtJSReturn.mapError("ID de acesso incorreto.");
			session.setAttribute("userID", l.get(0).getId());
			return ExtJSReturn.mapOK();
			
		} catch (Exception e) {
			return ExtJSReturn.mapError("Error retrieving User from database.");
		}
	}
	
	@RequestMapping(value="/signout.action")
	public ModelAndView logout(HttpSession session) {
        session.setAttribute("userID", null);
        return new ModelAndView(new RedirectView(""));
        //return new ModelAndView("login");
	}
	
	@RequestMapping(value="/auth.action")
	public @ResponseBody Map<String,? extends Object> auth(HttpSession session) throws Exception {
		try{
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			List<AuthBean> result=new ArrayList<AuthBean>();
			result.add(new AuthBean("moduleBranch-E"));
			result.add(new AuthBean("moduleBalance-E"));
			result.add(new AuthBean("moduleFaqst-E"));
			result.add(new AuthBean("modulePapel-E"));
			result.add(new AuthBean("modulePapelEmi-E"));
			if(id==2) {
				result.add(new AuthBean("moduleBranch-U"));	
				result.add(new AuthBean("moduleFaqst-U"));
				result.add(new AuthBean("modulePapel-U"));
				result.add(new AuthBean("modulePapelEmi-U"));
			}
			if(id==3){
				result.add(new AuthBean("moduleFaqst-U"));
			}
			
			return ExtJSReturn.mapOK(result,result.size());
			
		} catch (Exception e) {
			return ExtJSReturn.mapError("Error retrieving Auth from database.");
		}
	}
	
	@Autowired
	public void setUserService(UserService userService) {
		this.userService = userService;
	}

}
