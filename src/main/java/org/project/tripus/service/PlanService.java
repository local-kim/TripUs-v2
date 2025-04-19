package org.project.tripus.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import org.project.tripus.mapper.PlanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlanService implements PlanServiceInter {

	@Autowired
	private PlanMapper planMapper;
	
	// 일정 만들기 페이지
	@Override
	public CityDto getCityCode(int cityNum) {
		return planMapper.getCityCode(cityNum);
	}
	
	@Override
	public List<PlaceDto> getMyPlaceList(int cityNum, int memberNum) {
		Map<String, Integer> map = new HashMap<>();
		map.put("city_num", cityNum);
		map.put("member_num", memberNum);
		
		return planMapper.getMyPlaceList(map);
	}
	
	@Override
	public int insertTrip(TripDto trip) {
		planMapper.insertTrip(trip);
		return trip.getNum();
	}
	
	@Override
	public void insertItinerary(ItineraryDto itinerary) {
		planMapper.insertItinerary(itinerary);
	}
	
	@Override
	public int checkPlace(String contentId) {
		return planMapper.checkPlace(contentId);
	}
	
	@Override
	public void insertPlace(PlaceDto place) {
		planMapper.insertPlace(place);
	}
	
	// 일정 수정 페이지
	public CityTripDto getTripInfo(int tripNum) {
		return planMapper.getTripInfo(tripNum);
	}
	
	public List<PlanPlaceDto> getPlaceList(int tripNum){
		return planMapper.getPlaceList(tripNum);
	}
	
	public void deleteAllItinerary(int tripNum) {
		planMapper.deleteAllItinerary(tripNum);
	}
	
	// 인기 일정
	public List<TripRankDto> getTripRank(){
		return planMapper.getTripRank();
	}
	public List<TripRankDto> getTripRank3(){
		return planMapper.getTripRank3();
	}
	
	//////////////////////////////////////////
	public List<PlanDto> getNavNum(int num) {
		return planMapper.getNavNum(num);
	}
	
	public List<PlanDto> getPlanDatas(int num) {
		return planMapper.getPlanDatas(num);
	}
	
	public List<PlanDateDto> getDate(int num) {
		return planMapper.getDate(num);
	}
	
	public List<PlanDateDto> getPlanMember(int num) {
		return planMapper.getPlanMember(num);
	}
	
	public List<PlanMapDto> mapKakao (int num) {
		return planMapper.mapKakao(num);
	}
	
//	PlanLike 좋아요 
	@Override
	public int getPlanLike(int num, int loginNum) {
		// TODO Auto-generated method stub
		Map<String, Integer> map = new HashMap<>();
	    map.put("num", num);
	    map.put("loginNum", loginNum);
	    return planMapper.getPlanLike(map);
	}
	
	@Override
	public int insertPlanLike(int num,int loginNum) {
		// TODO Auto-generated method stub
	    Map<String, Integer> map = new HashMap<>();
	    map.put("num", num);
	    map.put("loginNum",loginNum);
	    return planMapper.insertPlanLike(map);
	}
	
	@Override
	public int deletePlanLike(int num, int loginNum) {
	   // TODO Auto-generated method stub
	   Map<String, Integer> map = new HashMap<>();
	   map.put("num", num);
	   map.put("loginNum", loginNum);
	   return planMapper.deletePlanLike(map);
	}
	
	@Override
	public int getTotalLike(int num) {
		return planMapper.getTotalLike(num);
	}
}
