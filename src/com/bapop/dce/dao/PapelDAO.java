package com.bapop.dce.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.bapop.dce.model.Papel;

@Repository
public class PapelDAO {
	private HibernateTemplate hibernateTemplate;

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		hibernateTemplate = new HibernateTemplate(sessionFactory);
	}
	
	@SuppressWarnings("unchecked")
	public List<Papel> list(){
		Session session = hibernateTemplate.getSessionFactory().openSession();
		Criteria criteria = session.createCriteria(Papel.class);
		return criteria.list();
		//return hibernateTemplate.find("from Faqst");
	}

	public Papel save(Papel papel){
		hibernateTemplate.saveOrUpdate(papel);
		return papel;
	}
	
	public void delete(int id){
		Object record = hibernateTemplate.load(Papel.class, id);
		hibernateTemplate.delete(record);
	}
}
