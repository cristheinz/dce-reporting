package com.bapop.dce.web;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.bapop.batch.dce.files.BatchFiles;
import com.bapop.dce.bo.FileBean;
import com.bapop.dce.bo.FileBeanWrapper;
import com.bapop.dce.bo.FileUploadBean;
import com.bapop.dce.model.FileIO;
import com.bapop.dce.service.FileService;
import com.bapop.dce.util.ExtJSReturn;
import com.bapop.dce.util.Utils;

@Controller
public class FileController {
	private FileService fileService;
	
	@RequestMapping(value="/file/list.action")
	public @ResponseBody Map<String,? extends Object> getFiles(HttpSession session,@RequestParam("fid") String fid) throws Exception {
		try {
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			List<FileIO> list;

			if(fid.isEmpty()) {
				list=fileService.getFileIOList(id);
			} else {
				list=fileService.getFileIOByFid(id,fid);
			}
			
			List<FileBean> result = new ArrayList<FileBean>();
			for(FileIO f: list){
				FileBean fb=new FileBean(f);
				result.add(fb);
			}
			
			return ExtJSReturn.mapOK(result,result.size());
			
		} catch (Exception e) {
			return ExtJSReturn.mapError("Error retrieving Files from database.");
		}
	}
	
	@RequestMapping(value="/file/delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody FileBeanWrapper data) throws Exception {
		try{
			fileService.delete(data.getData());

			return ExtJSReturn.mapOK();

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to delete File.");
		}
	}
	
	@RequestMapping(value="/file/update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody FileBeanWrapper data) throws Exception {
		try{
			
			List<FileBean> result = fileService.update(data.getData());

			return ExtJSReturn.mapOK(result,result.size());

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to update File.");
		}
	}
	
	@RequestMapping(value="/file/fregu/new.action")
	public @ResponseBody Map<String,? extends Object> newFregu(HttpSession session,@RequestParam("id") String id) throws Exception {
		try{
			//fileService.delete(data.getData());
			String user_id=session.getAttribute("userID").toString();
			String maxName=fileService.getLastFreguFileName();
			String fname=Utils.generateFreguFileName(maxName);
			
			//System.out.println("user_id: "+user_id+"; file_id: "+id+"; file_name: "+fname);
			BatchFiles b=new BatchFiles();
			int x=b.bulkFregu(id,user_id,fname);
			if(x!=0) {
				return ExtJSReturn.mapError("Error trying to bulk FREGU File.");
			}

			return ExtJSReturn.mapOK();

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to create FREGU File.");
		}
	}
	@RequestMapping(value="/file/fseis/new.action")
	public @ResponseBody Map<String,? extends Object> newFseis(HttpSession session,
										@RequestParam("name") String name,
										@RequestParam("id") String id,
										@RequestParam("nemp") String nemp,
										@RequestParam("nsuc") String nsuc,
										@RequestParam("bco") String bco,
										@RequestParam("mer") String mer,
										@RequestParam("tip") String tip,
										@RequestParam("dtr") String dtr) throws Exception {
		try{
			//fileService.delete(data.getData());
			String user_id=session.getAttribute("userID").toString();
			String fname=Utils.generateFseisFileName();
			
			/*System.out.println("user_id: "+user_id+
					"; file_id: "+id+
					"; file_name: "+fname+
					"; nemp: "+nemp+
					"; nsuc: "+nsuc+
					"; bco: "+bco+
					"; mer: "+mer+
					"; tip: "+tip+
					"; dtr: "+dtr);*/
			
			BatchFiles b=new BatchFiles();
			int x=b.bulkFseis(id,user_id,fname,nsuc,nemp,bco,mer,tip,dtr);
			if(x!=0) {
				return ExtJSReturn.mapError("Error trying to bulk FSEIS File.");
			}

			return ExtJSReturn.mapOK();

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to create FSEIS File.");
		}
	}
	@RequestMapping(value="/file/fpape/new.action")
	public @ResponseBody Map<String,? extends Object> newFpape(HttpSession session,@RequestParam("anomes") String anomes) throws Exception {
		try{
			//fileService.delete(data.getData());
			String user_id=session.getAttribute("userID").toString();
			String fname=Utils.generateFpapeFileName(anomes);
			
			System.out.println("user_id: "+user_id+"; anomes: "+anomes+"; file_name: "+fname);
			BatchFiles b=new BatchFiles();
			int x=b.bulkFpape(anomes,user_id, fname);
			if(x!=0) {
				return ExtJSReturn.mapError("Error trying to bulk FPAPE File.");
			}

			return ExtJSReturn.mapOK();

		} catch (Exception e) {
			return ExtJSReturn.mapError("Error trying to create FPAPE File.");
		}
	}

	
	@RequestMapping(value="/file/download.action")
	public void getFile(HttpSession session,@RequestParam String id,HttpServletResponse response){
		try {
			List<FileIO> list=fileService.getFileIO(id);
			FileIO f=list.get(0);

			response.setContentType("application/octet-stream");
			response.setHeader("Content-Disposition", "Attachment; Filename=\"" + f.getName() + "\"");
			response.getOutputStream().write(f.getData(),0,f.getData().length);
			
		} catch (Exception e) {
			System.out.println("Error retrieving File from database.");
		}
	}

