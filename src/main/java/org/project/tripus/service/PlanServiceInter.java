package org.project.tripus.service;

import java.util.List;
import org.project.tripus.dto.CityDto;
import org.project.tripus.dto.ItineraryDto;
import org.project.tripus.dto.PlaceDto;
import org.project.tripus.dto.TripDto;

public interface PlanServiceInter {

	public CityDto getCityCode(int cityNum);
	public List<PlaceDto> getMyPlaceList(int cityNum, int memberNum);
	public int insertTrip(TripDto trip);
	public int checkPlace(String contentId);
	public void insertPlace(PlaceDto place);
	public void insertItinerary(ItineraryDto itinerary);
	
	//	좋아요
	public int getPlanLike(int num,int loginNum);
	public int insertPlanLike(int num, int loginNum);
	public int deletePlanLike(int num, int loginNum);
	public int getTotalLike(int num);

}
