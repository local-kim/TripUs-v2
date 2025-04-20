package org.project.tripus.service;

import java.util.List;
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

public interface PlanService {

	public CityDto getCityCode(int cityNum);

	public List<PlaceDto> getMyPlaceList(int cityNum, int memberNum);

	public int insertTrip(TripDto trip);

	public int checkPlace(String contentId);

	public void insertPlace(PlaceDto place);

	public void insertItinerary(ItineraryDto itinerary);

	//	좋아요
	public int getPlanLike(int num, int loginNum);

	public int insertPlanLike(int num, int loginNum);

	public int deletePlanLike(int num, int loginNum);

	public int getTotalLike(int num);

	// 일정 수정 페이지
	public CityTripDto getTripInfo(int tripNum);

	public List<PlanPlaceDto> getPlaceList(int tripNum);

	public void deleteAllItinerary(int tripNum);

	// 인기 일정
	public List<TripRankDto> getTripRank();

	public List<TripRankDto> getTripRank3();

	//////////////////////////////////////////
	public List<PlanDto> getNavNum(int num);

	public List<PlanDto> getPlanDatas(int num);

	public List<PlanDateDto> getDate(int num);

	public List<PlanDateDto> getPlanMember(int num);

	public List<PlanMapDto> mapKakao(int num);
}