	@RequestMapping(value="/file/upload.action", method = RequestMethod.POST)
	public void create(HttpSession session,FileUploadBean bean, BindingResult result,HttpServletResponse response){ 
	//public @ResponseBody Map<String,? extends Object> upload(HttpSession session,FileUploadBean bean, BindingResult result) throws Exception {
		String filenamePrefix="";
		try {
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			
			//FileUploadBean bean = (FileUploadBean) command;
			//MultipartFile item = bean.getFile();
			CommonsMultipartFile item=bean.getFile();
			String fileName=item.getOriginalFilename();
			String fid="";
			
			//Valida tipo de ficheiro
			if(!fileName.endsWith(".csv") && !fileName.endsWith(".CSV") &&
            		!fileName.endsWith(".pdf") && !fileName.endsWith(".PDF") && 
            		!fileName.endsWith(".txt") && !fileName.endsWith(".TXT")) { 
				response.getWriter().write("{\"success\": false, \"message\":\"O formato do ficheiro não é suportado. Ficheiro não carregado.\"}");
				//return ExtJSReturn.mapError("Tipo de ficheiro não é suportado. Ficheiro não carregado.");
			} else {
            //Valida o tamanho do ficheiro: deve ser até 5MB
            if(item.getSize()>5242880) {
            	response.getWriter().write("{\"success\": false, \"message\":\"O tamanho do ficheiro é superior a 5MB. Ficheiro não carregado.\"}");
            	//return ExtJSReturn.mapError("O tamanho do ficheiro é superior a 5MB. Ficheiro não carregado.");
			} else {
            //Valida o conteúdo do ficheiro: deve conter tags predefinidas
            
            if(!fileName.endsWith(".pdf") && !fileName.endsWith(".PDF")) {
            	//String content=item.getBytes().toString();
            	String content=item.getFileItem().getString();
            	fid=verifyFile(content);
            	if(fid.equals("BALAN")) {
            		int i=content.indexOf(" DATA:");
            		String[] dt=content.substring(i+6, i+16).split("-");
            		filenamePrefix=dt[2]+dt[1]+"_";
            	}
            	if(fid.equals(""))
            		response.getWriter().write("{\"success\": false, \"message\":\"O conteúdo do ficheiro não é válido. Ficheiro não carregado.\"}");
            		//return ExtJSReturn.mapError("O formato do ficheiro não é válido. Ficheiro não carregado.");
            } else {
            	fid="PDF";
            }
			}}
			
            if(!fid.isEmpty()) {
            	List<FileIO> f=new ArrayList<FileIO>();
                FileIO file=new FileIO();
                file.setCreationDate(new Date());
                file.setData(item.getBytes());
                file.setFid(fid);
                file.setName(filenamePrefix+fileName);
                file.setUserId(id);
                f.add(file);
                fileService.create(f);
    			
                response.getWriter().write("{\"success\": true}");
                
            }
            
            response.flushBuffer();
            //return ExtJSReturn.mapOK();
            return  ;
			
		} catch (Exception e) {
			System.out.println("Error uploading File to Server.");
			//return ExtJSReturn.mapError("Error uploading File to Server.");
		}
	}
	
	private static String verifyFile(String fileStr) {
		final String PERIO="PERIO;SUC;COD;REF;DTI;DTF;VAL_C";
		final String BALAN_1="REF.DOCUMENTO: KNI1037";
		final String BALAN="REF.DOCUMENTO: KNI1040";
		final String FREGU="DEB;CRE;VAL;TXT";
		final String FSEIS="CTA;TXT;VALD;VALC";
		
		if(fileStr.contains(PERIO)) return "PERIO";
		if(fileStr.contains(BALAN_1)) return "BALAN";
		if(fileStr.contains(BALAN)) return "BALAN";
		if(fileStr.contains(FREGU)) return "FREGU";
		if(fileStr.contains(FSEIS)) return "FSEIS";

		return "";
	}

	@Autowired
	public void setFileService(FileService fileService) {
		this.fileService = fileService;
	}

}
