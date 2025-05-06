package org.project.tripus.mapper;

import java.util.List;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.project.tripus.dto.input.CreateTripInputDto;
import org.project.tripus.dto.input.CreateTripInputDto.PlaceItem;
import org.project.tripus.dto.output.CreateTripOutputDto;
import org.project.tripus.dto.request.CreateTripRequestDto;
import org.project.tripus.dto.response.CreateTripResponseDto;

@Mapper(componentModel = "spring")
public interface TripMapper {

    default CreateTripInputDto toInput(CreateTripRequestDto request) {
        return CreateTripInputDto.builder()
            .trip(mapTripItem(request.getTrip()))
            .itinerary(mapItinerary(request.getItinerary()))
            .build();
    }

    default CreateTripInputDto.TripItem mapTripItem(CreateTripRequestDto.TripItem request) {
        return CreateTripInputDto.TripItem.builder()
            .cityId(request.getCityId())
            .startDate(request.getStartDate())
            .endDate(request.getEndDate())
            .build();
    }

    default List<List<PlaceItem>> mapItinerary(List<List<CreateTripRequestDto.PlaceItem>> request) {
        if(request == null) {
            return null;
        }
        return request.stream()
            .map(innerList -> innerList.stream()
                .map(this::mapPlaceItem)
                .collect(Collectors.toList()))
            .collect(Collectors.toList());
    }

    default CreateTripInputDto.PlaceItem mapPlaceItem(CreateTripRequestDto.PlaceItem request) {
        return CreateTripInputDto.PlaceItem.builder()
            .contentid(request.getContentid())
            .contenttypeid(request.getContenttypeid())
            .title(request.getTitle())
            .cat3(request.getCat3())
            .addr1(request.getAddr1())
            .addr2(request.getAddr2())
            .firstimage(request.getFirstimage())
            .mapx(request.getMapx())
            .mapy(request.getMapy())
            .build();
    }

    CreateTripResponseDto toResponse(CreateTripOutputDto output);
}
