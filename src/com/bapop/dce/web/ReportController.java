package com.bapop.dce.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bapop.dce.bo.ReportTreeItem;
import com.bapop.dce.service.ReportService;
import com.bapop.dce.util.ExtJSReturn;

@Controller
public class ReportController {
	private ReportService reportService;

	@RequestMapping(value="/report/tree.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam("node") String node, HttpSession session) throws Exception {
		try {
			int n=0;
			if(!node.equals("root")) 
				n=Integer.parseInt(node);
			
			String val="rec-ori";
			if (session.getAttribute("reportList")==null) {
				session.setAttribute("reportList", val);
			} else {
				val=session.getAttribute("reportList").toString();
			}
			
			List<ReportTreeItem> result = reportService.getReportList(n,val);

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			e.printStackTrace();
			return ExtJSReturn.mapError("Error retrieving Reports from database.");
		}
	}
	
	@RequestMapping(value="/report/change.action")
	public @ResponseBody Map<String,? extends Object> change(@RequestParam("val") String order, HttpSession session) throws Exception {
		try {
			System.out.println(order);
			session.setAttribute("reportList", order);
			
			return ExtJSReturn.mapOK();

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error changing Report order from database.");
		}
	}

	@Autowired
	public void setReportService(ReportService reportService) {
		this.reportService = reportService;
	}
}
