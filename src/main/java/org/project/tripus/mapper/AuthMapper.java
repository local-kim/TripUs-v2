package org.project.tripus.mapper;

import org.mapstruct.Mapper;
import org.project.tripus.dto.controller.request.LoginRequestDto;
import org.project.tripus.dto.controller.response.LoginResponseDto;
import org.project.tripus.dto.controller.response.ReissueResponseDto;
import org.project.tripus.dto.service.input.LoginInputDto;
import org.project.tripus.dto.service.output.LoginOutputDto;
import org.project.tripus.dto.service.output.ReissueOutputDto;

@Mapper(componentModel = "spring")
public interface AuthMapper {

    LoginInputDto toInput(LoginRequestDto request);

    LoginResponseDto toResponse(LoginOutputDto output);

    ReissueResponseDto toResponse(ReissueOutputDto output);
}
