package org.project.tripus.mapper;

import org.mapstruct.Mapper;
import org.project.tripus.dto.input.LoginInput;
import org.project.tripus.dto.output.LoginOutput;
import org.project.tripus.dto.request.LoginRequest;
import org.project.tripus.dto.response.LoginResponse;

@Mapper(componentModel = "spring")
public interface AuthMapper {

    LoginInput toInput(LoginRequest request);

    LoginResponse toResponse(LoginOutput output);
}
