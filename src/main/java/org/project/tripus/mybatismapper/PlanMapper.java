package org.project.tripus.mybatismapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import org.project.tripus.dto.CityDto;
import org.project.tripus.dto.CityTripDto;
import org.project.tripus.dto.ItineraryDto;
import org.project.tripus.dto.PlaceDto;
import org.project.tripus.dto.PlanDateDto;
import org.project.tripus.dto.PlanDto;
import org.project.tripus.dto.PlanMapDto;
import org.project.tripus.dto.PlanPlaceDto;
import org.project.tripus.dto.TripDto;
import org.project.tripus.dto.TripRankDto;

@Mapper
public interface PlanMapper {

	// 일정 만들기 페이지
	public CityDto getCityCode(int cityNum);
	public List<PlaceDto> getMyPlaceList(Map<String, Integer> map);
	public int insertTrip(TripDto trip);
	public void insertItinerary(ItineraryDto itinerary);
	public int checkPlace(String contentId);
	public void insertPlace(PlaceDto place);
	
	// 일정 수정 페이지
	public CityTripDto getTripInfo(int tripNum);
	public List<PlanPlaceDto> getPlaceList(int tripNum);
	public void deleteAllItinerary(int tripNum);
	
	// 인기 일정
	public List<TripRankDto> getTripRank();
	public List<TripRankDto> getTripRank3();
	
	// 일정 상세 페이지
	public List<PlanDto> getNavNum(int num);
	public List<PlanDto> getPlanDatas(int num);
	public List<PlanMapDto> mapKakao(int num);
	public List<PlanDateDto> getDate(int num);
	public List<PlanDateDto> getPlanMember(int num);
	
	// 일정 좋아요
	public int getPlanLike(Map<String ,Integer> map);
	public int insertPlanLike(Map<String,Integer> map);
	public int deletePlanLike(Map<String,Integer> map);
	public int getTotalLike(int num);

}
