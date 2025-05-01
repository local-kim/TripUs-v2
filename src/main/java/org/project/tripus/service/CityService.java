package org.project.tripus.service;

import java.util.List;
import org.project.tripus.dto.TripDto;
import org.project.tripus.dto.output.GetCityListOutput;
import org.project.tripus.dto.output.GetCityOutput;

public interface CityService {

    GetCityListOutput getCityList();

    GetCityOutput getCity(Long id);

    // Trip데이타 가져오기
    public List<TripDto> getTripData(int member_num, int city_num);

    // 장소 좋아요
    public int getLike(String place_id, int loginNum);

    // 장소 좋아요 추가
    public int insertLike(int place_id, int LoginNum);

    // 장소 좋아요 삭제
    public void deleteLike(String place_id, int loginNum);

    // like table의 place_id, member_num 가져오기
    public List<Integer> getLikeTable(int loginNum);
}
