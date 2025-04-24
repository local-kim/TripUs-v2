package org.project.tripus.mapper;

import org.mapstruct.Mapper;
import org.project.tripus.dto.output.GetCityListOutputDto;
import org.project.tripus.dto.response.GetCityListResponseDto;

@Mapper(componentModel = "spring")
public interface CityMapper {

    GetCityListResponseDto toResponse(GetCityListOutputDto output);
}
