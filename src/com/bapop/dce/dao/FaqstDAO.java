package com.bapop.dce.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.bapop.dce.model.Ctist;
import com.bapop.dce.model.Faqst;

@Repository
public class FaqstDAO {
	private HibernateTemplate hibernateTemplate;

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		hibernateTemplate = new HibernateTemplate(sessionFactory);
	}
	
	@SuppressWarnings("unchecked")
	public List<Faqst> list(){
		return hibernateTemplate.getSessionFactory().getCurrentSession()
				.createCriteria(Faqst.class)
				.list();
	}

	
	private List<Faqst> test(){
		//System.out.println("Hibernate many to many (Annotation)");
		Session session = hibernateTemplate.getSessionFactory().getCurrentSession();
		session.beginTransaction();
		
		Faqst f= new Faqst();
		f.setTag("Teste");
		f.setTxt("testando 123");
		
		Ctist c1= new Ctist(1632,0);
		Ctist c2= new Ctist(2413,2140);
		
		List<Ctist> ctis = new ArrayList<Ctist>();
		ctis.add(c1);
		ctis.add(c2);
		
		f.setCtis(ctis);
		
		session.save(f);
	 
		session.getTransaction().commit();
		System.out.println("Done");
		
		List<Faqst> list = new ArrayList<Faqst>();
		list.add(f);
		
		return list;
	}
	
	public Faqst save(Faqst faqst){
		hibernateTemplate.saveOrUpdate(faqst);
		return faqst;
	}
	
	public void delete(int id){
		Object record = hibernateTemplate.load(Faqst.class, id);
		hibernateTemplate.delete(record);
	}
}
