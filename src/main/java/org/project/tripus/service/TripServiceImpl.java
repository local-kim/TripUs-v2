package org.project.tripus.service;

import static java.time.temporal.ChronoUnit.DAYS;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.PlanDateDto;
import org.project.tripus.dto.PlanDto;
import org.project.tripus.dto.PlanMapDto;
import org.project.tripus.dto.PlanPlaceDto;
import org.project.tripus.dto.TripRankDto;
import org.project.tripus.dto.input.CreateTripInputDto;
import org.project.tripus.dto.input.CreateTripInputDto.PlaceItem;
import org.project.tripus.dto.input.CreateTripInputDto.TripItem;
import org.project.tripus.dto.output.CreateTripOutputDto;
import org.project.tripus.dto.output.GetTripOutputDto;
import org.project.tripus.dto.output.GetTripOutputDto.CityItem;
import org.project.tripus.entity.CityEntity;
import org.project.tripus.entity.ItineraryEntity;
import org.project.tripus.entity.PlaceEntity;
import org.project.tripus.entity.TripEntity;
import org.project.tripus.entity.UserEntity;
import org.project.tripus.global.exception.CustomException;
import org.project.tripus.global.exception.ErrorEnum;
import org.project.tripus.mybatismapper.PlanMapper;
import org.project.tripus.repository.ItineraryRepository;
import org.project.tripus.repository.TripRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class TripServiceImpl implements TripService {

    private final PlanMapper planMapper;
    private final CityService cityService;
    private final PlaceService placeService;
    private final TripRepository tripRepository;
    private final ItineraryRepository itineraryRepository;

    /**
     * 여행과 일정을 생성하는 메서드
     *
     * @param input      여행과 일정 정보가 담긴 DTO
     * @param userEntity 현재 인증한 사용자 엔티티
     * @return 여행 ID가 담긴 DTO
     * @throws CustomException 일정 배열의 크기가 여행 일수와 다른 경우
     */
    @Transactional
    public CreateTripOutputDto createTrip(CreateTripInputDto input, UserEntity userEntity) {
        // 1. 여행
        TripItem trip = input.getTrip();

        // 1-1. 도시 엔티티 조회
        CityEntity cityEntity = cityService.getCityEntityById(trip.getCityId());

        // 1-2. 여행 엔티티로 변환 후 저장
        TripEntity tripEntity = TripEntity.builder()
            .city(cityEntity)
            .user(userEntity)
            .title(cityEntity.getName() + " 여행")
            .startDate(trip.getStartDate())
            .endDate(trip.getEndDate())
            .build();

        createTripEntity(tripEntity);

        // 2. 일정
        List<List<PlaceItem>> itinerary = input.getItinerary();

        // 일정 배열의 크기가 여행 일수와 다를 때 예외 발생
        if(itinerary.size() != DAYS.between(tripEntity.getStartDate(), tripEntity.getEndDate()) + 1) {
            throw new CustomException(ErrorEnum.INVALID_FORMAT, "일정 배열의 크기는 여행 일수와 같아야 합니다.");
        }

        for(int i = 0; i < itinerary.size(); i++) {
            for(int j = 0; j < itinerary.get(i).size(); j++) {
                PlaceItem place = itinerary.get(i).get(j);

                // 2-1. 장소가 테이블에 존재하는지 확인
                PlaceEntity placeEntity = placeService.findPlaceByContentid(place.getContentid())
                    .orElseGet(() -> {
                        // 2-2. 존재하지 않으면 장소 엔티티로 변환 후 저장
                        PlaceEntity newPlaceEntity = PlaceEntity.builder()
                            .city(cityEntity)
                            .contentid(place.getContentid())
                            .contenttypeid(place.getContenttypeid())
                            .title(place.getTitle())
                            .cat3(place.getCat3())
                            .addr1(place.getAddr1())
                            .addr2(place.getAddr2())
                            .firstimage(place.getFirstimage())
                            .mapx(place.getMapx())
                            .mapy(place.getMapy())
                            .build();

                        placeService.createPlaceEntity(newPlaceEntity);

                        return newPlaceEntity;
                    });

                // 2-3. 일정 엔티티로 변환 후 저장
                ItineraryEntity itineraryEntity = ItineraryEntity.builder()
                    .trip(tripEntity)
                    .day(i + 1)
                    .seq(j + 1)
                    .place(placeEntity)
                    .build();

                createItineraryEntity(itineraryEntity);
            }
        }

        // 3. 여행 ID 반환
        return CreateTripOutputDto.builder()
            .tripId(tripEntity.getId())
            .build();
    }

    /**
     * 여행 엔티티를 저장하는 메서드
     *
     * @param tripEntity 여행 엔티티
     */
    @Transactional
    public void createTripEntity(TripEntity tripEntity) {
        tripRepository.save(tripEntity);
    }

    /**
     * 일정 엔티티를 저장하는 메서드
     *
     * @param itineraryEntity 일정 엔티티
     */
    @Transactional
    public void createItineraryEntity(ItineraryEntity itineraryEntity) {
        itineraryRepository.save(itineraryEntity);
    }

    /**
     * 여행 일정을 조회합니다.
     *
     * @param tripId 여행 ID
     * @return 도시, 여행, 일정 정보가 담긴 DTO
     */
    public GetTripOutputDto getTrip(Long tripId) {
        // 1. 도시, 여행 조회
        TripEntity tripEntity = getTripEntityWithCityEntity(tripId);
        CityEntity cityEntity = tripEntity.getCity();

        int days = (int) (DAYS.between(tripEntity.getStartDate(), tripEntity.getEndDate()) + 1);

        // 2. 일정 조회
        List<ItineraryEntity> itineraryEntityList = getItineraryEntityListWithPlaceEntity(tripId);

        // 3. DTO로 변환
        CityItem cityItem = CityItem.builder()
            .cityId(cityEntity.getId())
            .name(cityEntity.getName())
            .x(cityEntity.getX())
            .y(cityEntity.getY())
            .build();

        GetTripOutputDto.TripItem tripItem = GetTripOutputDto.TripItem.builder()
            .tripId(tripEntity.getId())
            .title(tripEntity.getTitle())
            .startDate(tripEntity.getStartDate())
            .endDate(tripEntity.getEndDate())
            .days(days)
            .build();

        // 3-1. 일정의 1차원 배열 -> 장소의 2차원 배열로 바꾸기
        List<List<GetTripOutputDto.PlaceItem>> placeItemList = new ArrayList<>();

        for(int i = 0; i < days; i++) {
            placeItemList.add(new ArrayList<>());
        }

        for(ItineraryEntity itineraryEntity : itineraryEntityList) {
            GetTripOutputDto.PlaceItem placeItem = GetTripOutputDto.PlaceItem.builder()
                .contentid(itineraryEntity.getPlace().getContentid())
                .contenttypeid(itineraryEntity.getPlace().getContenttypeid())
                .title(itineraryEntity.getPlace().getTitle())
                .cat3(itineraryEntity.getPlace().getCat3())
                .addr1(itineraryEntity.getPlace().getAddr1())
                .addr2(itineraryEntity.getPlace().getAddr2())
                .firstimage(itineraryEntity.getPlace().getFirstimage())
                .mapx(itineraryEntity.getPlace().getMapx())
                .mapy(itineraryEntity.getPlace().getMapy())
                .build();

            placeItemList.get(itineraryEntity.getDay() - 1).add(placeItem);
        }

        return GetTripOutputDto.builder()
            .city(cityItem)
            .trip(tripItem)
            .itinerary(placeItemList)
            .build();
    }

    /**
     * 여행 ID로 여행 엔티티와 연관된 도시 엔티티를 함께 조회합니다.
     *
     * @param tripId 조회할 여행 ID
     * @return 도시 엔티티가 포함된 여행 엔티티
     * @throws CustomException 조회 결과가 없는 경우 {@code TRIP_NOT_FOUND} 예외를 발생시킵니다.
     */
    public TripEntity getTripEntityWithCityEntity(Long tripId) {
        return tripRepository.findByIdWithCity(tripId)
            .orElseThrow(() -> new CustomException(ErrorEnum.TRIP_NOT_FOUND));
    }

    /**
     * 여행 ID로 일정 엔티티와 연관된 장소 엔티티의 리스트를 조회합니다.
     *
     * @param tripId 조회할 여행 ID
     * @return day, seq를 기준으로 정렬된 장소 엔티티를 포함한 일정 엔티티 리스트. 조회 결과가 없는 경우 빈 리스트
     */
    public List<ItineraryEntity> getItineraryEntityListWithPlaceEntity(Long tripId) {
        return itineraryRepository.findByTripIdWithPlace(tripId);
    }

    // 리팩토링 전

    public List<PlanPlaceDto> getPlaceList(int tripNum) {
        return planMapper.getPlaceList(tripNum);
    }

    public void deleteAllItinerary(int tripNum) {
        planMapper.deleteAllItinerary(tripNum);
    }

    // 인기 일정
    public List<TripRankDto> getTripRank() {
        return planMapper.getTripRank();
    }

    public List<TripRankDto> getTripRank3() {
        return planMapper.getTripRank3();
    }

    //////////////////////////////////////////
    public List<PlanDto> getNavNum(int num) {
        return planMapper.getNavNum(num);
    }

    public List<PlanDto> getPlanDatas(int num) {
        return planMapper.getPlanDatas(num);
    }

    public List<PlanDateDto> getDate(int num) {
        return planMapper.getDate(num);
    }

    public List<PlanDateDto> getPlanMember(int num) {
        return planMapper.getPlanMember(num);
    }

    public List<PlanMapDto> mapKakao(int num) {
        return planMapper.mapKakao(num);
    }

    //	PlanLike 좋아요
    @Override
    public int getPlanLike(int num, int loginNum) {
        // TODO Auto-generated method stub
        Map<String, Integer> map = new HashMap<>();
        map.put("num", num);
        map.put("loginNum", loginNum);
        return planMapper.getPlanLike(map);
    }

    @Override
    public int insertPlanLike(int num, int loginNum) {
        // TODO Auto-generated method stub
        Map<String, Integer> map = new HashMap<>();
        map.put("num", num);
        map.put("loginNum", loginNum);
        return planMapper.insertPlanLike(map);
    }

    @Override
    public int deletePlanLike(int num, int loginNum) {
        // TODO Auto-generated method stub
        Map<String, Integer> map = new HashMap<>();
        map.put("num", num);
        map.put("loginNum", loginNum);
        return planMapper.deletePlanLike(map);
    }

    @Override
    public int getTotalLike(int num) {
        return planMapper.getTotalLike(num);
    }
}
