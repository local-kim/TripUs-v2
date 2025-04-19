package org.project.tripus.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import org.project.tripus.dto.CityDto;
import org.project.tripus.dto.TripDto;

@Mapper
public interface CityInfoMapper {

	// wheather 데이터 가져오기
	public CityDto getData(int num);
//	public List<CityDto> getData(int num);
	
	// 검색되는 도시지역이름으로 지역번호 가져오기
//	public void getName(String name);
	
	// Trip데이타 가져오기
	public List<TripDto> getTripData(int member_num, int city_num);
	
	// 장소 좋아요
	public int getLike(Map<String ,String> map);
	// 장소 좋아요 추가
	public int insertLike(Map<String,Integer> map);
	// 장소 좋아요 삭제
	public void deleteLike(Map<String,String> map);
	// like table의 place_id, member_num 가져오기
	public List<Integer> getLikeTable(int loginNum);

	// 도시 목록 가져오기
	public List<CityDto> getCityList();

}
