package org.project.tripus.service;

import org.project.tripus.dto.input.LoginInput;
import org.project.tripus.dto.output.LoginOutput;

public interface AuthService {

    LoginOutput login(LoginInput input);
}
