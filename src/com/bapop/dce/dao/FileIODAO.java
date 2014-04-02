package com.bapop.dce.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.bapop.dce.model.FileIO;

@Repository
public class FileIODAO {
	private HibernateTemplate hibernateTemplate;

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		hibernateTemplate = new HibernateTemplate(sessionFactory);
	}

	/**
	 * Get List of Files from database
	 * @return list of all Files
	 */
	@SuppressWarnings("unchecked")
	public List<FileIO> getFiles(int userID) {
		return hibernateTemplate.find("from FileIO where user_id="+userID);
	}

	@SuppressWarnings("unchecked")
	public List<FileIO> getFilesByFid(int userID, String fid) {
		return hibernateTemplate.find("from FileIO where user_id="+userID+" and fid='"+fid+"'");
	}

	@SuppressWarnings("unchecked")
	public List<FileIO> getFileIO(String id) {
		return hibernateTemplate.find("from FileIO as u where u.id="+id);
	}

	/**
	 * Delete a File with the id passed as parameter
	 * @param id
	 */
	public void deleteFile(int id){
		Object record = hibernateTemplate.load(FileIO.class, id);
		hibernateTemplate.delete(record);
	}

	/**
	 * Create a new File on the database or
	 * Update File
	 * @param File
	 * @return File added or updated in DB
	 */
	public FileIO saveFile(FileIO file){
		hibernateTemplate.saveOrUpdate(file);
		return file;
	}
}
