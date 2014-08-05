package com.bapop.dce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.dao.BatchJobExecutionDAO;
import com.bapop.dce.dao.BatchStepExecutionDAO;
import com.bapop.dce.model.BatchJobExecution;
import com.bapop.dce.model.BatchStepExecution;

@Service
public class BatchExecutionService {
	
	private BatchJobExecutionDAO batchJobExecutionDAO;
	private BatchStepExecutionDAO batchStepExecutionDAO;

	@Autowired
    public void setBatchJobExecutionDAO(BatchJobExecutionDAO dao) {
        this.batchJobExecutionDAO = dao;
    }
	@Autowired
    public void setBatchStepExecutionDAO(BatchStepExecutionDAO dao) {
        this.batchStepExecutionDAO = dao;
    }
	
	
	@Transactional(readOnly=true)
    public List<BatchJobExecution> listExecutedJobs(){
        return batchJobExecutionDAO.list();
    }
	
	@Transactional(readOnly=true)
    public List<BatchStepExecution> listExecutedSteps(int jobid){
        return batchStepExecutionDAO.list(jobid);
    }
	
	
	@Transactional
	public void deleteJobExecution(BatchJobExecution job){
		batchJobExecutionDAO.delete(job.getId());
	}
	
	

}
