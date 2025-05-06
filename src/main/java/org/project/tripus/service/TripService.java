package org.project.tripus.service;

import java.util.List;
import org.project.tripus.dto.PlanDateDto;
import org.project.tripus.dto.PlanDto;
import org.project.tripus.dto.PlanMapDto;
import org.project.tripus.dto.PlanPlaceDto;
import org.project.tripus.dto.TripRankDto;
import org.project.tripus.dto.input.CreateTripInputDto;
import org.project.tripus.dto.output.CreateTripOutputDto;
import org.project.tripus.dto.output.GetTripOutputDto;
import org.project.tripus.entity.ItineraryEntity;
import org.project.tripus.entity.TripEntity;
import org.project.tripus.entity.UserEntity;

public interface TripService {

    CreateTripOutputDto createTrip(CreateTripInputDto input, UserEntity userEntity);

    void createTripEntity(TripEntity tripEntity);

    void createItineraryEntity(ItineraryEntity itineraryEntity);

    GetTripOutputDto getTrip(Long tripId);

    TripEntity getTripEntityWithCityEntity(Long tripId);

    List<ItineraryEntity> getItineraryEntityListWithPlaceEntity(Long tripId);

    //	좋아요
    int getPlanLike(int num, int loginNum);

    int insertPlanLike(int num, int loginNum);

    int deletePlanLike(int num, int loginNum);

    int getTotalLike(int num);

    List<PlanPlaceDto> getPlaceList(int tripNum);

    void deleteAllItinerary(int tripNum);

    // 인기 일정
    List<TripRankDto> getTripRank();

    List<TripRankDto> getTripRank3();

    //////////////////////////////////////////
    List<PlanDto> getNavNum(int num);

    List<PlanDto> getPlanDatas(int num);

    List<PlanDateDto> getDate(int num);

    List<PlanDateDto> getPlanMember(int num);

    List<PlanMapDto> mapKakao(int num);
}
