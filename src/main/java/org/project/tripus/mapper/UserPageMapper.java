package org.project.tripus.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.project.tripus.dto.CityTripDto;
import org.project.tripus.dto.MemberDto;
import org.project.tripus.dto.ReviewPlaceDto;

@Mapper
public interface UserPageMapper {

	public MemberDto getUserInfo(int memberNum);
//	public int getTripCount(int memberNum);
//	public int getReviewCount(int memberNum);
	public List<CityTripDto> getTripList(int memberNum);
	public List<ReviewPlaceDto> getReviewList(int memberNum);

}
