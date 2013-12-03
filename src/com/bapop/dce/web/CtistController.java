package com.bapop.dce.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bapop.dce.bo.CtistWrapper;
import com.bapop.dce.model.Ctist;
import com.bapop.dce.service.CtistService;
import com.bapop.dce.util.ExtJSReturn;

@Controller
public class CtistController {
	private CtistService ctistService;
	@Autowired
	public void setCtistService(CtistService ctistService) {
		this.ctistService = ctistService;
	}
	
	@RequestMapping(value="/cti/list.action")
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
			
			List<Ctist> result = ctistService.getList();

			
			return ExtJSReturn.mapOK(result,result.size());
			
		} catch (Exception e) {
			System.out.println(e);
			return ExtJSReturn.mapError("Error retrieving Ctis from database.");
		}
	}
	
	@RequestMapping(value="/cti/create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody CtistWrapper data) throws Exception {
		try{
			
			List<Ctist> result = ctistService.create(data.getData());

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to create Ctist.");
		}
	}

	@RequestMapping(value="/cti/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody CtistWrapper data) throws Exception {
		try{
			
			List<Ctist> result = ctistService.update(data.getData());

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to update Ctist.");
		}
	}
	
	@RequestMapping(value="/cti/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody CtistWrapper data) throws Exception {
		try{
			ctistService.delete(data.getData());

			return ExtJSReturn.mapOK();

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to delete Ctist.");
		}
	}

}
