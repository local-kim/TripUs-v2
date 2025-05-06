package org.project.tripus.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.PlanDateDto;
import org.project.tripus.dto.PlanDto;
import org.project.tripus.dto.PlanMapDto;
import org.project.tripus.dto.TripRankDto;
import org.project.tripus.dto.input.CreateTripInputDto;
import org.project.tripus.dto.output.CreateTripOutputDto;
import org.project.tripus.dto.output.GetTripOutputDto;
import org.project.tripus.dto.request.CreateTripRequestDto;
import org.project.tripus.dto.response.CreateTripResponseDto;
import org.project.tripus.dto.response.GetTripResponseDto;
import org.project.tripus.global.response.CommonResponse;
import org.project.tripus.global.security.CustomUserDetails;
import org.project.tripus.mapper.TripMapper;
import org.project.tripus.service.PlaceService;
import org.project.tripus.service.TripService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Tag(name = "여행 API", description = "여행, 일정, 여행 좋아요")
@RequestMapping("/trip")
@RestController
public class TripController {

    private final TripService tripService;
    private final PlaceService placeService;
    private final TripMapper tripMapper;

    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "여행 일정 생성 성공"),
        @ApiResponse(responseCode = "400", description = "1. 잘못된 입력 형식, 2. 일정 배열의 크기가 여행 일수와 다른 경우"),
        @ApiResponse(responseCode = "401", description = "토큰 인증 실패"),
        @ApiResponse(responseCode = "404", description = "존재하지 않는 도시"),
    })
    @Operation(summary = "여행 일정 생성")
    @SecurityRequirement(name = "JWT")
    @PreAuthorize("isAuthenticated()")
    @PostMapping("")
    public ResponseEntity<?> createTrip(
        @RequestBody CreateTripRequestDto request,
        @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        CreateTripInputDto input = tripMapper.toInput(request);
        CreateTripOutputDto output = tripService.createTrip(input, customUserDetails.getUserEntity());
        CreateTripResponseDto response = tripMapper.toResponse(output);

        return ResponseEntity.status(HttpStatus.CREATED)
            .body(CommonResponse.success("여행 일정 생성 성공", response));
    }

    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "여행 일정 조회 성공"),
        @ApiResponse(responseCode = "404", description = "존재하지 않는 일정")
    })
    @Operation(summary = "여행 일정 조회")
    @GetMapping("/{id}")
    public ResponseEntity<?> getTrip(@PathVariable Long id) {
        GetTripOutputDto output = tripService.getTrip(id);
        GetTripResponseDto response = tripMapper.toResponse(output);

        return ResponseEntity.status(HttpStatus.OK)
            .body(CommonResponse.success("여행 일정 조회 성공", response));
    }


//    @PostMapping("/update/{tripNum}/{cityNum}")
//    public void updatePlan(@PathVariable int tripNum, @PathVariable int cityNum,
//        @RequestBody List<List<PlaceDto>> plan) {
//        // tripNum에 대하여 존재하던 itinerary를 모두 삭제
//        tripService.deleteAllItinerary(tripNum);
//
//        for(int i = 0; i < plan.size(); i++) {
//            for(int j = 0; j < plan.get(i).size(); j++) {
//                PlaceDto place = plan.get(i).get(j);
//
//                // place가 테이블에 없으면 insert
//                // place_id,,,
//                place.setCity_num(cityNum);
//
//                if(tripService.existsPlace(place.getContentid()) == 0) {
//                    tripService.insertPlace(place);
//                }
//
//                // itinerary(여행 일정 순서)를 insert
//                // trip_num, day, order, place_id
//                ItineraryDto itinerary = new ItineraryDto();
//                itinerary.setTrip_num(tripNum);
//                itinerary.setDay(i + 1);
//                itinerary.setOrder(j + 1);
//                itinerary.setPlace_id(place.getContentid());
//
//                tripService.saveItinerary(itinerary);
//            }
//        }
//    }

    // 인기 일정
    @GetMapping("/rank")
    public List<TripRankDto> getTripRank() {
        return tripService.getTripRank();
    }

    @GetMapping("/rank3")
    public List<TripRankDto> getTripRank3() {
        return tripService.getTripRank3();
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////

    @GetMapping("/nav")
    public List<PlanDto> getNavNum(@RequestParam int num) {
        return tripService.getNavNum(num);
    }

    @GetMapping("/list")
    public List<PlanDto> getPlanDatas(@RequestParam int num) {
        return tripService.getPlanDatas(num);
    }

    @GetMapping("/pdate")
    public List<PlanDateDto> getDate(@RequestParam int num) {
        return tripService.getDate(num);
    }

    @GetMapping("/name")
    public List<PlanDateDto> getPlanMember(@RequestParam int num) {
        return tripService.getPlanMember(num);
    }

    @GetMapping("/map")
    public List<PlanMapDto> mapKakao(@RequestParam int num) {
        return tripService.mapKakao(num);
    }

//	PlanLike 좋아요관련

    @GetMapping("/like")
    public int getPlanLike(@RequestParam int num, @RequestParam int loginNum) {
        return tripService.getPlanLike(num, loginNum);
    }

    @PostMapping("/insertlike")
    public void insertPlanLike(@RequestBody Map<String, Integer> map) {
        tripService.insertPlanLike(map.get("num"), map.get("loginNum"));
    }

    @DeleteMapping("/deletelike")
    public void deleteLike(@RequestParam int num, @RequestParam int loginNum) {
        tripService.deletePlanLike(num, loginNum);
    }

    @GetMapping("totallike")
    public int getTotalLike(@RequestParam int num) {
        return tripService.getTotalLike(num);
    }
}
