package com.bapop.dce.web;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bapop.dce.bo.DashBoardBean;
import com.bapop.dce.service.PosfmbService;
import com.bapop.dce.util.ExtJSReturn;

@Controller
public class PosfmbController {
	private PosfmbService posfmbService;

	@RequestMapping(value="/posfmb/view.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam("anomes") String anomes) throws Exception {
		try {
			List<Object[]> l = posfmbService.view(anomes);
			List<DashBoardBean> result=new ArrayList<DashBoardBean>();
            
            for(Object[] o:l) {
            	String cta=o[0].toString();
            	BigDecimal val=new BigDecimal(o[1].toString());
            	BigDecimal val1=new BigDecimal(o[2].toString());
            	BigDecimal val2=new BigDecimal(o[3].toString());
            	BigDecimal val3=new BigDecimal(o[4].toString());
            	BigDecimal valh=new BigDecimal(o[5].toString());
            	result.add(new DashBoardBean(cta,val,val1,val2,val3,valh));
            }
			
			return ExtJSReturn.mapOK(result,result.size());
			
		} catch (Exception e) {
			return ExtJSReturn.mapError("Error retrieving DashBoard Data from database.");
		}
	}

	@Autowired
	public void setPosfmbService(PosfmbService posfmbService) {
		this.posfmbService = posfmbService;
	}

}
