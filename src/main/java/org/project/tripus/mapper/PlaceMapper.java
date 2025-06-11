package org.project.tripus.mapper;

import org.mapstruct.Mapper;
import org.project.tripus.dto.controller.response.GetLikedPlaceListResponseDto;
import org.project.tripus.dto.service.output.GetLikedPlaceListOutputDto;

@Mapper(componentModel = "spring")
public interface PlaceMapper {

    GetLikedPlaceListResponseDto toResponse(GetLikedPlaceListOutputDto output);
}
