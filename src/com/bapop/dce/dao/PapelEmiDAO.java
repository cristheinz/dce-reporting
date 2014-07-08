package com.bapop.dce.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.bapop.dce.model.PapelEmi;

@Repository
public class PapelEmiDAO {
	private HibernateTemplate hibernateTemplate;

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		hibernateTemplate = new HibernateTemplate(sessionFactory);
	}
	
	@SuppressWarnings("unchecked")
	public List<PapelEmi> list(){
		Session session = hibernateTemplate.getSessionFactory().openSession();
		Criteria criteria = session.createCriteria(PapelEmi.class);
		return criteria.list();
		//return hibernateTemplate.find("from Faqst");
	}
	@SuppressWarnings("unchecked")
	public List<PapelEmi> list(int papel){
		//Session session = hibernateTemplate.getSessionFactory().openSession();
		//Criteria criteria = session.createCriteria(PapelEmi.class);
		//return criteria.list();
		return hibernateTemplate.find("from PapelEmi where papel = ?",papel);
	}

	public PapelEmi save(PapelEmi papelEmi){
		hibernateTemplate.saveOrUpdate(papelEmi);
		return papelEmi;
	}
	
	public void delete(int id){
		Object record = hibernateTemplate.load(PapelEmi.class, id);
		hibernateTemplate.delete(record);
	}
}
