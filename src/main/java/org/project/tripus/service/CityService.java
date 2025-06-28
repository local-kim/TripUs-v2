package org.project.tripus.service;

import java.util.List;
import org.project.tripus.dto.service.output.GetCityListOutputDto;
import org.project.tripus.dto.service.output.GetCityOutputDto;
import org.project.tripus.entity.CityEntity;

public interface CityService {

    GetCityListOutputDto getCityList();

    List<CityEntity> getCityEntityList();

    GetCityOutputDto getCity(Long id);

    CityEntity getCityEntityById(Long id);
}
