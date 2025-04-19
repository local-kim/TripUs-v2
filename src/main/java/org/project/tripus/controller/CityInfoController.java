package org.project.tripus.controller;

import java.util.HashMap;
import java.util.List;
import org.project.tripus.dto.CityDto;
import org.project.tripus.dto.PlaceDto;
import org.project.tripus.dto.TripDto;
import org.project.tripus.service.CityInfoService;
import org.project.tripus.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/city")
@CrossOrigin(origins = "*", exposedHeaders = "**")
public class CityInfoController {

    @Autowired
    private CityInfoService ciservice;

    @Autowired
    private PlanService planService;

    @GetMapping("/citydata")
    public CityDto getData(@RequestParam int num) {
        return ciservice.getData(num);
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
        return ciservice.getTripData(loginNum, city_num);
    }

    // 장소 좋아요
    @GetMapping("/like")
    public int getLike(@RequestParam String place_id, @RequestParam int loginNum) {
        System.out.println("mylike");
        System.out.println(ciservice.getLike(place_id, loginNum));
        return ciservice.getLike(place_id, loginNum);
    }

    @PostMapping("/insertlike")
    public void insertLike(@RequestBody HashMap<String, Object> request) {
//		System.out.println(request.get("place"));
//		System.out.println(request.get("place").getClass().getName());
//		LinkedHashMap<String, String> map = (LinkedHashMap<String, String>)request.get("place");
//		int place_id=Integer.parseInt(String.valueOf(request.get("place_id")));
//		PlaceDto place = (PlaceDto)request.get("place");
//		System.out.println(map);

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

        ciservice.insertLike(Integer.parseInt(place.getContentid()), loginNum);
    }

    @DeleteMapping("/deletelike")
    public void deleteLike(@RequestParam String place_id, @RequestParam int loginNum) {
        ciservice.deleteLike(place_id, loginNum);
    }

    @GetMapping("/liketable")
    public List<Integer> getLikeTable(@RequestParam int loginNum) {
        return ciservice.getLikeTable(loginNum);
    }

    // 도시 목록 페이지
    @GetMapping("/list")
    public List<CityDto> getCityList() {
        return ciservice.getCityList();
    }
}
