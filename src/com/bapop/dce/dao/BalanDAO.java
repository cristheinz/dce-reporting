package com.bapop.dce.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.bapop.dce.model.Balan;

@Repository
public class BalanDAO {
	private HibernateTemplate hibernateTemplate;

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		hibernateTemplate = new HibernateTemplate(sessionFactory);
	}

	/**
	 * Get List of Reports from database
	 * @return list of all Reports
	 */
	@SuppressWarnings("unchecked")
	public List<Balan> getNodes(int anomes, String id) {
		return hibernateTemplate.find("from Balan as r where r.anomes="+anomes+" and r.parent='"+id+"'");
	}
	
	public void delete(String anomes){
		hibernateTemplate.deleteAll(hibernateTemplate.find("from Balan as r where r.anomes="+anomes));
	}
	
	public void adjustAfterLoading(String anomes){
		hibernateTemplate.getSessionFactory().openSession()
			.createSQLQuery("exec dce_batch.usp_BL_adjust "+anomes+",1").executeUpdate();
		hibernateTemplate.getSessionFactory().openSession()
		.createSQLQuery("exec dce_batch.usp_BL_AppAdjust "+anomes).executeUpdate();
	}
	
	

}
