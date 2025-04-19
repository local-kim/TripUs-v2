package org.project.tripus.controller;

import java.util.List;
import java.util.Map;
import org.project.tripus.dto.CityDto;
import org.project.tripus.dto.CityTripDto;
import org.project.tripus.dto.ItineraryDto;
import org.project.tripus.dto.PlaceDto;
import org.project.tripus.dto.PlanDateDto;
import org.project.tripus.dto.PlanDto;
import org.project.tripus.dto.PlanInsertDto;
import org.project.tripus.dto.PlanMapDto;
import org.project.tripus.dto.PlanPlaceDto;
import org.project.tripus.dto.TripDto;
import org.project.tripus.dto.TripRankDto;
import org.project.tripus.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/plan")
public class PlanController {
	
	@Autowired
	private PlanService planService;
	
	@GetMapping("/city-code")
	public CityDto getCityCode(
			@RequestParam int cityNum
			){
		return planService.getCityCode(cityNum);
	}
	
	@GetMapping("/my-place-list")
	public List<PlaceDto> getMyPlaceList(
			@RequestParam int cityNum,
			@RequestParam int loginNum
			){
		return planService.getMyPlaceList(cityNum, loginNum);
	}
	
	@PostMapping("/insert")
	public int insert(
			@RequestBody PlanInsertDto dto
			) throws Exception {
		List<List<PlaceDto>> plan = dto.getPlan();
		TripDto trip = dto.getTrip();
		int loginNum = dto.getLoginNum();
		
//		System.out.println(plan);
//		System.out.println(trip);
		
		// trip(여행 전체 정보)를 insert
		// member_num, city_num, start_date, end_date, days
		trip.setMemberNum(loginNum);
		trip.setName(trip.getCityName() + " 여행");
		
		// 방금 인서트한 trip_num을 받아와서 리턴
		int tripNum = planService.insertTrip(trip);
		
		for(int i = 0; i < plan.size(); i++) {
			for(int j = 0; j < plan.get(i).size(); j++) {
				PlaceDto place = plan.get(i).get(j);
				
				// place가 테이블에 없으면 insert
				// place_id,,,
				place.setCity_num(trip.getCityNum());
//				System.out.println(place);
				
				if(planService.checkPlace(place.getContentid()) == 0) {
					planService.insertPlace(place);
				}
				
				// itinerary(여행 일정 순서)를 insert
				// trip_num, day, order, place_id
				ItineraryDto itinerary = new ItineraryDto();
				itinerary.setTrip_num(tripNum);
				itinerary.setDay(i + 1);
				itinerary.setOrder(j + 1);
				itinerary.setPlace_id(place.getContentid());
				
				planService.insertItinerary(itinerary);
			}
		}
		
		return tripNum;
	}
	
	// 일정 수정 페이지
	@GetMapping("/trip-info")
	public CityTripDto getTripInfo(@RequestParam int tripNum) {
		return planService.getTripInfo(tripNum);
	}
	
	@GetMapping("/place-list")
	public List<PlanPlaceDto> getPlaceList(@RequestParam int tripNum){
		return planService.getPlaceList(tripNum);
	}
	
	@PostMapping("/update/{tripNum}/{cityNum}")
	public void updatePlan(@PathVariable int tripNum, @PathVariable int cityNum, @RequestBody List<List<PlaceDto>> plan) {
  		// tripNum에 대하여 존재하던 itinerary를 모두 삭제
		planService.deleteAllItinerary(tripNum);
		
		for(int i = 0; i < plan.size(); i++) {
			for(int j = 0; j < plan.get(i).size(); j++) {
				PlaceDto place = plan.get(i).get(j);
				
				// place가 테이블에 없으면 insert
				// place_id,,,
				place.setCity_num(cityNum);
				
				if(planService.checkPlace(place.getContentid()) == 0) {
					planService.insertPlace(place);
				}
				
				// itinerary(여행 일정 순서)를 insert
				// trip_num, day, order, place_id
				ItineraryDto itinerary = new ItineraryDto();
				itinerary.setTrip_num(tripNum);
				itinerary.setDay(i + 1);
				itinerary.setOrder(j + 1);
				itinerary.setPlace_id(place.getContentid());
				
				planService.insertItinerary(itinerary);
			}
		}
	}
	
	// 인기 일정
	@GetMapping("/rank")
	public List<TripRankDto> getTripRank(){
		return planService.getTripRank();
	}
	
	@GetMapping("/rank3")
	public List<TripRankDto> getTripRank3(){
		return planService.getTripRank3();
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	
	@GetMapping("/nav")
	public List<PlanDto> getNavNum(@RequestParam int num){
		return planService.getNavNum(num);
	}
	
	@GetMapping("/list")
	public List<PlanDto> getPlanDatas(@RequestParam int num){
		return planService.getPlanDatas(num);
	}
	
	@GetMapping("/pdate")
	public List<PlanDateDto> getDate(@RequestParam int num) {
		return planService.getDate(num);
	}
	
	@GetMapping("/name")
	public List<PlanDateDto> getPlanMember(@RequestParam int num) {
		return planService.getPlanMember(num);
	}
	
	@GetMapping("/map")
	public List<PlanMapDto> mapKakao (@RequestParam int num) {
		return planService.mapKakao(num);
	}
	
//	PlanLike 좋아요관련
	
	@GetMapping("/like")
	public int getPlanLike(@RequestParam int num,@RequestParam int loginNum) {
		return planService.getPlanLike(num,loginNum);
	}
	
	@PostMapping("/insertlike")
	public void insertPlanLike(@RequestBody Map<String, Integer> map){
	      planService.insertPlanLike(map.get("num"),map.get("loginNum"));
    }
	
	@DeleteMapping("/deletelike")
    public void deleteLike(@RequestParam int num, @RequestParam int loginNum) {
		planService.deletePlanLike(num, loginNum);
    }
	
	@GetMapping("totallike")
	public int getTotalLike(@RequestParam int num) {
		return planService.getTotalLike(num);
	}
}
