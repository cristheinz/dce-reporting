package com.bapop.dce.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bapop.batch.dce.corep.BatchCorep;
import com.bapop.batch.dce.fgd.BatchFgd;
import com.bapop.batch.dce.posfm2.BatchPosfm2;
import com.bapop.dce.bo.BatchJobExecutionWrapper;
import com.bapop.dce.model.BatchJobExecution;
import com.bapop.dce.model.BatchStepExecution;
import com.bapop.dce.model.Note;
import com.bapop.dce.service.BatchExecutionService;
import com.bapop.dce.service.NoteService;
import com.bapop.dce.util.ExtJSReturn;

@Controller
@RequestMapping("/admin/**")
public class AdminController {
	private final static int admin=2;
	private final static int pinginterval=60000;//nenhum job assincrono vai demorar menos q 1min
	
	private NoteService noteService;
	private BatchExecutionService batchExecutionService;
	
	@Autowired
	public void setNotesService(NoteService service) {
		this.noteService = service;
	}
	@Autowired
	public void setBatchExecutionService(BatchExecutionService service) {
		this.batchExecutionService = service;
	}
	
	@RequestMapping("systemalert.action")
    public @ResponseBody String sendMessage(HttpServletResponse response,HttpSession session/*,@RequestParam int id*/) {
		try {
			int userid=(int)session.getAttribute("userID");
			int id=0;
			//id++;
			//System.out.println(id);
			
			response.setContentType("text/event-stream");
	        response.setHeader("Cache-Control", "no-cache");
	        
			List<Note> notes = noteService.getListByUser(userid);
			String s="";
			for(Note note:notes) {
				if(note.getStatus()==0) {
					s+=note.getDti()+": "+note.getMsg()+"<br />";
		            /*return "retry: 10000\n"+
	            			"id: "+id+"\n"+
	                        "data: {\"msg\": \""+note.getMsg()+"\"}\n\n";*/
				}
				note.setStatus(1);
				noteService.update(note);
				id=note.getId();
			}
			if(!s.isEmpty()){
				/*System.out.println("retry: 60000\n"
						+ "id: "+id+"\n"
						+ "data: {\"msg\": \""
						+s
						+"\"}\n\n");*/
				return "retry: "+pinginterval+"\n"
						+ "id: "+id+"\n"
						+ "data: {\"msg\": \""
						+s
						+"\"}\n\n";
			} else {
				return "retry: "+pinginterval+"\n\n";
			}
		} catch (Exception e) {
			//e.printStackTrace();
			return "Error on systemalert.";
		}
		
    }
	
	
	@RequestMapping(value="runcorep.action")
	public @ResponseBody Map<String,? extends Object> runCorep(HttpSession session,@RequestParam("anomes") String anomes) throws Exception {
		try {
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			if(id!=admin)
				return ExtJSReturn.mapError("Not authorized.");
			
			//System.out.println(anomes);
			BatchCorep b=new BatchCorep();
			b.bulkCorep(anomes);

			return ExtJSReturn.mapOK();

		} catch (Exception e) {
			//e.printStackTrace();
			return ExtJSReturn.mapError("Error trying to run COREP Batch.");
		}
	}

	@RequestMapping(value="runposfm.action")
	public @ResponseBody Map<String,? extends Object> runPosfm(HttpSession session,@RequestParam("anomes") String anomes) throws Exception {
		try {
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			if(id!=admin)
				return ExtJSReturn.mapError("Not authorized.");
			
			//System.out.println(anomes);
			BatchPosfm2 b=new BatchPosfm2();
			b.bulkPosfm(anomes);

			return ExtJSReturn.mapOK();

		} catch (Exception e) {
			//e.printStackTrace();
			return ExtJSReturn.mapError("Error trying to run POSFM Batch.");
		}
	}

	@RequestMapping(value="runcapital.action")
	public @ResponseBody Map<String,? extends Object> runCapital(HttpSession session,@RequestParam("anomes") String anomes) throws Exception {
		try {
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			if(id!=admin)
				return ExtJSReturn.mapError("Not authorized.");
			
			//System.out.println(anomes);
			BatchPosfm2 b=new BatchPosfm2();
			b.bulkCapital(anomes);

			return ExtJSReturn.mapOK();

		} catch (Exception e) {
			//e.printStackTrace();
			return ExtJSReturn.mapError("Error trying to run POSFM Batch.");
		}
	}

	@RequestMapping(value="runfgd.action")
	public @ResponseBody Map<String,? extends Object> runFgd(HttpSession session,@RequestParam("anomes") String anomes) throws Exception {
		try {
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			if(id!=admin)
				return ExtJSReturn.mapError("Not authorized.");
			
			//System.out.println(anomes);
			BatchFgd b=new BatchFgd();
			b.bulkFgd(anomes);

			return ExtJSReturn.mapOK();

		} catch (Exception e) {
			//e.printStackTrace();
			return ExtJSReturn.mapError("Error trying to run POSFM Batch.");
		}
	}

	@RequestMapping(value="/deleteJobExecutionEntry.action")
	public @ResponseBody Map<String,? extends Object> deleteJobs(HttpSession session,@RequestBody BatchJobExecutionWrapper data) throws Exception {
		try{
			int user=Integer.parseInt(session.getAttribute("userID").toString());
			if(user!=admin)
				return ExtJSReturn.mapError("Not authorized.");
			batchExecutionService.deleteJobExecution(data.getData());

			return ExtJSReturn.mapOK();

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to delete Job Execution Entry.");
		}
	}
	
	@RequestMapping(value="listExecutedJobs.action")
	public @ResponseBody Map<String,? extends Object> getJobs(HttpSession session) throws Exception {
		try {
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			if(id!=admin)
				return ExtJSReturn.mapError("Not authorized.");
			
			List<BatchJobExecution> result=batchExecutionService.listExecutedJobs();
			
			return ExtJSReturn.mapOK(result,result.size());
			
		} catch (Exception e) {
			//e.printStackTrace();
			return ExtJSReturn.mapError("Error retrieving ExecutedJobs from database.");
		}
	}

	@RequestMapping(value="listExecutedSteps.action")
	public @ResponseBody Map<String,? extends Object> getSteps(HttpSession session,@RequestParam("jobid") int jobid) throws Exception {
		try {
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			if(id!=admin)
				return ExtJSReturn.mapError("Not authorized.");
			
			List<BatchStepExecution> result=batchExecutionService.listExecutedSteps(jobid);
			
			return ExtJSReturn.mapOK(result,result.size());
			
		} catch (Exception e) {
			//e.printStackTrace();
			return ExtJSReturn.mapError("Error retrieving ExecutedSteps from database.");
		}
	}

}
