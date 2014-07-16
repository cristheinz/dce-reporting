package com.bapop.dce.web;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bapop.batch.dce.BatchDce;
import com.bapop.dce.model.Balan;
import com.bapop.dce.service.BalanService;
import com.bapop.dce.util.ExtJSReturn;

@Controller
public class BalanController {
	private BalanService balanService;

	@RequestMapping(value="/balan/tree.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam("anomes") String anomes, @RequestParam("node") String node) throws Exception {
		try {
			int ym=Integer.parseInt(anomes);
			String n="0";
			//int n=0;
			if(!node.equals("root") && node!=null && !node.equals("NaN")) 
				//n=Integer.parseInt(node);
				n=node;
			//System.out.println(ym+";"+n);
			List<Balan> result = balanService.getBalanNodes(ym, n);

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			//System.out.println(e);
			return ExtJSReturn.mapError("Error retrieving Balan from database.");
		}
	}
	
	@RequestMapping(value="/balan/load.action")
	public @ResponseBody Map<String,? extends Object> load(@RequestParam("name") String name,@RequestParam("id") String id) throws Exception {
		try {
			//int fileId=Integer.parseInt(id);
			//System.out.println(fileId);
			
			String anomes=name.split("_")[0];
			if(anomes.length()!=6)
				return ExtJSReturn.mapError("Error loading Balan into database. Invalid anomes length!");
			try {  
			    Integer.parseInt(anomes);  
			} catch(Exception e) {  
				return ExtJSReturn.mapError("Error loading Balan into database. Invalid anomes!");
			}  

			balanService.delete(anomes);
			BatchDce b=new BatchDce();
			b.bulkBalan(id);
			balanService.recalculateTotals(anomes);

			return ExtJSReturn.mapOK();

		} catch (Exception e) {
			System.out.println(e);
			return ExtJSReturn.mapError("Error loading Balan into database.");
		}
	}

	@Autowired
	public void setBalanService(BalanService balanService) {
		this.balanService = balanService;
	}
}
