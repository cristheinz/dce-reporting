package com.bapop.dce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.bo.ReportTreeItem;
import com.bapop.dce.dao.ReportDAO;

@Service
public class ReportService {
	private ReportDAO reportDAO;
 
    @Transactional(readOnly=true)
    public List<ReportTreeItem> getReportList(int id, String val){
        return reportDAO.getReports(id,val);
    }
 
    /*
    @Transactional(readOnly=true)
    public void alterReportList(String val){
        reportDAO.changeReportTree(val);
    }*/
 
    @Autowired
    public void setReportDAO(ReportDAO reportDAO) {
        this.reportDAO = reportDAO;
    }
 
}
