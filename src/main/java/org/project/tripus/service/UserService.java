package org.project.tripus.service;

import org.project.tripus.dto.service.input.CreateUserInputDto;

public interface UserService {

	void createMember(CreateUserInputDto input);
}