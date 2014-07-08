package com.bapop.dce.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bapop.dce.bo.PapelWrapper;
import com.bapop.dce.model.Papel;
import com.bapop.dce.service.PapelService;
import com.bapop.dce.util.ExtJSReturn;

@Controller
public class PapelController {
	private PapelService papelService;
	@Autowired
	public void setPapelService(PapelService papelService) {
		this.papelService = papelService;
	}
	
	@RequestMapping(value="/papel/list.action")
	public @ResponseBody Map<String,? extends Object> getFiles(HttpSession session) throws Exception {
		try {
			List<Papel> result = papelService.getList();

			
			return ExtJSReturn.mapOK(result,result.size());
			
		} catch (Exception e) {
			System.out.println(e);
			return ExtJSReturn.mapError("Error retrieving Papel from database.");
		}
	}

	@RequestMapping(value="/papel/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody PapelWrapper data) throws Exception {
		try{
			
			List<Papel> result = papelService.create(data.getData());

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to create Papel.");
		}
	}

	@RequestMapping(value="/papel/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody PapelWrapper data) throws Exception {
		try{
			
			List<Papel> result = papelService.update(data.getData());

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to update Papel.");
		}
	}

	@RequestMapping(value="/papel/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody PapelWrapper data) throws Exception {
		try{
			papelService.delete(data.getData());

			return ExtJSReturn.mapOK();

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to delete Papel.");
		}
	}
}
