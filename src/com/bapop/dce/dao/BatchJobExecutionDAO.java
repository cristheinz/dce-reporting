package com.bapop.dce.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.bapop.dce.model.BatchJobExecution;

@Repository
public class BatchJobExecutionDAO {
	private HibernateTemplate hibernateTemplate;

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		hibernateTemplate = new HibernateTemplate(sessionFactory);
	}
	
	@SuppressWarnings("unchecked")
	public List<BatchJobExecution> list(){
		Session session = hibernateTemplate.getSessionFactory().openSession();
		Criteria criteria = session.createCriteria(BatchJobExecution.class);
		return criteria.list();
		//return hibernateTemplate.find("from Faqst");
	}
	
	public void delete(int id){
		/*Object record = hibernateTemplate.load(BatchJobExecution.class, id);
		hibernateTemplate.delete(record);*/
		hibernateTemplate.getSessionFactory().openSession()
		.createSQLQuery("exec dce_batch.usp_BATCH_delete "+id).executeUpdate();
	}

}
