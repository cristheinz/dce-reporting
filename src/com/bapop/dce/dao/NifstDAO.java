package com.bapop.dce.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.bapop.dce.model.Nifst;

@Repository
public class NifstDAO {
	private HibernateTemplate hibernateTemplate;

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		hibernateTemplate = new HibernateTemplate(sessionFactory);
	}
	
	@SuppressWarnings("unchecked")
	public List<Nifst> list(){
		Session session = hibernateTemplate.getSessionFactory().openSession();
		Criteria criteria = session.createCriteria(Nifst.class);
		return criteria.list();
		//return hibernateTemplate.find("from Nifst where name!=''");
	}
	@SuppressWarnings("unchecked")
	public List<Nifst> searchByName(String node){
		return hibernateTemplate.find("from Nifst where nam like '%"+node+"%'");
	}
	@SuppressWarnings("unchecked")
	public List<Nifst> searchByNif(String nif){
		return hibernateTemplate.find("from Nifst where nif like '%"+nif+"%'");
	}

	public Nifst save(Nifst nifst){
		hibernateTemplate.saveOrUpdate(nifst);
		return nifst;
	}
	
	public void delete(int id){
		Object record = hibernateTemplate.load(Nifst.class, id);
		hibernateTemplate.delete(record);
	}
}
