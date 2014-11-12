package com.bapop.dce.dao;

import java.text.SimpleDateFormat;
import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.bapop.dce.model.Bonif;
import com.bapop.dce.model.FileIO;

@Repository
public class BonifDAO {
	private HibernateTemplate hibernateTemplate;

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		hibernateTemplate = new HibernateTemplate(sessionFactory);
	}

	/**
	 * Get List of Bonifs from database
	 * @return list of all Bonifs
	 */
	@SuppressWarnings("unchecked")
	public List<Bonif> getBonifs() {
		return hibernateTemplate.find("from Bonif");
	}
	
	public Bonif save(Bonif bonif){
		if(!bonif.getFname().isEmpty()){
			FileIO file=(FileIO) hibernateTemplate.find("from FileIO as u where u.name='"+bonif.getFname()+"'").get(0);
			file.setDts(bonif.getDts());
			file.setDtp(bonif.getDtp());
			hibernateTemplate.saveOrUpdate(file);
		} else {
			bonif.setDts(null);
			bonif.setDtp(null);
		}
		
		SimpleDateFormat fmt=new SimpleDateFormat("yyyy-MM-dd");
		String dti = bonif.getDti()==null ? "null" : "'"+fmt.format(bonif.getDti())+"'";
		String dtl = bonif.getDtl()==null ? "null" : "'"+fmt.format(bonif.getDtl())+"'";
		
		hibernateTemplate.getSessionFactory().getCurrentSession()
			.createSQLQuery("update DCE_REPORTING.dce_batch.tbl_bonif set dtl="+dtl+", dti="+dti+" where doc='"+bonif.getDoc()+"'")
			.executeUpdate();
		
		return bonif;
	}

	/**
	 * Delete a Bonif with the id passed as parameter
	 * @param id
	 */
	/*public void deleteBonif(int id){
		Object record = hibernateTemplate.load(Bonif.class, id);
		hibernateTemplate.delete(record);
	}*/

	/**
	 * Create a new Bonif on the database or
	 * Update Bonif
	 * @param Bonif
	 * @return Bonif added or updated in DB
	 */
	/*public Bonif saveBonif(Bonif Bonif){
		hibernateTemplate.saveOrUpdate(Bonif);
		return Bonif;
	}*/
}
