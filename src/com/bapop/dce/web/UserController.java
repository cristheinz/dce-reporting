package com.bapop.dce.web;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.bapop.dce.model.Auth;
import com.bapop.dce.model.FileIO;
import com.bapop.dce.model.FileUploadBean;
import com.bapop.dce.model.User;
import com.bapop.dce.service.FileIOService;
import com.bapop.dce.service.UserService;

@Controller
public class UserController {
	private UserService userService;
	private FileIOService fileService;
	
	@RequestMapping(value="/user/signin.action")
	public @ResponseBody Map<String,? extends Object> signin(@RequestParam("loginPassword") String password, HttpSession session) throws Exception {
		try{
			List<User> l=userService.signin(password);
			if(l.size()==0) return getModelMapError("Login failed.Try again");
			//System.out.println(password);
			//if(!password.equals("Chris")) return getModelMapError("Login failed.Try again");
			session.setAttribute("userID", l.get(0).getId());
			return getMap(l);
			
		} catch (Exception e) {

			return getModelMapError("Error retrieving Branchs from database.");
		}
	}
	

	@RequestMapping(value="/user/auth.action")
	public @ResponseBody Map<String,? extends Object> auth(@RequestParam("user") String user, HttpSession session) throws Exception {
		try{
			//System.out.println(session.getAttribute("userID"));
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			//List<User> l=userService.signin(password);
			//if(l.size()==0) return getModelMapError("Login failed.Try again");
			//System.out.println(username+";"+password);
			//if(!password.equals("Chris")) return getModelMapError("Login failed.Try again");
			List<Auth> l=new ArrayList<Auth>();
			//System.out.println(user);
			l.add(new Auth("appBranch-E"));
			l.add(new Auth("appBalance-E"));
			if(id==2) {
			//if(user.equals("CRD76191")) {
				l.add(new Auth("appBranch-U"));	
			}
			
			return getMap2(l);
			
		} catch (Exception e) {

			return getModelMapError("Error retrieving Branchs from database.");
		}
	}
	
	@RequestMapping(value="/user/files.action")
	public @ResponseBody Map<String,? extends Object> getFiles(HttpSession session) throws Exception {
		try{
			int id=Integer.parseInt(session.getAttribute("userID").toString());
			return getFileMap(fileService.getFileIOList(id));
			
		} catch (Exception e) {

			return getModelMapError("Error retrieving Branchs from database.");
		}
	}

	@RequestMapping(value="/user/uploadfile.action", method = RequestMethod.POST)
	public @ResponseBody Map<String,? extends Object> upload(@RequestParam("user") String user,FileUploadBean uploadItem, BindingResult result) throws Exception {
		try{
			CommonsMultipartFile item=uploadItem.getFile();
			String fileName=item.getOriginalFilename();
			//System.out.println(uploadItem.getFile().getOriginalFilename());
			//System.out.println(user);
			
			if(!fileName.endsWith(".csv") && !fileName.endsWith(".CSV") &&
            		!fileName.endsWith(".pdf") && !fileName.endsWith(".PDF") && 
            		!fileName.endsWith(".txt") && !fileName.endsWith(".TXT")) 
            	//throw new Exception("Tipo de ficheiro não é suportado. Ficheiro não carregado.");
				return getModelMapError("Tipo de ficheiro não é suportado. Ficheiro não carregado.");
            	
            //Valida o tamanho do ficheiro: deve ser até 5MB
            if(item.getSize()>5242880)
            	//throw new Exception("O tamanho do ficheiro é superior a 5MB. Ficheiro não carregado.");
            	return getModelMapError("O tamanho do ficheiro é superior a 5MB. Ficheiro não carregado.");

            //Valida o conteúdo do ficheiro: deve conter tags predefinidas
            String fid="";
            if(!fileName.endsWith(".pdf") && !fileName.endsWith(".PDF")) {
            	fid=verifyFile(item.getFileItem().getString());
            	if(fid.equals(""))
            			//throw new Exception("O formato do ficheiro não é válido. Ficheiro não carregado.");
            			return getModelMapError("O formato do ficheiro não é válido. Ficheiro não carregado.");
            } else {
            	fid="PDF";
            }
			
            List<FileIO> f=new ArrayList<FileIO>();
            FileIO file=new FileIO();
            file.setCreationDate(new Date());
            file.setData(item.getBytes());
            file.setFid(fid);
            file.setName(fileName);
            file.setUserId(2);
            f.add(file);
            fileService.create(f);
			
			List<Auth> l=new ArrayList<Auth>();
			return getMap2(l);
			
		} catch (Exception e) {

			return getModelMapError("Error uploading File to Server.");
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
	private Map<String,Object> getMap(List<User> user){

		Map<String,Object> modelMap = new HashMap<String,Object>(1);
		modelMap.put("total", user.size());
		modelMap.put("user", user);
		modelMap.put("success", true);

		return modelMap;
	}
	private Map<String,Object> getMap2(List<Auth> string){

		Map<String,Object> modelMap = new HashMap<String,Object>(1);
		modelMap.put("total", string.size());
		modelMap.put("keys", string);
		modelMap.put("success", true);

		return modelMap;
	}
	private Map<String,Object> getFileMap(List<FileIO> string){

		Map<String,Object> modelMap = new HashMap<String,Object>(1);
		modelMap.put("total", string.size());
		modelMap.put("files", string);
		modelMap.put("success", true);

		return modelMap;
	}
/*
	private Map<String,Object> getMap(List<Report> tree){

	Map<String,Object> modelMap = new HashMap<String,Object>(3);
	modelMap.put("total", tree.size());
	modelMap.put("tree", tree);
	modelMap.put("success", true);

	return modelMap;
}*/
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
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	@Autowired
	public void setFileService(FileIOService fileService) {
		this.fileService = fileService;
	}

}
