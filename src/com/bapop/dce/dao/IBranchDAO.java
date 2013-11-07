package com.bapop.dce.dao;

import java.util.List;

import com.bapop.dce.model.Branch;

public interface IBranchDAO {
	List<Branch> getBranchs();

	void deleteBranch(int id);

	Branch saveBranch(Branch branch);
}
