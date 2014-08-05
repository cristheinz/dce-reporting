package com.bapop.dce.web;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bapop.batch.dce.balan.BatchBalan;
import com.bapop.dce.bo.AdjustListWrapper;
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
	
	@RequestMapping(value="/adjust/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody AdjustListWrapper data) throws Exception {
		try{
			List<Adjust> result= new ArrayList<Adjust>(0);
			for(Adjust a:data.getData()) {
				result.addAll(adjustService.create(a));
			}
			//List<Adjust> result = adjustService.create(data.getData());

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to create Adjust.");
		}
	}

	@RequestMapping(value="/adjust/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody AdjustListWrapper data) throws Exception {
		try{
			List<Adjust> result= new ArrayList<Adjust>(0);
			for(Adjust a:data.getData()) {
				result.addAll(adjustService.update(a));
			}
			//List<Adjust> result = adjustService.update(data.getData());

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to update Adjust.");
		}
	}

	@RequestMapping(value="/adjust/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody AdjustListWrapper data) throws Exception {
		try{
			for(Adjust a:data.getData()) {
				adjustService.delete(a);
			}
			//adjustService.delete(data.getData());

			return ExtJSReturn.mapOK();

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to delete Adjust.");
		}
	}
	
	@RequestMapping(value="/adjust/adjust.action")
	public @ResponseBody Map<String,? extends Object> load(@RequestParam("anomes") String anomes) throws Exception {
		try {
			//System.out.println("-->"+anomes);
			//adjustService.runAdjusts(anomes);
			
			if(anomes.length()!=6)
				return ExtJSReturn.mapError("Error applying Adjusts:<br/> Invalid anomes length!");
			try {  
			    Integer.parseInt(anomes);  
			} catch(Exception e) {  
				return ExtJSReturn.mapError("Error applying Adjusts:<br/> Invalid anomes!");
			}  
			
			BatchBalan b=new BatchBalan();
			if(b.adjBalan(anomes)>0)
				return ExtJSReturn.mapError("Error applying Adjusts:<br/> Procedure error!");
			
			
			return ExtJSReturn.mapOK();

		} catch (Exception e) {
			System.out.println(e);
			return ExtJSReturn.mapError("Error applying Adjust into database.");
		}
	}
	
	@Autowired
	public void setAdjustService(AdjustService adjustService) {
		this.adjustService = adjustService;
	}
}
