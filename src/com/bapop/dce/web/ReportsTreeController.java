package com.bapop.dce.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bapop.dce.model.Report;
import com.bapop.dce.service.ReportService;

@Controller
public class ReportsTreeController {
	private ReportService reportService;

	@RequestMapping(value="/report/tree.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam("node") String node) throws Exception {
		//System.out.println("node: "+node);

		try{
			/*Report root=new Report();
			root.setId(1);
			root.setLeaf(false);
			root.setText("root");
			Report folder=new Report();
			folder.setId(2);
			folder.setLeaf(false);
			folder.setText("folder");
			Report item=new Report();
			item.setId(3);
			item.setLeaf(true);
			item.setText("item");
			item.setCls("http://10.84.4.118:8181/birt/frameset?__report=PCplafonds.rptdesign&amp;p0=&__format=pdf");
			Report ritem=new Report();
			ritem.setId(4);
			ritem.setLeaf(true);
			ritem.setText("folder item");
			ritem.setCls("http://10.84.4.118:8181/birt/frameset?__report=PCplafonds.rptdesign&amp;p0=");
	
			List<Report> tree = new ArrayList<Report>();
			
			if(node.equals("root")) {
				tree.add(item);
				tree.add(folder);
			} else {
				tree.add(ritem);
			}*/
			
			int n=0;
			if(!node.equals("root")) n=Integer.parseInt(node);
			
			List<Report> reports = reportService.getReportList(n);

			return getMap(reports);
			
			//return getMap(tree);

		} catch (Exception e) {

			return getModelMapError("Error retrieving Branchs from database.");
		}
	}
/*
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
	public @ResponseBody Map<String,? extends Object> update(@RequestParam Object data) throws Exception {
		try{

			List<Branch> Branchs = branchService.update(data);

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
*/
	/**
	 * Generates modelMap to return in the modelAndView
	 * @param branches
	 * @return
	 */
/*	private Map<String,Object> getMap(List<Branch> branches){

		Map<String,Object> modelMap = new HashMap<String,Object>(3);
		modelMap.put("total", branches.size());
		modelMap.put("branches", branches);
		modelMap.put("success", true);

		return modelMap;
	}
*/
	private Map<String,Object> getMap(List<Report> tree){

	Map<String,Object> modelMap = new HashMap<String,Object>(3);
	modelMap.put("total", tree.size());
	modelMap.put("tree", tree);
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
	public void setReportService(ReportService reportService) {
		this.reportService = reportService;
	}
}
