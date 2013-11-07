package com.bapop.dce.web;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class ApplicationController {
	
	@RequestMapping(value="/home.action")
    public ModelAndView home(HttpSession session) throws Exception {

		if (session.getAttribute("userID")==null) {
			return new ModelAndView("login");
        } else {
        	return new ModelAndView("home");
        }
            
    }
	
	@RequestMapping(value="/signout.action")
	public ModelAndView logout(HttpSession session) {
        session.setAttribute("userID", null);
        return new ModelAndView(new RedirectView(""));
        //return new ModelAndView("login");
	}

}
