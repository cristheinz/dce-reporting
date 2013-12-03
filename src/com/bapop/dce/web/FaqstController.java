package com.bapop.dce.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bapop.dce.bo.FaqstWrapper;
import com.bapop.dce.model.Faqst;
import com.bapop.dce.service.FaqstService;
import com.bapop.dce.util.ExtJSReturn;

@Controller
public class FaqstController {
	private FaqstService faqstService;
	@Autowired
	public void setFaqstService(FaqstService faqstService) {
		this.faqstService = faqstService;
	}
	
	@RequestMapping(value="/faq/list.action")
	public @ResponseBody Map<String,? extends Object> getFiles(HttpSession session) throws Exception {
		try {
			/*List<Faqst> list = faqstService.getList();
			
			List<FaqstBean> result = new ArrayList<FaqstBean>();
			
			for(Faqst f: list){
				List<CtistBean> ncs  = new ArrayList<CtistBean>();
				List<Ctist> cs =f.getCtis();
				for(Ctist c: cs) {
					ncs.add(new CtistBean(c.getId(),c.getCt2(),c.getInd(),f.getId()));
				}
				FaqstBean b=new FaqstBean();
				b.setId(f.getId());
				b.setComiss(f.getComiss());
				b.setTag(f.getTag());
				b.setTxt(f.getTxt());
				b.setCtis(ncs);
				result.add(b);
			}*/
			
			List<Faqst> result = faqstService.getList();

			
			return ExtJSReturn.mapOK(result,result.size());
			
		} catch (Exception e) {
			System.out.println(e);
			return ExtJSReturn.mapError("Error retrieving Faqs from database.");
		}
	}

	@RequestMapping(value="/faq/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody FaqstWrapper data) throws Exception {
		try{
			
			List<Faqst> result = faqstService.create(data.getData());

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to create Faqst.");
		}
	}

	@RequestMapping(value="/faq/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody FaqstWrapper data) throws Exception {
		try{
			
			List<Faqst> result = faqstService.update(data.getData());

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to update Faqst.");
		}
	}


	@RequestMapping(value="/faq/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody FaqstWrapper data) throws Exception {
		try{
			faqstService.delete(data.getData());

			return ExtJSReturn.mapOK();

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to delete Faqst.");
		}
	}

}
