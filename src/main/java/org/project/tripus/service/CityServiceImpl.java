package org.project.tripus.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.CityDto;
import org.project.tripus.dto.TripDto;
import org.project.tripus.dto.output.GetCityListOutputDto;
import org.project.tripus.dto.output.GetCityListOutputDto.CityItem;
import org.project.tripus.entity.CityEntity;
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

    @Override
    public CityDto getData(int num) {
        // TODO Auto-generated method stub
        return cimapper.getData(num);
    }

    // city랑 trip이랑 join 써본거
//	@Override
//	public List<CityDto> getData(int num) {
//		// TODO Auto-generated method stub
//		return cimapper.getData(num);
//	}

//	@Override
//	public void getName(String name) {
//		// TODO Auto-generated method stub
//		cimapper.getName(name);
//	}

    @Override
    public List<TripDto> getTripData(int member_num, int city_num) {
        // TODO Auto-generated method stub
        return cimapper.getTripData(member_num, city_num);
    }

    @Override
    public int getLike(String place_id, int loginNum) {
        // TODO Auto-generated method stub
        Map<String, String> map = new HashMap<>();
        map.put("place_id", place_id);
        map.put("loginNum", Integer.toString(loginNum));
        return cimapper.getLike(map);
    }

    @Override
    public int insertLike(int place_id, int LoginNum) {
        // TODO Auto-generated method stub
        Map<String, Integer> map = new HashMap<>();
        map.put("place_id", place_id);
        map.put("member_num", LoginNum);
        return cimapper.insertLike(map);
    }

    @Override
    public void deleteLike(String place_id, int loginNum) {
        // TODO Auto-generated method stub
        Map<String, String> map = new HashMap<>();
        map.put("place_id", place_id);
        map.put("loginNum", Integer.toString(loginNum));
        cimapper.deleteLike(map);
    }


    // like table의 place_id, member_num 가져오기
    public List<Integer> getLikeTable(int loginNum) {
        // TODO Auto-generated method stub
        return cimapper.getLikeTable(loginNum);
    }

    public GetCityListOutputDto getCityList() {
        List<CityEntity> cityEntityList = cityRepository.findAll();

        List<CityItem> cityList = cityEntityList.stream().map(cityEntity -> {
            return CityItem.builder()
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
        }).toList();

        return GetCityListOutputDto.builder()
            .cityList(cityList)
            .build();
    }
}
