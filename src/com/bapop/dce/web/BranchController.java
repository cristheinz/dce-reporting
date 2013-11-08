package com.bapop.dce.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bapop.dce.bo.BranchWrapper;
import com.bapop.dce.model.Branch;
import com.bapop.dce.service.BranchService;
import com.bapop.dce.util.ExtJSReturn;

@Controller
public class BranchController {
	private BranchService branchService;

	@RequestMapping(value="/branch/view.action")
	public @ResponseBody Map<String,? extends Object> view() throws Exception {

		try{

			List<Branch> result = branchService.getBranchList();

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error retrieving Branchs from database.");
		}
	}

	@RequestMapping(value="/branch/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestParam Object data) throws Exception {

		try{

			List<Branch> result = branchService.create(data);

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to create Branch.");
		}
	}

	@RequestMapping(value="/branch/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody BranchWrapper data) throws Exception {
		try{
			
			List<Branch> result = branchService.update(data.getData());

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to update Branch.");
		}
	}

	@RequestMapping(value="/branch/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestParam Object data) throws Exception {

		try{

			branchService.delete(data);

			/*Map<String,Object> modelMap = new HashMap<String,Object>(3);
			modelMap.put("success", true);

			return modelMap;*/
			
			return ExtJSReturn.mapOK();

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to delete Branch.");
		}
	}

	@Autowired
	public void setBranchService(BranchService branchService) {
		this.branchService = branchService;
	}
}