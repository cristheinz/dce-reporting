package com.bapop.dce.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.bapop.dce.model.UserAuth;

@Repository
public class UserAuthDAO {
	private HibernateTemplate hibernateTemplate;

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		hibernateTemplate = new HibernateTemplate(sessionFactory);
	}
	
	@SuppressWarnings("unchecked")
	public List<UserAuth> list(int userid){
		//Session session = hibernateTemplate.getSessionFactory().openSession();
		//Criteria criteria = session.createCriteria(UserAuth.class);
		//return criteria.list();
		return hibernateTemplate.find("from UserAuth where userid = 0 or userid = ?",userid);
	}
}
