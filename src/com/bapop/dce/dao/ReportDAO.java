package com.bapop.dce.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.bapop.dce.model.Report;

@Repository
public class ReportDAO {
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
	public List<Report> getReports(int id) {
		return hibernateTemplate.find("from Report as r where r.parent="+id+" order by r.text");
	}

}
