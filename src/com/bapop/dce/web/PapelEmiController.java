package com.bapop.dce.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bapop.dce.bo.PapelEmiWrapper;
import com.bapop.dce.model.PapelEmi;
import com.bapop.dce.service.PapelEmiService;
import com.bapop.dce.util.ExtJSReturn;

@Controller
public class PapelEmiController {
	private PapelEmiService papelEmiService;
	@Autowired
	public void setPapelService(PapelEmiService papelEmiService) {
		this.papelEmiService = papelEmiService;
	}
	
	@RequestMapping(value="/papelEmi/lista.action")
	public @ResponseBody Map<String,? extends Object> getFiles(HttpSession session) throws Exception {
		try {
			List<PapelEmi> result = papelEmiService.getList();

			
			return ExtJSReturn.mapOK(result,result.size());
			
		} catch (Exception e) {
			System.out.println(e);
			return ExtJSReturn.mapError("Error retrieving PapelEmi from database.");
		}
	}
	@RequestMapping(value="/papelEmi/list.action")
	public @ResponseBody Map<String,? extends Object> getFiles(HttpSession session,@RequestParam("papelId") int papelId) throws Exception {
		try {
			List<PapelEmi> result = papelEmiService.getList(papelId);

			
			return ExtJSReturn.mapOK(result,result.size());
			
		} catch (Exception e) {
			System.out.println(e);
			return ExtJSReturn.mapError("Error retrieving PapelEmi from database.");
		}
	}

	@RequestMapping(value="/papelEmi/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody PapelEmiWrapper data) throws Exception {
		try{
			
			List<PapelEmi> result = papelEmiService.create(data.getData());

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to create PapelEmi.");
		}
	}

	@RequestMapping(value="/papelEmi/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody PapelEmiWrapper data) throws Exception {
		try{
			
			List<PapelEmi> result = papelEmiService.update(data.getData());

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to update PapelEmi.");
		}
	}

	@RequestMapping(value="/papelEmi/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody PapelEmiWrapper data) throws Exception {
		try{
			papelEmiService.delete(data.getData());

			return ExtJSReturn.mapOK();

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to delete PapelEmi.");
		}
	}
}
