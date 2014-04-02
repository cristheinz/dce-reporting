package com.bapop.dce.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bapop.dce.model.Adjust;
import com.bapop.dce.service.AdjustService;
import com.bapop.dce.util.ExtJSReturn;

@Controller
public class AdjustController {
	private AdjustService adjustService;

	@RequestMapping(value="/adjust/view.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam("anomes") String anomes) throws Exception {
		try {
			int ym=Integer.parseInt(anomes);
			List<Adjust> result = adjustService.getAdjusts(ym);

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			//System.out.println(e);
			return ExtJSReturn.mapError("Error retrieving Adjust from database.");
		}
	}
	
	@Autowired
	public void setAdjustService(AdjustService adjustService) {
		this.adjustService = adjustService;
	}
}
