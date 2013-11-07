package com.bapop.dce.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bapop.dce.model.PosfmbTO;
import com.bapop.dce.service.PosfmbService;

@Controller
public class PosfmbController {
	private PosfmbService posfmbService;

	@RequestMapping(value="/posfmb/view.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam("anomes") String anomes) throws Exception {
		try{
			return getMap(posfmbService.view(anomes));
			
		} catch (Exception e) {

			return getModelMapError("Error retrieving DashBoard Data from database.");
		}
	}
	/**
	 * Generates modelMap to return in the modelAndView
	 * @param branches
	 * @return
	 */
	private Map<String,Object> getMap(List<PosfmbTO> to){

		Map<String,Object> modelMap = new HashMap<String,Object>(1);
		modelMap.put("total", to.size());
		modelMap.put("dash", to);
		modelMap.put("success", true);

		return modelMap;
	}
	/**
	 * Generates modelMap to return in the modelAndView in case
	 * of exception
	 * @param msg message
	 * @return
	 */
	private Map<String,Object> getModelMapError(String msg){

		Map<String,Object> modelMap = new HashMap<String,Object>(2);
		modelMap.put("message", msg);
		modelMap.put("success", false);

		return modelMap;
	} 

	@Autowired
	public void setPosfmbService(PosfmbService posfmbService) {
		this.posfmbService = posfmbService;
	}

}
