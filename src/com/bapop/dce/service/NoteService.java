package com.bapop.dce.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.dao.NoteDAO;
import com.bapop.dce.model.Note;

@Service
public class NoteService {
	
	private NoteDAO noteDAO;
	@Autowired
    public void setDAO(NoteDAO noteDAO) {
        this.noteDAO = noteDAO;
    }
	
	@Transactional(readOnly=true)
    public List<Note> getList(){
        return noteDAO.list();
    }
	
	@Transactional(readOnly=true)
    public List<Note> getListByUser(int userid){
        return noteDAO.listByUser(userid);
    }
	
	@Transactional
    public List<Note> update(Note note){
 
        List<Note> returnObject = new ArrayList<Note>();
 
        returnObject.add(noteDAO.save(note));
 
        return returnObject;
    }
	

}
