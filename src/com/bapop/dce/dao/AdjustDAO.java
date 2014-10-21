package com.bapop.dce.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.bapop.dce.model.Adjust;

@Repository
public class AdjustDAO {
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
	public List<Adjust> getAdjusts(int anomes) {
		return hibernateTemplate.find("from Adjust as r where r.flg=0 and r.anomes="+anomes);
	}
	
	public Adjust save(Adjust adjust){
		hibernateTemplate.saveOrUpdate(adjust);
		return adjust;
	}
	
	public void delete(int id){
		Object record = hibernateTemplate.load(Adjust.class, id);
		hibernateTemplate.delete(record);
	}
	
	public void adjustAfterAdjust(String anomes){
		hibernateTemplate.getSessionFactory().getCurrentSession()
			.createSQLQuery("exec dce_batch.usp_BL_adj "+anomes)
			.executeUpdate();
	}

}
