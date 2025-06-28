package org.project.tripus.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.service.output.GetCityListOutputDto;
import org.project.tripus.dto.service.output.GetCityListOutputDto.CityItem;
import org.project.tripus.dto.service.output.GetCityOutputDto;
import org.project.tripus.entity.CityEntity;
import org.project.tripus.global.exception.CustomException;
import org.project.tripus.global.exception.ErrorCode;
import org.project.tripus.repository.CityRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class CityServiceImpl implements CityService {

    private final CityRepository cityRepository;

    /**
     * 전체 도시 목록을 조회합니다.
     *
     * @return GetCityListOutputDto 전체 도시 목록이 담긴 DTO
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
     * 전체 도시 엔티티 목록을 조회합니다.
     *
     * @return 전체 도시 엔티티 목록
     */
    public List<CityEntity> getCityEntityList() {
        return cityRepository.findAll();
    }

    /**
     * 도시 ID로 도시를 조회합니다.
     *
     * @param id 도시 ID
     * @return GetCityOutputDto 도시 정보가 담긴 DTO
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
     * 도시 ID로 도시 엔티티를 조회합니다.
     *
     * @param id 도시 ID
     * @return 도시 엔티티
     * @throws CustomException 조회 결과가 없는 경우 {@code CITY_NOT_FOUND} 예외를 발생시킵니다.
     */
    public CityEntity getCityEntityById(Long id) {
        return cityRepository.findById(id)
            .orElseThrow(() -> new CustomException(ErrorCode.CITY_NOT_FOUND));
    }
}
