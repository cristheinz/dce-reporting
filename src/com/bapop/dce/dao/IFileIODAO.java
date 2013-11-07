package com.bapop.dce.dao;

import java.util.List;

import com.bapop.dce.model.FileIO;

public interface IFileIODAO {
	List<FileIO> getFiles(int userID);

	void deleteFile(int id);

	FileIO saveFile(FileIO file);
}
