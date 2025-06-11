package org.project.tripus.mapper;

import java.util.List;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.project.tripus.dto.controller.request.CreateTripRequestDto;
import org.project.tripus.dto.controller.request.SaveTripPlaceItemRequestDto;
import org.project.tripus.dto.controller.request.UpdateTripRequestDto;
import org.project.tripus.dto.controller.response.CreateTripResponseDto;
import org.project.tripus.dto.controller.response.GetTripListResponseDto;
import org.project.tripus.dto.controller.response.GetTripResponseDto;
import org.project.tripus.dto.service.input.CreateTripInputDto;
import org.project.tripus.dto.service.input.SaveTripPlaceItemInputDto;
import org.project.tripus.dto.service.input.UpdateTripInputDto;
import org.project.tripus.dto.service.output.CreateTripOutputDto;
import org.project.tripus.dto.service.output.GetTripListOutputDto;
import org.project.tripus.dto.service.output.GetTripOutputDto;

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

    default List<List<SaveTripPlaceItemInputDto>> mapItineraryCreateTrip(List<List<SaveTripPlaceItemRequestDto>> request) {
        if(request == null) {
            return null;
        }

        return request.stream()
            .map(innerList -> innerList.stream()
                .map(this::mapPlaceItem)
                .collect(Collectors.toList()))
            .collect(Collectors.toList());
    }

    default SaveTripPlaceItemInputDto mapPlaceItem(SaveTripPlaceItemRequestDto request) {
        return SaveTripPlaceItemInputDto.builder()
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

    // 여행 일정 수정
    default UpdateTripInputDto toInput(UpdateTripRequestDto request) {
        return UpdateTripInputDto.builder()
            .itinerary(mapItineraryUpdateTrip(request.getItinerary()))
            .build();
    }

    default List<List<SaveTripPlaceItemInputDto>> mapItineraryUpdateTrip(List<List<SaveTripPlaceItemRequestDto>> request) {
        if(request == null) {
            return null;
        }

        return request.stream()
            .map(innerList -> innerList.stream()
                .map(this::mapPlaceItem)
                .collect(Collectors.toList()))
            .collect(Collectors.toList());
    }

    // 여행 목록 조회
    default GetTripListResponseDto toResponse(GetTripListOutputDto output) {
        return GetTripListResponseDto.builder()
            .list(mapTripList(output.getList()))
            .build();
    }

    default List<GetTripListResponseDto.TripListItem> mapTripList(List<GetTripListOutputDto.TripListItem> list) {
        if(list == null) {
            return null;
        }

        return list.stream()
            .map(this::mapTripListItem)
            .collect(Collectors.toList());
    }

    default GetTripListResponseDto.TripListItem mapTripListItem(GetTripListOutputDto.TripListItem output) {
        return GetTripListResponseDto.TripListItem.builder()
            .trip(mapTripItem(output.getTrip()))
            .city(mapCityItem(output.getCity()))
            .user(mapUserItem(output.getUser()))
            .build();
    }

    default GetTripListResponseDto.TripListItem.TripItem mapTripItem(GetTripListOutputDto.TripListItem.TripItem output) {
        return GetTripListResponseDto.TripListItem.TripItem.builder()
            .id(output.getId())
            .title(output.getTitle())
            .startDate(output.getStartDate())
            .endDate(output.getEndDate())
            .days(output.getDays())
            .likes(output.getLikes())
            .build();
    }

    default GetTripListResponseDto.TripListItem.CityItem mapCityItem(GetTripListOutputDto.TripListItem.CityItem output) {
        return GetTripListResponseDto.TripListItem.CityItem.builder()
            .id(output.getId())
            .name(output.getName())
            .image(output.getImage())
            .build();
    }

    default GetTripListResponseDto.TripListItem.UserItem mapUserItem(GetTripListOutputDto.TripListItem.UserItem output) {
        return GetTripListResponseDto.TripListItem.UserItem.builder()
            .id(output.getId())
            .username(output.getUsername())
            .build();
    }
}
