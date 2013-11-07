package com.bapop.dce.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bapop.dce.model.Branch;
import com.bapop.dce.model.BranchWrapper;
import com.bapop.dce.service.BranchService;

@Controller
public class BranchController {
	private BranchService branchService;

	@RequestMapping(value="/branch/view.action")
	public @ResponseBody Map<String,? extends Object> view() throws Exception {

		try{

			List<Branch> Branchs = branchService.getBranchList();

			return getMap(Branchs);

		} catch (Exception e) {

			return getModelMapError("Error retrieving Branchs from database.");
		}
	}

	@RequestMapping(value="/branch/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestParam Object data) throws Exception {

		try{

			List<Branch> Branchs = branchService.create(data);

			return getMap(Branchs);

		} catch (Exception e) {

			return getModelMapError("Error trying to create Branch.");
		}
	}

	@RequestMapping(value="/branch/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody BranchWrapper data) throws Exception {
		try{
			
			List<Branch> Branchs = branchService.update(data.getData());

			return getMap(Branchs);

		} catch (Exception e) {

			return getModelMapError("Error trying to update Branch.");
		}
	}

	@RequestMapping(value="/branch/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestParam Object data) throws Exception {

		try{

			branchService.delete(data);

			Map<String,Object> modelMap = new HashMap<String,Object>(3);
			modelMap.put("success", true);

			return modelMap;

		} catch (Exception e) {

			return getModelMapError("Error trying to delete Branch.");
		}
	}

	/**
	 * Generates modelMap to return in the modelAndView
	 * @param branches
	 * @return
	 */
	private Map<String,Object> getMap(List<Branch> branches){

		Map<String,Object> modelMap = new HashMap<String,Object>(3);
		modelMap.put("total", branches.size());
		modelMap.put("branches", branches);
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
	public void setBranchService(BranchService branchService) {
		this.branchService = branchService;
	}
}
