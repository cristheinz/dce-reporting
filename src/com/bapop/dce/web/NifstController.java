package com.bapop.dce.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bapop.dce.model.Nifst;
import com.bapop.dce.model.Report;
import com.bapop.dce.service.NifstService;
import com.bapop.dce.util.ExtJSReturn;

@Controller
public class NifstController {
	private NifstService nifstService;
	@Autowired
	public void setPapelService(NifstService nifstService) {
		this.nifstService = nifstService;
	}
	
	@RequestMapping(value="/nifst/search.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam("node") String node) throws Exception {
		try {
			List<Nifst> result = nifstService.getList(node);

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error retrieving Nifst from database.");
		}
	}
	
	@RequestMapping(value="/nifst/list.action")
	public @ResponseBody Map<String,? extends Object> getFiles(HttpSession session) throws Exception {
		try {
			List<Nifst> result = nifstService.getList();

			
			return ExtJSReturn.mapOK(result,result.size());
			
		} catch (Exception e) {
			System.out.println(e);
			return ExtJSReturn.mapError("Error retrieving Nifst from database.");
		}
	}

	/*
	@RequestMapping(value="/nifst/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody NifstWrapper data) throws Exception {
		try{
			
			List<Nifst> result = nifstService.create(data.getData());

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to create Nifst.");
		}
	}

	@RequestMapping(value="/nifst/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody NifstWrapper data) throws Exception {
		try{
			
			List<Nifst> result = nifstService.update(data.getData());

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to update Nifst.");
		}
	}


	@RequestMapping(value="/nifst/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody NifstWrapper data) throws Exception {
		try{
			nifstService.delete(data.getData());

			return ExtJSReturn.mapOK();

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to delete Nifst.");
		}
	}
	 */
}
