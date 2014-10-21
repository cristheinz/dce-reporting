package com.bapop.dce.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
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
		return hibernateTemplate.getSessionFactory().getCurrentSession()
				.createCriteria(Nifst.class)
				.list();
	}
	
	@SuppressWarnings("unchecked")
	public List<Nifst> searchByName(String node){
		node="\""+node+"\"";
		String q="SELECT id,nif,sbp,sec,cae,big,nam from dce_batch.fm2_nifst where CONTAINS(nam, '"+node+"')";
		SQLQuery query = hibernateTemplate.getSessionFactory().getCurrentSession()
				.createSQLQuery(q);
		
		query.addEntity(Nifst.class);
		return query.list();
		
		/*
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Nifst> result=new ArrayList<Nifst>();
		@SuppressWarnings("rawtypes")
		List data = query.list();
		for(Object object : data) {
           @SuppressWarnings("rawtypes")
           Map row = (Map)object;
           Nifst n=new Nifst();
           n.setId((int)row.get("id"));
           n.setNif((String)row.get("nif"));
           n.setNam((String)row.get("nam"));
           //n.setCae(Integer.parseInt(row.get("cae").toString()));
           //n.setSec(Integer.parseInt(row.get("sec").toString()));
           //n.setBig(Integer.parseInt(row.get("big").toString()));
           //n.setSbp(Integer.parseInt(row.get("sbp").toString()));
           result.add(n);
        }
		return result;*/
		/*
		hibernateTemplate.setMaxResults(15);
		return hibernateTemplate.find("from Nifst where not(nam is null or nam='') and nam like '%"+node+"%'");*/
	}
	@SuppressWarnings("unchecked")
	public List<Nifst> searchByNif(String nif){
		return hibernateTemplate.find("from Nifst where nif = ?", nif);
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
