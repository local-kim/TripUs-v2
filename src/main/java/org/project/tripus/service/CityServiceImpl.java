package org.project.tripus.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.TripDto;
import org.project.tripus.dto.output.GetCityListOutput;
import org.project.tripus.dto.output.GetCityListOutput.CityItem;
import org.project.tripus.dto.output.GetCityOutput;
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

    public GetCityListOutput getCityList() {
        List<CityEntity> cityEntityList = cityRepository.findAll();

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

        return GetCityListOutput.builder()
            .cityList(cityList)
            .build();
    }

    public GetCityOutput getCity(Long id) {
        CityEntity cityEntity = cityRepository.findById(id)
            .orElseThrow(() -> new CustomException(ErrorEnum.CITY_NOT_FOUND));

        return GetCityOutput.builder()
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
