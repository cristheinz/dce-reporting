package com.bapop.dce.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.bapop.dce.bo.ReportTreeItem;

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
	public List<ReportTreeItem> getReports(int id, String val) {
		String[] v=val.split("-");
		return hibernateTemplate.getSessionFactory().getCurrentSession()
		//.createSQLQuery("EXEC dce_batch.usp_create_report_tree '"+v[0]+"','"+v[1]+"','"+v[2]+"',"+id)
		.createSQLQuery("EXEC dce_batch.usp_create_report_tree2 '"+v[0]+"','"+v[1]+"',"+id)
		//.addEntity(Report.class)
		.setResultTransformer(Transformers.aliasToBean(ReportTreeItem.class))
		.list();
		//return hibernateTemplate.find("from Report as r where r.parent="+id+" order by r.text");
		
	}
	/*
	public void changeReportTree(String val){
		String[] v=val.split("-");
		
		hibernateTemplate.getSessionFactory().getCurrentSession()
		.createSQLQuery("EXEC dce_batch.usp_create_report_tree '"+v[0]+"','"+v[1]+"','"+v[2]+"'")
		.executeUpdate();

		
		hibernateTemplate.getSessionFactory().getCurrentSession()
		.createSQLQuery("EXEC dce_batch.usp_create_report_tree '"+v[0]+"','"+v[1]+"','"+v[2]+"'")
		.addEntity(Report.class)
		.list();
	}*/

}
