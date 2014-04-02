package com.bapop.dce.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bapop.dce.model.Ctvst;
import com.bapop.dce.service.CtvstService;
import com.bapop.dce.util.ExtJSReturn;

@Controller
public class CtvstController {
	private CtvstService ctvstService;

	@RequestMapping(value="/ctvst/view.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam("anomes") String anomes) throws Exception {
		try {
			int ym=Integer.parseInt(anomes);
			List<Ctvst> result = ctvstService.getCtvs(ym);

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			//System.out.println(e);
			return ExtJSReturn.mapError("Error retrieving Ctvst from database.");
		}
	}
	
	@Autowired
	public void setCtvstService(CtvstService ctvstService) {
		this.ctvstService = ctvstService;
	}
}
