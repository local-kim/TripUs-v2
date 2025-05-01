package org.project.tripus.mapper;

import org.mapstruct.Mapper;
import org.project.tripus.dto.output.GetCityListOutput;
import org.project.tripus.dto.output.GetCityOutput;
import org.project.tripus.dto.response.GetCityListResponse;
import org.project.tripus.dto.response.GetCityResponse;

@Mapper(componentModel = "spring")
public interface CityMapper {

    GetCityListResponse toResponse(GetCityListOutput output);

    GetCityResponse toResponse(GetCityOutput output);
}
