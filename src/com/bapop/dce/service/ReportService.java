package com.bapop.dce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.dao.ReportDAO;
import com.bapop.dce.model.Report;

@Service
public class ReportService {
	private ReportDAO reportDAO;
 
    @Transactional(readOnly=true)
    public List<Report> getReportList(int id){
        return reportDAO.getReports(id);
    }
 
 
    @Autowired
    public void setReportDAO(ReportDAO reportDAO) {
        this.reportDAO = reportDAO;
    }
 
}
