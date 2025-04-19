package org.project.tripus.service;

import java.util.List;
import org.project.tripus.dto.CityDto;
import org.project.tripus.dto.TripDto;

public interface CityInfoServiceInter {

	// wheatherplace 데이터 가져오기
	public CityDto getData(int num);
//	public List<CityDto> getData(int num);
	
	// 검색되는 도시지역이름으로 지역번호 가져오기
//	public void getName(String name);

	// Trip데이타 가져오기
	public List<TripDto> getTripData(int member_num, int city_num);

	// 장소 좋아요
	public int getLike(String place_id,int loginNum);
	// 장소 좋아요 추가
	public int insertLike(int place_id,int LoginNum);
	// 장소 좋아요 삭제
	public void deleteLike(String place_id,int loginNum);
	// like table의 place_id, member_num 가져오기
	public List<Integer> getLikeTable(int loginNum);
	
	
	// 현지씌 작품 돈터치!!!
	// 도시 목록 가져오기
	public List<CityDto> getCityList();
}
