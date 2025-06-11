package org.project.tripus.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.TripDto;
import org.project.tripus.dto.service.output.GetCityListOutputDto;
import org.project.tripus.dto.service.output.GetCityListOutputDto.CityItem;
import org.project.tripus.dto.service.output.GetCityOutputDto;
import org.project.tripus.entity.CityEntity;
import org.project.tripus.global.exception.CustomException;
import org.project.tripus.global.exception.ErrorEnum;
import org.project.tripus.mybatismapper.CityInfoMapper;
import org.project.tripus.repository.CityRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class CityServiceImpl implements CityService {

    private final CityInfoMapper cimapper;
    private final CityRepository cityRepository;

    /**
     * 전체 도시 목록을 조회하여 DTO를 생성하는 메서드
     *
     * @return GetCityListOutputDto
     */
    public GetCityListOutputDto getCityList() {
        List<CityEntity> cityEntityList = getCityEntityList();

        List<CityItem> cityList = cityEntityList.stream().map(cityEntity -> CityItem.builder()
            .id(cityEntity.getId())
            .name(cityEntity.getName())
            .engName(cityEntity.getEngName())
            .country(cityEntity.getCountry())
            .fileName(cityEntity.getFileName())
            .areaCode(cityEntity.getAreaCode())
            .sigunguCode(cityEntity.getSigunguCode())
            .x(cityEntity.getX())
            .y(cityEntity.getY())
            .cat(cityEntity.getCat())
            .build()).toList();

        return GetCityListOutputDto.builder()
            .cityList(cityList)
            .build();
    }

    /**
     * 전체 도시 목록을 조회하는 메서드
     *
     * @return 전체 도시 목록
     */
    public List<CityEntity> getCityEntityList() {
        return cityRepository.findAll();
    }

    /**
     * 도시 ID로 도시 엔티티를 조회하여 DTO를 생성하는 메서드
     *
     * @param id 도시 ID
     * @return GetCityOutputDto
     */
    public GetCityOutputDto getCity(Long id) {
        CityEntity cityEntity = getCityEntityById(id);

        return GetCityOutputDto.builder()
            .id(cityEntity.getId())
            .name(cityEntity.getName())
            .engName(cityEntity.getEngName())
            .country(cityEntity.getCountry())
            .fileName(cityEntity.getFileName())
            .areaCode(cityEntity.getAreaCode())
            .sigunguCode(cityEntity.getSigunguCode())
            .x(cityEntity.getX())
            .y(cityEntity.getY())
            .cat(cityEntity.getCat())
            .build();
    }

    /**
     * 도시 ID로 도시 엔티티를 조회하는 메서드
     *
     * @param id 도시 ID
     * @return 도시 엔티티
     * @throws CustomException 조회 결과가 없는 경우
     */
    public CityEntity getCityEntityById(Long id) {
        return cityRepository.findById(id)
            .orElseThrow(() -> new CustomException(ErrorEnum.CITY_NOT_FOUND));
    }


    /***************************************************/
    // 리팩토링 전

    public List<TripDto> getTripData(int member_num, int city_num) {
        return cimapper.getTripData(member_num, city_num);
    }

    public int getLike(String place_id, int loginNum) {
        Map<String, String> map = new HashMap<>();
        map.put("place_id", place_id);
        map.put("loginNum", Integer.toString(loginNum));
        return cimapper.getLike(map);
    }

    public int insertLike(int place_id, int LoginNum) {
        Map<String, Integer> map = new HashMap<>();
        map.put("place_id", place_id);
        map.put("member_num", LoginNum);
        return cimapper.insertLike(map);
    }

    public void deleteLike(String place_id, int loginNum) {
        Map<String, String> map = new HashMap<>();
        map.put("place_id", place_id);
        map.put("loginNum", Integer.toString(loginNum));
        cimapper.deleteLike(map);
    }


    // like table의 place_id, member_num 가져오기
    public List<Integer> getLikeTable(int loginNum) {
        return cimapper.getLikeTable(loginNum);
    }
}
