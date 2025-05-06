package org.project.tripus.mapper;

import java.util.List;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.project.tripus.dto.input.CreateTripInputDto;
import org.project.tripus.dto.input.CreateTripInputDto.PlaceItem;
import org.project.tripus.dto.output.CreateTripOutputDto;
import org.project.tripus.dto.output.GetTripOutputDto;
import org.project.tripus.dto.request.CreateTripRequestDto;
import org.project.tripus.dto.response.CreateTripResponseDto;
import org.project.tripus.dto.response.GetTripResponseDto;

@Mapper(componentModel = "spring")
public interface TripMapper {

    // 여행 일정 생성
    default CreateTripInputDto toInput(CreateTripRequestDto request) {
        return CreateTripInputDto.builder()
            .trip(mapTripItem(request.getTrip()))
            .itinerary(mapItineraryCreateTrip(request.getItinerary()))
            .build();
    }

    default CreateTripInputDto.TripItem mapTripItem(CreateTripRequestDto.TripItem request) {
        return CreateTripInputDto.TripItem.builder()
            .cityId(request.getCityId())
            .startDate(request.getStartDate())
            .endDate(request.getEndDate())
            .build();
    }

    default List<List<PlaceItem>> mapItineraryCreateTrip(List<List<CreateTripRequestDto.PlaceItem>> request) {
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

    // 여행 일정 조회
//    GetTripResponseDto toResponse(GetTripOutputDto output);

    default GetTripResponseDto toResponse(GetTripOutputDto output) {
        return GetTripResponseDto.builder()
            .city(mapCityItem(output.getCity()))
            .trip(mapTripItem(output.getTrip()))
            .itinerary(mapItineraryGetTrip(output.getItinerary()))
            .build();
    }

    default GetTripResponseDto.CityItem mapCityItem(GetTripOutputDto.CityItem output) {
        return GetTripResponseDto.CityItem.builder()
            .cityId(output.getCityId())
            .name(output.getName())
            .x(output.getX())
            .y(output.getY())
            .build();
    }

    default GetTripResponseDto.TripItem mapTripItem(GetTripOutputDto.TripItem output) {
        return GetTripResponseDto.TripItem.builder()
            .tripId(output.getTripId())
            .title(output.getTitle())
            .startDate(output.getStartDate())
            .endDate(output.getEndDate())
            .days(output.getDays())
            .build();
    }

    default List<List<GetTripResponseDto.PlaceItem>> mapItineraryGetTrip(List<List<GetTripOutputDto.PlaceItem>> output) {
        if(output == null) {
            return null;
        }
        return output.stream()
            .map(innerList -> innerList.stream()
                .map(this::mapPlaceItem)
                .collect(Collectors.toList()))
            .collect(Collectors.toList());
    }

    default GetTripResponseDto.PlaceItem mapPlaceItem(GetTripOutputDto.PlaceItem output) {
        return GetTripResponseDto.PlaceItem.builder()
            .contentid(output.getContentid())
            .contenttypeid(output.getContenttypeid())
            .title(output.getTitle())
            .cat3(output.getCat3())
            .addr1(output.getAddr1())
            .addr2(output.getAddr2())
            .firstimage(output.getFirstimage())
            .mapx(output.getMapx())
            .mapy(output.getMapy())
            .build();
    }
}
