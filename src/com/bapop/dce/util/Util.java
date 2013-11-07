package com.bapop.dce.util;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.bapop.dce.model.Branch;

public class Util {
	public List<Branch> getBranchsFromRequest(Object data){

		List<Branch> list;

		//it is an array - have to cast to array object
		if (data.toString().indexOf('[') > -1){

			list = getListBranchsFromJSON(data);

		} else { //it is only one object - cast to object/bean

			Branch Branch = getBranchFromJSON(data);

			list = new ArrayList<Branch>();
			list.add(Branch);
		}

		return list;
	}

	/**
	 * Transform json data format into Branch object
	 * @param data - json data from request
	 * @return 
	 */
	private Branch getBranchFromJSON(Object data){
		JSONObject jsonObject = JSONObject.fromObject(data);
		Branch newBranch = (Branch) JSONObject.toBean(jsonObject, Branch.class);
		return newBranch;
	}

	/**
	 * Transform json data format into list of Branch objects
	 * @param data - json data from request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private List<Branch> getListBranchsFromJSON(Object data){
		JSONArray jsonArray = JSONArray.fromObject(data);
		List<Branch> newBranchs = (List<Branch>) JSONArray.toCollection(jsonArray,Branch.class);
		return newBranchs;
	}

	/**
	 * Tranform array of numbers in json data format into
	 * list of Integer
	 * @param data - json data from request
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<Integer> getListIdFromJSON(Object data){
		JSONArray jsonArray = JSONArray.fromObject(data);
		List<Integer> idBranchs = (List<Integer>) JSONArray.toCollection(jsonArray,Integer.class);
		return idBranchs;
	}
}
