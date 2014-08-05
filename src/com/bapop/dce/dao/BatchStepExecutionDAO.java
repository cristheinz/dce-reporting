package com.bapop.dce.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.bapop.dce.model.BatchStepExecution;

@Repository
public class BatchStepExecutionDAO {
	private HibernateTemplate hibernateTemplate;

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		hibernateTemplate = new HibernateTemplate(sessionFactory);
	}
	
	@SuppressWarnings("unchecked")
	public List<BatchStepExecution> list(int jobid){
		/*Session session = hibernateTemplate.getSessionFactory().openSession();
		Criteria criteria = session.createCriteria(BatchJobExecution.class);
		return criteria.list();*/
		return hibernateTemplate.find("from BatchStepExecution where jobid = ?",jobid);
	}
	

}
