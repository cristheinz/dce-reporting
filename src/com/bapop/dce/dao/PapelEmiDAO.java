package com.bapop.dce.dao;

import java.util.List;

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
		return hibernateTemplate.getSessionFactory().getCurrentSession()
				.createCriteria(PapelEmi.class)
				.list();
	}
	@SuppressWarnings("unchecked")
	public List<PapelEmi> list(int papel){
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
