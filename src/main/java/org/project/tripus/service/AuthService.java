package org.project.tripus.service;

import org.project.tripus.dto.input.LoginInputDto;
import org.project.tripus.dto.output.LoginOutputDto;

public interface AuthService {

    LoginOutputDto login(LoginInputDto input);
}
