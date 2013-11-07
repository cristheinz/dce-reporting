package com.bapop.dce.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.bapop.dce.model.Branch;

@Repository
public class BranchDAO implements IBranchDAO {
	private HibernateTemplate hibernateTemplate;

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		hibernateTemplate = new HibernateTemplate(sessionFactory);
	}

	/**
	 * Get List of Branchs from database
	 * @return list of all Branchs
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<Branch> getBranchs() {
		return hibernateTemplate.find("from Branch");
	}

	/**
	 * Delete a Branch with the id passed as parameter
	 * @param id
	 */
	@Override
	public void deleteBranch(int id){
		Object record = hibernateTemplate.load(Branch.class, id);
		hibernateTemplate.delete(record);
	}

	/**
	 * Create a new Branch on the database or
	 * Update Branch
	 * @param Branch
	 * @return Branch added or updated in DB
	 */
	@Override
	public Branch saveBranch(Branch branch){
		hibernateTemplate.saveOrUpdate(branch);
		return branch;
	}
}
