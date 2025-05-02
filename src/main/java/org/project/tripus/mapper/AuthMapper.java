package org.project.tripus.mapper;

import org.mapstruct.Mapper;
import org.project.tripus.dto.input.LoginInputDto;
import org.project.tripus.dto.output.LoginOutputDto;
import org.project.tripus.dto.request.LoginRequestDto;
import org.project.tripus.dto.response.LoginResponseDto;

@Mapper(componentModel = "spring")
public interface AuthMapper {

    LoginInputDto toInput(LoginRequestDto request);

    LoginResponseDto toResponse(LoginOutputDto output);
}
