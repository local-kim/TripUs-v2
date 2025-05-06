package org.project.tripus.mapper;

import org.mapstruct.Mapper;
import org.project.tripus.dto.output.GetLikedPlaceListOutputDto;
import org.project.tripus.dto.response.GetLikedPlaceListResponseDto;

@Mapper(componentModel = "spring")
public interface PlaceMapper {

    GetLikedPlaceListResponseDto toResponse(GetLikedPlaceListOutputDto output);
}
