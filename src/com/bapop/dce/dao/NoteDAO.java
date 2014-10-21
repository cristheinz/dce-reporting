package com.bapop.dce.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.bapop.dce.model.Note;

@Repository
public class NoteDAO {
	private HibernateTemplate hibernateTemplate;

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		hibernateTemplate = new HibernateTemplate(sessionFactory);
	}
	
	@SuppressWarnings("unchecked")
	public List<Note> list(){
		return hibernateTemplate.getSessionFactory().getCurrentSession()
				.createCriteria(Note.class)
				.list();
	}
	@SuppressWarnings("unchecked")
	public List<Note> listByUser(int userid){
		return hibernateTemplate.find("from Note where status = 0 and userid = ?", userid);
	}
	
	public Note save(Note note){
		hibernateTemplate.saveOrUpdate(note);
		return note;
	}

}
