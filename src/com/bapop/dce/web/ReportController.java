package com.bapop.dce.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bapop.dce.model.Report;
import com.bapop.dce.service.ReportService;
import com.bapop.dce.util.ExtJSReturn;

@Controller
public class ReportController {
	private ReportService reportService;

	@RequestMapping(value="/report/tree.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam("node") String node) throws Exception {
		try {
			int n=0;
			if(!node.equals("root")) 
				n=Integer.parseInt(node);
			
			List<Report> result = reportService.getReportList(n);

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error retrieving Reports from database.");
		}
	}

	@Autowired
	public void setReportService(ReportService reportService) {
		this.reportService = reportService;
	}
}
