package org.project.tripus.mapper;

import org.mapstruct.Mapper;
import org.project.tripus.dto.controller.response.GetCityListResponseDto;
import org.project.tripus.dto.controller.response.GetCityResponseDto;
import org.project.tripus.dto.service.output.GetCityListOutputDto;
import org.project.tripus.dto.service.output.GetCityOutputDto;

@Mapper(componentModel = "spring")
public interface CityMapper {

    GetCityListResponseDto toResponse(GetCityListOutputDto output);

    GetCityResponseDto toResponse(GetCityOutputDto output);
}
