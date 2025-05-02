package org.project.tripus.mapper;

import org.mapstruct.Mapper;
import org.project.tripus.dto.output.GetCityListOutputDto;
import org.project.tripus.dto.output.GetCityOutputDto;
import org.project.tripus.dto.response.GetCityListResponseDto;
import org.project.tripus.dto.response.GetCityResponseDto;

@Mapper(componentModel = "spring")
public interface CityMapper {

    GetCityListResponseDto toResponse(GetCityListOutputDto output);

    GetCityResponseDto toResponse(GetCityOutputDto output);
}
