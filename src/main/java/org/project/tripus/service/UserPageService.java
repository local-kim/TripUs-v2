package org.project.tripus.service;

import java.util.List;
import org.project.tripus.dto.CityTripDto;
import org.project.tripus.dto.MemberDto;
import org.project.tripus.dto.ReviewPlaceDto;

public interface UserPageService {

    MemberDto getUserInfo(int memberNum);

    List<CityTripDto> getTripList(int memberNum);

    List<ReviewPlaceDto> getReviewList(int memberNum);
}
