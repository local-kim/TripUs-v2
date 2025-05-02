package org.project.tripus.mapper;

import org.mapstruct.Mapper;
import org.project.tripus.dto.input.CreateUserInputDto;
import org.project.tripus.dto.request.CreateUserRequestDto;

@Mapper(componentModel = "spring")
public interface UserMapper {

    CreateUserInputDto toInput(CreateUserRequestDto request);
}
