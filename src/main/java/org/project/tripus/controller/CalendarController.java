package org.project.tripus.controller;

import java.util.List;
import org.project.tripus.dto.TripDto;
import org.project.tripus.mapper.MyPageMapper;
import org.project.tripus.service.MypageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class CalendarController {

    @Autowired
    private MypageService service;

    @Autowired
    MyPageMapper mapper;

    @GetMapping("/calendar")
    public List<TripDto> calendar(@RequestParam int loginNum) {
        return service.getAllDates3(loginNum);
    }
}
