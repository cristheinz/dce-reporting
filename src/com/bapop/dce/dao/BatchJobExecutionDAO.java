package com.bapop.dce.dao;

import java.util.List;

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
		/*Session session = hibernateTemplate.getSessionFactory().getCurrentSession();
		Criteria criteria = session.createCriteria(BatchJobExecution.class);
		List<BatchJobExecution> list=criteria.list();*/
		return hibernateTemplate.getSessionFactory().getCurrentSession()
				.createCriteria(BatchJobExecution.class)
				.list();
	}
	
	public void delete(int id){
		hibernateTemplate.getSessionFactory().getCurrentSession()
			.createSQLQuery("exec dce_batch.usp_BATCH_delete "+id).executeUpdate();
	}

}
