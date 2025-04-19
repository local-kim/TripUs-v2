package org.project.tripus.controller;

import java.util.HashMap;
import java.util.Map;
import org.project.tripus.service.MypageService;
import org.project.tripus.service.UserPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserPageController {
	
	@Autowired
	private UserPageService service;
	
	@Autowired
	private MypageService mypageService;

	@GetMapping("/info")
	public Map<String, Object> getInfo(@RequestParam int memberNum){
		Map<String, Object> map = new HashMap<>();
		
		// 1: 유저 정보(id, name, image)
		map.put("user", service.getUserInfo(memberNum));
		
		// 2: 일정, 리뷰 개수
		map.put("tripCount", mypageService.userTrip(memberNum));
		map.put("reviewCount", mypageService.userReview(memberNum));
		
		// 3: 일정 목록
		map.put("tripList", service.getTripList(memberNum));
		
		// 4: 후기 목록
		map.put("reviewList", service.getReviewList(memberNum));
		
		return map;
	}
}
