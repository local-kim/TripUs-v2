package org.project.tripus.service;

import java.util.List;
import org.project.tripus.dto.PlanDateDto;
import org.project.tripus.dto.PlanDto;
import org.project.tripus.dto.PlanMapDto;
import org.project.tripus.dto.PlanPlaceDto;
import org.project.tripus.dto.TripRankDto;
import org.project.tripus.dto.service.input.CreateTripInputDto;
import org.project.tripus.dto.service.input.SaveTripPlaceItemInputDto;
import org.project.tripus.dto.service.input.UpdateTripInputDto;
import org.project.tripus.dto.service.output.CreateTripOutputDto;
import org.project.tripus.dto.service.output.GetTripListOutputDto;
import org.project.tripus.dto.service.output.GetTripOutputDto;
import org.project.tripus.entity.CityEntity;
import org.project.tripus.entity.ItineraryEntity;
import org.project.tripus.entity.TripEntity;
import org.project.tripus.entity.UserEntity;

public interface TripService {

    CreateTripOutputDto createTrip(CreateTripInputDto input, UserEntity userEntity);

    void createItinerary(List<List<SaveTripPlaceItemInputDto>> itinerary, TripEntity tripEntity, CityEntity cityEntity);

    void createTripEntity(TripEntity tripEntity);

    void createItineraryEntity(ItineraryEntity itineraryEntity);

    GetTripOutputDto getTrip(Long tripId);

    TripEntity getTripEntityWithCityEntity(Long tripId);

    List<ItineraryEntity> getItineraryEntityListWithPlaceEntity(Long tripId);

    void updateTrip(Long tripId, UpdateTripInputDto input, UserEntity userEntity);

    int deleteAllItineraryEntity(Long tripId);

    //	좋아요
    int getPlanLike(int num, int loginNum);

    int insertPlanLike(int num, int loginNum);

    int deletePlanLike(int num, int loginNum);

    int getTotalLike(int num);

    List<PlanPlaceDto> getPlaceList(int tripNum);


    // 인기 일정
    GetTripListOutputDto getTripList(String sort);

    List<TripRankDto> getTripRank3();

    //////////////////////////////////////////
    List<PlanDto> getNavNum(int num);

    List<PlanDto> getPlanDatas(int num);

    List<PlanDateDto> getDate(int num);

    List<PlanDateDto> getPlanMember(int num);

    List<PlanMapDto> mapKakao(int num);
}
