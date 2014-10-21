package com.bapop.dce.web;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.bapop.dce.bo.AuthBean;
import com.bapop.dce.model.User;
import com.bapop.dce.model.UserAuth;
import com.bapop.dce.model.UserLog;
import com.bapop.dce.service.UserAuthService;
import com.bapop.dce.service.UserLogService;
import com.bapop.dce.service.UserService;
import com.bapop.dce.util.ExtJSReturn;

@Controller
public class AuthenticationController {
	private UserService userService;
	private UserAuthService userAuthService;
	private UserLogService userLogService;
	
	@RequestMapping(value="/home.action")
    public ModelAndView home(HttpSession session) throws Exception {
		//System.out.println(session.isNew());
		if(session.isNew())
			session.setMaxInactiveInterval(60 * 15);//15 min
		if (session.getAttribute("userID")==null) {
			session.setMaxInactiveInterval(5);//5 sec
			return new ModelAndView("login");
        } else {
        	return new ModelAndView("home");
        }
            
    }
	
	@RequestMapping(value="/signin.action")
	public @ResponseBody Map<String,? extends Object> signin(@RequestParam("loginPassword") String password, HttpSession session) throws Exception {
		try {
			//System.out.println(session.isNew());
			String ipAddress = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes())
			           .getRequest().getHeader("X-FORWARDED-FOR");  
			if (ipAddress == null) {
				ipAddress = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes())
						.getRequest().getRemoteAddr();  
			}
			//System.out.println("ip: "+ipAddress);
			//System.out.println("MaxInactiveInterval: "+session.getMaxInactiveInterval());
			List<User> l=userService.signin(password);
			if(l.size()==0) 
				return ExtJSReturn.mapError("ID de acesso incorreto.");
			User user = l.get(0);
			session.setAttribute("userID", user.getId());
			session.setAttribute("userName", user.getName());
			session.setMaxInactiveInterval(60 * 60 * 12);//12 h
			user.setLastAccess(new Date());
			user.setLastIpAddress(ipAddress);
			userService.update(user);
			userLogService.save(new UserLog(user.getId(),0,ipAddress+":"+session.getId()));
			return ExtJSReturn.mapOK();
			
		} catch (Exception e) {
			return ExtJSReturn.mapError("Error retrieving User from database.");
		}
	}
	
	@RequestMapping(value="/signout.action")
	public ModelAndView logout(HttpSession session) {
		String ipAddress = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes())
		           .getRequest().getHeader("X-FORWARDED-FOR");  
		if (ipAddress == null) {
			ipAddress = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes())
					.getRequest().getRemoteAddr();  
		}
		userLogService.save(new UserLog((int)session.getAttribute("userID"),1,ipAddress+":"+session.getId()));
		
        session.setAttribute("userID", null);
        session.removeAttribute("userName");
        session.invalidate();
        
        return new ModelAndView(new RedirectView(""));
        //return new ModelAndView("login");
	}
	
	@RequestMapping(value="/auth.action")
	public @ResponseBody Map<String,? extends Object> auth(HttpSession session) throws Exception {
		try{
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			List<AuthBean> result=new ArrayList<AuthBean>();
			List<UserAuth> list= userAuthService.getList(id);
			for(UserAuth a:list){
				//System.out.println(id+";"+a.getAuth());
				result.add(new AuthBean(a.getAuth()));
			}
			/*
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
			}*/
			
			return ExtJSReturn.mapOK(result,result.size());
			
		} catch (Exception e) {
			return ExtJSReturn.mapError("Error retrieving Auth from database.");
		}
	}
	
	@Autowired
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	@Autowired
	public void setUserAuthService(UserAuthService userAuthService) {
		this.userAuthService = userAuthService;
	}
	@Autowired
	public void setUserLogService(UserLogService service) {
		this.userLogService = service;
	}

}
