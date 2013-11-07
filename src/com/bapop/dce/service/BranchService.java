package com.bapop.dce.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bapop.dce.dao.BranchDAO;
import com.bapop.dce.model.Branch;
import com.bapop.dce.util.Util;

@Service
public class BranchService {
	private BranchDAO branchDAO;
	private Util util;
 
    @Transactional(readOnly=true)
    public List<Branch> getBranchList(){
 
        return branchDAO.getBranchs();
    }
 
    @Transactional
    public List<Branch> create(Object data){
 
        List<Branch> newBranchs = new ArrayList<Branch>();
 
        List<Branch> list = util.getBranchsFromRequest(data);
 
        for (Branch Branch : list){
            newBranchs.add(branchDAO.saveBranch(Branch));
        }
 
        return newBranchs;
    }
 
    @Transactional
    //public List<Branch> update(Object data){
    public List<Branch> update(Branch branch){
 
        List<Branch> returnBranchs = new ArrayList<Branch>();
 
        //List<Branch> updatedBranchs = util.getBranchsFromRequest(data);
 
        //for (Branch Branch : updatedBranchs){
        //    returnBranchs.add(branchDAO.saveBranch(Branch));
        //}
        returnBranchs.add(branchDAO.saveBranch(branch));
 
        return returnBranchs;
    }
 
    @Transactional
    public void delete(Object data){
 
        //it is an array - have to cast to array object
        if (data.toString().indexOf('[') > -1){
 
            List<Integer> deleteBranchs = util.getListIdFromJSON(data);
 
            for (Integer id : deleteBranchs){
                branchDAO.deleteBranch(id);
            }
 
        } else { //it is only one object - cast to object/bean
 
            Integer id = Integer.parseInt(data.toString());
 
            branchDAO.deleteBranch(id);
        }
    }
 
    @Autowired
    public void setBranchDAO(BranchDAO branchDAO) {
        this.branchDAO = branchDAO;
    }
 
}
