package org.project.tripus.service;

import java.util.List;
import org.project.tripus.dto.CityTripDto;
import org.project.tripus.dto.MemberDto;
import org.project.tripus.dto.ReviewPlaceDto;
import org.project.tripus.mapper.UserPageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserPageServiceImpl implements UserPageService {

    @Autowired
    private UserPageMapper mapper;

    public MemberDto getUserInfo(int memberNum) {
        return mapper.getUserInfo(memberNum);
    }

//	public int getTripCount(int memberNum) {
//		return mapper.getTripCount(memberNum);
//	}
//	
//	public int getReviewCount(int memberNum) {
//		return mapper.getReviewCount(memberNum);
//	}

    public List<CityTripDto> getTripList(int memberNum) {
        return mapper.getTripList(memberNum);
    }

    public List<ReviewPlaceDto> getReviewList(int memberNum) {
        return mapper.getReviewList(memberNum);
    }
}
