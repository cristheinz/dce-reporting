package com.bapop.dce.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bapop.dce.bo.BonifWrapper;
import com.bapop.dce.model.Bonif;
import com.bapop.dce.service.BonifService;
import com.bapop.dce.util.ExtJSReturn;

@Controller
public class BonifController {
	private BonifService bonifService;

	@RequestMapping(value="/bonif/view.action")
	public @ResponseBody Map<String,? extends Object> view() throws Exception {

		try{

			List<Bonif> result = bonifService.getBonifList();

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error retrieving Bonifs from database.");
		}
	}
	
	@RequestMapping(value="/bonif/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody BonifWrapper data) throws Exception {
		try{
			List<Bonif> result = bonifService.update(data.getData());

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to update Bonif.");
		}
	}


	@Autowired
	public void setBonifService(BonifService bonifService) {
		this.bonifService = bonifService;
	}
}