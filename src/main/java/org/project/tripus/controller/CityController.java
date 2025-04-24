package org.project.tripus.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.HashMap;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.CityDto;
import org.project.tripus.dto.PlaceDto;
import org.project.tripus.dto.TripDto;
import org.project.tripus.dto.output.GetCityListOutputDto;
import org.project.tripus.dto.response.GetCityListResponseDto;
import org.project.tripus.global.response.CommonResponse;
import org.project.tripus.mapper.CityMapper;
import org.project.tripus.service.CityService;
import org.project.tripus.service.PlanService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Tag(name = "도시 API", description = "도시에 관한 API")
@RequestMapping("/city")
@RestController
public class CityController {

    private final CityService cityService;
    private final PlanService planService;
    private final CityMapper cityMapper;

    @GetMapping("/citydata")
    public CityDto getData(@RequestParam int num) {
        return cityService.getData(num);
    }

    // city랑 trip이랑 join 써본거
//	@GetMapping("/citydata")
//	public List<CityDto> getData(@RequestParam int num) {
//		return ciservice.getData(num);
//	}

//	@GetMapping("/placename")
//	public void getName(@RequestParam String name) {
//		ciservice.getName(name);
//	}

    @GetMapping("/tripdata")
    public List<TripDto> getTripData(
        @RequestParam int loginNum,
        @RequestParam int city_num
    ) {
        return cityService.getTripData(loginNum, city_num);
    }

    // 장소 좋아요
    @GetMapping("/like")
    public int getLike(@RequestParam String place_id, @RequestParam int loginNum) {
        System.out.println("mylike");
        System.out.println(cityService.getLike(place_id, loginNum));
        return cityService.getLike(place_id, loginNum);
    }

    @PostMapping("/insertlike")
    public void insertLike(@RequestBody HashMap<String, Object> request) {
        PlaceDto place = new PlaceDto();

        place.setCity_num(Integer.parseInt((String) request.get("cityNum")));

        place.setContentid((String) request.get("contentid"));
        place.setContenttypeid((String) request.get("contenttypeid"));
        place.setTitle((String) request.get("title"));
        place.setCat3((String) request.get("cat3"));
        place.setAddr1((String) request.get("addr1"));
        place.setAddr2((String) request.get("addr2"));
        place.setFirstimage((String) request.get("firstimage"));
        place.setMapx((String) request.get("mapx"));
        place.setMapy((String) request.get("mapy"));

        if(planService.checkPlace(place.getContentid()) == 0) {
            planService.insertPlace(place);
        }

        int loginNum = (Integer) request.get("loginNum");
        request.get("check");

        cityService.insertLike(Integer.parseInt(place.getContentid()), loginNum);
    }

    @DeleteMapping("/deletelike")
    public void deleteLike(@RequestParam String place_id, @RequestParam int loginNum) {
        cityService.deleteLike(place_id, loginNum);
    }

    @GetMapping("/liketable")
    public List<Integer> getLikeTable(@RequestParam int loginNum) {
        return cityService.getLikeTable(loginNum);
    }

    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "도시 목록 조회 성공")
    })
    @Operation(summary = "도시 목록 조회")
    @GetMapping("/list")
    public ResponseEntity<?> getCityList() {
        GetCityListOutputDto output = cityService.getCityList();
        GetCityListResponseDto response = cityMapper.toResponse(output);

        return ResponseEntity.status(HttpStatus.OK)
            .body(CommonResponse.success("도시 목록 조회 성공", response));
    }
}
