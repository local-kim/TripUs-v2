package org.project.tripus.mapper;

import org.mapstruct.Mapper;
import org.project.tripus.dto.controller.request.CreateUserRequestDto;
import org.project.tripus.dto.service.input.CreateUserInputDto;

@Mapper(componentModel = "spring")
public interface UserMapper {

    CreateUserInputDto toInput(CreateUserRequestDto request);
}
