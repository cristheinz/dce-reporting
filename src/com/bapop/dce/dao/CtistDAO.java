package com.bapop.dce.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.bapop.dce.model.Ctist;

@Repository
public class CtistDAO {
	private HibernateTemplate hibernateTemplate;

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		hibernateTemplate = new HibernateTemplate(sessionFactory);
	}
	
	@SuppressWarnings("unchecked")
	public List<Ctist> list(){
		return hibernateTemplate.find("from Ctist");
	}
	
	public Ctist save(Ctist ctist){
		hibernateTemplate.saveOrUpdate(ctist);
		return ctist;
	}
	
	public void delete(int id){
		Object record = hibernateTemplate.load(Ctist.class, id);
		hibernateTemplate.delete(record);
	}

}
