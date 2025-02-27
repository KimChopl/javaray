package com.kh.javaray.manager.model.service;

import com.kh.javaray.manager.model.dto.DeleteFormDTO;
import com.kh.javaray.manager.model.dto.ManagingDTO;

import jakarta.validation.Valid;

public interface ManagerService {

	int changeRole(ManagingDTO member);

	void deleteShipping(DeleteFormDTO deleteReason);

}
