package com.bapop.dce.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
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
		Session session = hibernateTemplate.getSessionFactory().openSession();
		Criteria criteria = session.createCriteria(Note.class);
		return criteria.list();
		//return hibernateTemplate.find("from Faqst");
	}
	@SuppressWarnings("unchecked")
	public List<Note> listByUser(int userid){
		//Session session = hibernateTemplate.getSessionFactory().openSession();
		//Criteria criteria = session.createCriteria(Notes.class);
		//return criteria.list();
		return hibernateTemplate.find("from Note where status = 0 and userid = ?", userid);
	}
	
	public Note save(Note note){
		hibernateTemplate.saveOrUpdate(note);
		return note;
	}

}
