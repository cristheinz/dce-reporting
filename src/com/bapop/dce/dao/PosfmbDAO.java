package com.bapop.dce.dao;

import java.sql.SQLException;
import java.util.List;

import org.hibernate.HibernateException;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.bapop.dce.util.Function;

@Repository
public class PosfmbDAO {
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
	public List<Object[]> getPosfmb(final String anomes) {
		return hibernateTemplate.execute(new HibernateCallback<List<Object[]>>() {

			public List<Object[]> doInHibernate(Session s)
	                throws HibernateException, SQLException {
				String[] ym=Function.getDashboradPeriods(anomes);
				
	        	String q ="select dce_batch.fn_getGRPtxt(grp) as ctab," +
				" cast(round(abs(sum(case when anomes= "+anomes+" then val else 0 end)/1000000),3,1) as decimal(14,2)) as val,"+
				" cast(round(abs(sum(case when anomes= "+ym[0]+" then val else 0 end)/1000000),3,1) as decimal(14,2)) as val1,"+
				" cast(round(abs(sum(case when anomes= "+ym[1]+" then val else 0 end)/1000000),3,1) as decimal(14,2)) as val2,"+
				" cast(round(abs(sum(case when anomes= "+ym[2]+" then val else 0 end)/1000000),3,1) as decimal(14,2)) as val3,"+
				" cast(round(abs(sum(case when anomes= "+ym[3]+" then val else 0 end)/1000000),3,1) as decimal(14,2)) as valh"+
				" from DCE_REPORTING.dce_batch.vie_posfm2b "+
				//" where (anomes=? or anomes=? or anomes=? or anomes=? or anomes=?)"+
				" where (anomes >= ? or anomes = ?)"+
				//" and ctab!='nd'"+
				//" group by ctab having ctab!='nd'";
	        	" group by grp"+
	        	" union all"+
	        	" select dce_batch.fn_getGRPtxt(grp) as ctab," +
				" cast(round(abs(sum(case when anomes= "+anomes+" then val else 0 end)/1000000),3,1) as decimal(14,2)) as val,"+
				" cast(round(abs(sum(case when anomes= "+ym[0]+" then val else 0 end)/1000000),3,1) as decimal(14,2)) as val1,"+
				" cast(round(abs(sum(case when anomes= "+ym[1]+" then val else 0 end)/1000000),3,1) as decimal(14,2)) as val2,"+
				" cast(round(abs(sum(case when anomes= "+ym[2]+" then val else 0 end)/1000000),3,1) as decimal(14,2)) as val3,"+
				" cast(round(abs(sum(case when anomes= "+ym[3]+" then val else 0 end)/1000000),3,1) as decimal(14,2)) as valh"+
				" from ("+
	        	" select anomes, 33 as grp, sum(ISNULL(val,0)) as val, COUNT_BIG(*) as cb from dce_batch.ptb_crvcd where flg=0 and exc is null and mot='V' group by anomes"+
	        	" union all"+
	        	" select anomes, 34 as grp, sum(ISNULL(val_p,0)) as val_p, COUNT_BIG(*) as cb from dce_batch.ptb_crvcd where flg=0 and exc is null and mot='V' group by anomes"+
	        	" union all"+
	        	" select anomes, 35 as grp, sum(ISNULL(val,0)) as val, COUNT_BIG(*) as cb from dce_batch.ptb_crvcd where flg=0 and exc is null and mot='D' group by anomes"+
	        	" union all"+
	        	" select anomes, 36 as grp, sum(ISNULL(val_p,0)) as val_p, COUNT_BIG(*) as cb from dce_batch.ptb_crvcd where flg=0 and exc is null and mot='D' group by anomes"+
	        	" ) z"+
				" where (anomes >= "+ym[2]+" or anomes = "+ym[3]+")"+
	        	" group by grp";
	        	
	        	
	        	//System.out.println(q);

	            SQLQuery sql=s.createSQLQuery(q);
	            /*sql.setParameter(0, anomes);
	            sql.setParameter(1, ym[0]);
	            sql.setParameter(2, ym[1]);
	            sql.setParameter(3, ym[2]);
	            sql.setParameter(4, ym[3]);*/
	            sql.setParameter(0, ym[2]);
	            sql.setParameter(1, ym[3]);
	            sql.addScalar("ctab");
	            sql.addScalar("val");
	            sql.addScalar("val1");
	            sql.addScalar("val2");
	            sql.addScalar("val3");
	            sql.addScalar("valh");
	            
	            /*
	            List<DashBoardWrapper> tos=new ArrayList<DashBoardWrapper>();
	            List<Object[]> l=sql.list();
	            for(Object[] o:l) {
	            	String cta=o[0].toString();
	            	BigDecimal val=new BigDecimal(o[1].toString());
	            	BigDecimal val1=new BigDecimal(o[2].toString());
	            	BigDecimal val2=new BigDecimal(o[3].toString());
	            	BigDecimal val3=new BigDecimal(o[4].toString());
	            	BigDecimal valh=new BigDecimal(o[5].toString());
	            	tos.add(new DashBoardWrapper(cta,val,val1,val2,val3,valh));
	            }
	            return tos;*/
	            return sql.list();
	        }
	    });
	}
	
	

}
