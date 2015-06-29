package com.bapop.dce.web;

import java.util.Date;
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

import com.bapop.batch.dce.bonif.BatchBonif;
import com.bapop.batch.dce.corep.BatchCorep;
import com.bapop.batch.dce.fgd.BatchFgd;
import com.bapop.batch.dce.posfm2.BatchPosfm2;
import com.bapop.dce.bo.BatchJobExecutionWrapper;
import com.bapop.dce.model.BatchJobExecution;
import com.bapop.dce.model.BatchStepExecution;
import com.bapop.dce.model.Note;
import com.bapop.dce.model.User;
import com.bapop.dce.model.UserLog;
import com.bapop.dce.service.ApplicationMailer;
import com.bapop.dce.service.BatchExecutionService;
import com.bapop.dce.service.NoteService;
import com.bapop.dce.service.UserLogService;
import com.bapop.dce.service.UserService;
import com.bapop.dce.util.ExtJSReturn;

@Controller
@RequestMapping("/admin/**")
public class AdminController {
	private final static int master=2;
	private final static int pinginterval=60000;//nenhum job assincrono vai demorar menos q 1min
	
	private NoteService noteService;
	private UserService userService;
	private UserLogService userLogService;
	private BatchExecutionService batchExecutionService;
	
	@Autowired
	public void setNotesService(NoteService service) {
		this.noteService = service;
	}
	@Autowired
	public void setUserService(UserService service) {
		this.userService = service;
	}
	@Autowired
	public void setUserLogService(UserLogService service) {
		this.userLogService = service;
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
	
	@RequestMapping(value="log.action")
	public @ResponseBody Map<String,? extends Object> log(HttpSession session,@RequestParam("action") int action,@RequestParam("msg") String msg) throws Exception {
		try {
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			//System.out.println("user:"+id+";action:"+action+";msg:"+msg+";dt:"+new Date());
			UserLog log = new UserLog(id,action,msg);
			userLogService.save(log);

			return ExtJSReturn.mapOK();

		} catch (Exception e) {
			e.printStackTrace();
			return ExtJSReturn.mapError("Error trying to LOG user action.");
		}
	}
	
	
	@RequestMapping(value="runcorep.action")
	public @ResponseBody Map<String,? extends Object> runCorep(HttpSession session,
				@RequestParam("anomes") String anomes,
				@RequestParam("notify") String usercode) throws Exception {
		try {
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			if(!isAdmin(id))
				return ExtJSReturn.mapError("Not authorized.");
			
			//System.out.println(anomes);
			BatchCorep b=new BatchCorep();
			b.bulkCorep(anomes);

			//return ExtJSReturn.mapOK();

		} catch (Exception e) {
			e.printStackTrace();
			return ExtJSReturn.mapError("Error trying to run COREP Batch.");
		}
		
		if(!usercode.isEmpty()){
			notify(usercode,"Processado o COREP referente a "+anomes+".");
		}

		return ExtJSReturn.mapOK();
	}
	
	@RequestMapping(value="runfinrep.action")
	public @ResponseBody Map<String,? extends Object> runFinrep(HttpSession session,
				@RequestParam("anomes") String anomes,
				@RequestParam("notify") String usercode) throws Exception {
		try {
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			if(!isAdmin(id))
				return ExtJSReturn.mapError("Not authorized.");
			
			//System.out.println(anomes);
			BatchCorep b=new BatchCorep();
			b.bulkFinrep(anomes);

			//return ExtJSReturn.mapOK();

		} catch (Exception e) {
			e.printStackTrace();
			return ExtJSReturn.mapError("Error trying to run FINREP Batch.");
		}
		
		if(!usercode.isEmpty()){
			notify(usercode,"Processado o FINREP referente a "+anomes+".");
		}

		return ExtJSReturn.mapOK();
	}

	@RequestMapping(value="runposfm2.action")
	public @ResponseBody Map<String,? extends Object> runPosfm(HttpSession session,
				@RequestParam("anomes") String anomes,
				@RequestParam("notify") String usercode) throws Exception {
		try {
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			if(!isAdmin(id))
				return ExtJSReturn.mapError("Not authorized.");
			
			//System.out.println(anomes);
			BatchPosfm2 b=new BatchPosfm2();
			b.bulkPosfm(anomes);

			//return ExtJSReturn.mapOK();

		} catch (Exception e) {
			e.printStackTrace();
			return ExtJSReturn.mapError("Error trying to run POSFM2 Batch.");
		}
		
		if(!usercode.isEmpty()){
			notify(usercode,"Processada a Posicao de fim do mes referente a "+anomes+".");
		}

		return ExtJSReturn.mapOK();
	}

	@RequestMapping(value="runcapital.action")
	public @ResponseBody Map<String,? extends Object> runCapital(HttpSession session,
				@RequestParam("anomes") String anomes,
				@RequestParam("notify") String usercode) throws Exception {
		try {
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			if(!isAdmin(id))
				return ExtJSReturn.mapError("Not authorized.");
			
			//System.out.println(anomes);
			BatchPosfm2 b=new BatchPosfm2();
			b.bulkCapital(anomes);

			//return ExtJSReturn.mapOK();

		} catch (Exception e) {
			e.printStackTrace();
			return ExtJSReturn.mapError("Error trying to run POSFM2-CAPITAL Batch.");
		}
		
		if(!usercode.isEmpty()){
			notify(usercode,"Processada a Posicao de fim do mes (Capital) referente a "+anomes+".");
		}

		return ExtJSReturn.mapOK();
	}
	
	@RequestMapping(value="runbonif.action")
	public @ResponseBody Map<String,? extends Object> runBonif(HttpSession session,
				@RequestParam("anomes") String anomes,
				@RequestParam("notify") String usercode) throws Exception {
		try {
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			if(!isAdmin(id) && id!=3 && id!=7)
				return ExtJSReturn.mapError("Not authorized.");
			
			//System.out.println(anomes);
			BatchBonif b=new BatchBonif();
			b.bulkBonif(anomes);

			//return ExtJSReturn.mapOK();

		} catch (Exception e) {
			e.printStackTrace();
			return ExtJSReturn.mapError("Error trying to run BONIF Batch.");
		}
		
		if(!usercode.isEmpty()){
			notify(usercode,"Processado o ficheiro de bonificacao "+anomes+".");
		}

		return ExtJSReturn.mapOK();
	}
	
	@RequestMapping(value="runperio.action")
	public @ResponseBody Map<String,? extends Object> runPerio(HttpSession session,
				@RequestParam("anomes") String anomes,
				@RequestParam("notify") String usercode) throws Exception {
		try {
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			if(!isAdmin(id) && id!=3 && id!=7)
				return ExtJSReturn.mapError("Not authorized.");
			
			//System.out.println(anomes);
			BatchBonif b=new BatchBonif();
			b.bulkPerio(anomes,String.valueOf(id));

			//return ExtJSReturn.mapOK();

		} catch (Exception e) {
			e.printStackTrace();
			return ExtJSReturn.mapError("Error trying to run PERIO Batch.");
		}
		
		if(!usercode.isEmpty()){
			notify(usercode,"Processado o ficheiro de periodificacao "+anomes+".");
		}

		return ExtJSReturn.mapOK();
	}

	@RequestMapping(value="runcambi.action")
	public @ResponseBody Map<String,? extends Object> runCambi(HttpSession session,
				@RequestParam("anomes") String anomes,
				@RequestParam("notify") String usercode) throws Exception {
		try {
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			if(!isAdmin(id))
				return ExtJSReturn.mapError("Not authorized.");
			
			//System.out.println(anomes);
			BatchPosfm2 b=new BatchPosfm2();
			b.bulkCambi(anomes);

			//return ExtJSReturn.mapOK();

		} catch (Exception e) {
			e.printStackTrace();
			return ExtJSReturn.mapError("Error trying to run CAMBI Batch.");
		}
		
		//System.out.println(usercode);
		if(!usercode.isEmpty()){
			notify(usercode,"Processadas as taxas de cambio referentes a "+anomes+".");
		}

		return ExtJSReturn.mapOK();
	}

	@RequestMapping(value="runcrvcd.action")
	public @ResponseBody Map<String,? extends Object> runCrvcd(HttpSession session,
				@RequestParam("anomes") String anomes,
				@RequestParam("notify") String usercode) throws Exception {
		try {
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			if(!isAdmin(id))
				return ExtJSReturn.mapError("Not authorized.");
			
			BatchPosfm2 b=new BatchPosfm2();
			b.bulkCrvcd(anomes);

		} catch (Exception e) {
			e.printStackTrace();
			return ExtJSReturn.mapError("Error trying to run CRVCD Batch.");
		}
		
		//System.out.println(usercode);
		if(!usercode.isEmpty()){
			notify(usercode,"Processado o credito vencido referente a "+anomes+".");
		}

		return ExtJSReturn.mapOK();
	}

	@RequestMapping(value="runfgd.action")
	public @ResponseBody Map<String,? extends Object> runFgd(HttpSession session,
				@RequestParam("anomes") String anomes,
				@RequestParam("notify") String usercode) throws Exception {
		try {
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			if(!isAdmin(id))
				return ExtJSReturn.mapError("Not authorized.");
			
			//System.out.println(anomes);
			BatchFgd b=new BatchFgd();
			b.bulkFgd(anomes);

			//return ExtJSReturn.mapOK();

		} catch (Exception e) {
			e.printStackTrace();
			return ExtJSReturn.mapError("Error trying to run POSFM-FGD Batch.");
		}
		
		if(!usercode.isEmpty()){
			notify(usercode,"Processada a Posicao de fim do mes (FGD) referente a "+anomes+".");
		}

		return ExtJSReturn.mapOK();
	}

	@RequestMapping(value="/deleteJobExecutionEntry.action")
	public @ResponseBody Map<String,? extends Object> deleteJobs(HttpSession session,@RequestBody BatchJobExecutionWrapper data) throws Exception {
		try{
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			if(id!=master)
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
			/*int id=Integer.parseInt(session.getAttribute("userID").toString());
			if(!isAdmin(id))
				return ExtJSReturn.mapError("Not authorized.");*/
			
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
			/*int id=Integer.parseInt(session.getAttribute("userID").toString());
			if(!isAdmin(id))
				return ExtJSReturn.mapError("Not authorized.");*/
			
			List<BatchStepExecution> result=batchExecutionService.listExecutedSteps(jobid);
			
			return ExtJSReturn.mapOK(result,result.size());
			
		} catch (Exception e) {
			//e.printStackTrace();
			return ExtJSReturn.mapError("Error retrieving ExecutedSteps from database.");
		}
	}
	
	private boolean isAdmin(int userid) {
		boolean b=false;
		switch(userid) {
			case 2 : b=true; break;
			case 7 : b=true; break;
			case 23 : b=true; break;
			case 24 : b=true; break;
			case 25 : b=true; break;
			case 26 : b=true; break;
			case 27 : b=true; break;
			default : b=false; break;
		}
		return b;
	}
	
	
	private ApplicationMailer mailerService;
	
	@Autowired
	public void setApplicationMailer(ApplicationMailer service) {
		this.mailerService = service;
	}
	
	private void notify(String usercode,String msg) {
		List<User> users=userService.signin(usercode);
		if(users.size()>0) {
			int userid=users.get(0).getId();

			Note note=new Note();
			note.setUserid(userid);
			note.setStatus(0);
			note.setDti(new Date());
			note.setMsg(msg);
			noteService.create(note);
		}
		
		//sendMail(usercode);
	}
	
	private void sendMail(String user){
		//Create the application context
        //ApplicationContext context = new FileSystemXmlApplicationContext("app-config.xml");
         
        //Get the mailer instance
        //ApplicationMailer mailer = (ApplicationMailer) context.getBean("mailService");
 
        //Send a composed mail
		mailerService.sendMail(user+"@bancopopular.pt", "Test Subject", "Testing body");
 
        //Send a pre-configured mail
        //mailer.sendPreConfiguredMail("Exception occurred everywhere.. where are you ????");
	}

}
