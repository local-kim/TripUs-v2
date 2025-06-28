package org.project.tripus.service;

import org.project.tripus.dto.service.input.LoginInputDto;
import org.project.tripus.dto.service.output.LoginOutputDto;
import org.project.tripus.dto.service.output.ReissueOutputDto;

public interface AuthService {

    LoginOutputDto login(LoginInputDto input);

    ReissueOutputDto reissue(String refreshToken);
}
