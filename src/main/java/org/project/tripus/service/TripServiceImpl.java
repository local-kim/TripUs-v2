package org.project.tripus.service;

import static java.time.temporal.ChronoUnit.DAYS;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.repository.output.GetTripListRepositoryOutputDto;
import org.project.tripus.dto.service.input.CreateTripInputDto;
import org.project.tripus.dto.service.input.CreateTripInputDto.TripItem;
import org.project.tripus.dto.service.input.SaveTripPlaceItemInputDto;
import org.project.tripus.dto.service.input.UpdateTripInputDto;
import org.project.tripus.dto.service.output.CreateTripOutputDto;
import org.project.tripus.dto.service.output.GetTripListOutputDto;
import org.project.tripus.dto.service.output.GetTripListOutputDto.TripListItem;
import org.project.tripus.dto.service.output.GetTripListOutputDto.TripListItem.UserItem;
import org.project.tripus.dto.service.output.GetTripOutputDto;
import org.project.tripus.dto.service.output.GetTripOutputDto.CityItem;
import org.project.tripus.entity.CityEntity;
import org.project.tripus.entity.ItineraryEntity;
import org.project.tripus.entity.PlaceEntity;
import org.project.tripus.entity.TripEntity;
import org.project.tripus.entity.UserEntity;
import org.project.tripus.global.enums.ErrorCode;
import org.project.tripus.global.exception.CustomException;
import org.project.tripus.repository.ItineraryRepository;
import org.project.tripus.repository.TripRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class TripServiceImpl implements TripService {

    private final CityService cityService;
    private final PlaceService placeService;
    private final TripRepository tripRepository;
    private final ItineraryRepository itineraryRepository;

    /**
     * 여행과 일정을 생성합니다.
     *
     * @param input      여행과 일정 정보가 담긴 DTO
     * @param userEntity 현재 인증한 사용자 엔티티
     * @return 여행 ID가 담긴 DTO
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
        createItinerary(input.getItinerary(), tripEntity, cityEntity);

        // 3. 여행 ID 반환
        return CreateTripOutputDto.builder()
            .tripId(tripEntity.getId())
            .build();
    }

    /**
     * 일정 리스트를 기반으로 장소와 일정을 저장합니다.
     *
     * @param itinerary  저장할 일정 리스트
     * @param tripEntity 여행 엔티티
     * @param cityEntity 도시 엔티티
     * @throws CustomException 일정 배열의 크기가 여행 일수와 다른 경우 {@code INVALID_FORMAT} 예외를 발생시킵니다.
     */
    @Transactional
    public void createItinerary(List<List<SaveTripPlaceItemInputDto>> itinerary, TripEntity tripEntity, CityEntity cityEntity) {
        // 일정 배열의 크기가 여행 일수와 다를 때 예외 발생
        if(itinerary.size() != DAYS.between(tripEntity.getStartDate(), tripEntity.getEndDate()) + 1) {
            throw new CustomException(ErrorCode.INVALID_FORMAT, "일정 배열의 크기는 여행 일수와 같아야 합니다.");
        }

        for(int i = 0; i < itinerary.size(); i++) {
            for(int j = 0; j < itinerary.get(i).size(); j++) {
                SaveTripPlaceItemInputDto place = itinerary.get(i).get(j);

                // 1-1. 장소가 테이블에 존재하는지 확인
                PlaceEntity placeEntity = placeService.findPlaceByContentid(place.getContentid())
                    .orElseGet(() -> {
                        // 1-2. 존재하지 않으면 장소 엔티티로 변환 후 저장
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

                // 2. 일정 엔티티로 변환 후 저장
                ItineraryEntity itineraryEntity = ItineraryEntity.builder()
                    .trip(tripEntity)
                    .day(i + 1)
                    .seq(j + 1)
                    .place(placeEntity)
                    .build();

                createItineraryEntity(itineraryEntity);
            }
        }
    }

    /**
     * 여행 엔티티를 저장합니다.
     *
     * @param tripEntity 여행 엔티티
     */
    @Transactional
    public void createTripEntity(TripEntity tripEntity) {
        tripRepository.save(tripEntity);
    }

    /**
     * 일정 엔티티를 저장합니다.
     *
     * @param itineraryEntity 일정 엔티티
     */
    @Transactional
    public void createItineraryEntity(ItineraryEntity itineraryEntity) {
        itineraryRepository.save(itineraryEntity);
    }

    /**
     * 기간의 일 수를 계산합니다.
     *
     * @param startDate 기간의 시작 날짜
     * @param endDate   기간의 종료 날짜
     * @return 일 수
     */
    private int calculateDays(LocalDate startDate, LocalDate endDate) {
        return (int) (DAYS.between(startDate, endDate) + 1);
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

        int days = calculateDays(tripEntity.getStartDate(), tripEntity.getEndDate());

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
            .orElseThrow(() -> new CustomException(ErrorCode.TRIP_NOT_FOUND));
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

    /**
     * 여행 일정을 수정합니다.
     *
     * @param tripId     수정할 여행 ID
     * @param input      일정 정보가 담긴 DTO
     * @param userEntity 현재 인증한 사용자 엔티티
     * @throws CustomException 해당 여행에 접근할 수 없는 경우 {@code PERMISSION_DENIED} 예외를 발생시킵니다.
     */
    @Transactional
    public void updateTrip(Long tripId, UpdateTripInputDto input, UserEntity userEntity) {
        // 1. 수정 권한 검증
        TripEntity tripEntity = getTripEntityWithCityEntity(tripId);

        if(!Objects.equals(tripEntity.getUser().getId(), userEntity.getId())) {
            throw new CustomException(ErrorCode.PERMISSION_DENIED);
        }

        // 2. 기존의 모든 일정 삭제
        deleteAllItineraryEntity(tripId);

        // 3. 새로운 일정 저장
        createItinerary(input.getItinerary(), tripEntity, tripEntity.getCity());
    }

    /**
     * 여행 ID로 일정 엔티티를 모두 삭제합니다.
     *
     * @param tripId 일정을 삭제할 여행 ID
     * @return 삭제된 데이터 개수
     */
    @Transactional
    public int deleteAllItineraryEntity(Long tripId) {
        return itineraryRepository.deleteByTripId(tripId);
    }

    /**
     * 정렬 기준에 따라 여행 목록을 조회합니다.
     *
     * @param sort 정렬 기준 - 최신순, 좋아요 수
     * @return 여행, 도시, 사용자 정보, 좋아요 수의 리스트가 담긴 DTO
     * @throws CustomException 정렬 기준이 올바르지 않은 경우 {@code INVALID_FORMAT} 예외를 발생시킵니다.
     */
    public GetTripListOutputDto getTripList(String sort) {
        if(!"latest".equals(sort) && !"likes".equals(sort)) {
            throw new CustomException(ErrorCode.INVALID_FORMAT);
        }

        List<GetTripListRepositoryOutputDto> tripList = getTripListSortedBy(sort);

        List<TripListItem> tripListItems = tripList.stream().map(trip -> {
            TripListItem.TripItem tripItem = TripListItem.TripItem.builder()
                .id(trip.getTripId())
                .title(trip.getTitle())
                .startDate(trip.getStartDate())
                .endDate(trip.getEndDate())
                .days(calculateDays(trip.getStartDate(), trip.getEndDate()))
                .likes(trip.getLikes())
                .build();

            TripListItem.CityItem cityItem = TripListItem.CityItem.builder()
                .id(trip.getCityId())
                .name(trip.getCityName())
                .image(trip.getFileName())
                .build();

            UserItem userItem = UserItem.builder()
                .id(trip.getUserId())
                .username(trip.getUsername())
                .build();

            return TripListItem.builder()
                .trip(tripItem)
                .city(cityItem)
                .user(userItem)
                .build();
        }).toList();

        return GetTripListOutputDto.builder()
            .list(tripListItems)
            .build();
    }

    /**
     * 여행 엔티티와 연관된 도시 엔티티, 사용자 엔티티, 그리고 좋아요 수의 리스트를 조회합니다.
     *
     * @param sort 정렬 기준 - 최신순, 좋아요 수
     * @return 여행, 도시, 사용자 정보, 좋아요 수를 포함한 리스트. 조회 결과가 없는 경우 빈 리스트
     */
    public List<GetTripListRepositoryOutputDto> getTripListSortedBy(String sort) {
        return tripRepository.findAllOrderBy(sort);
    }
}
