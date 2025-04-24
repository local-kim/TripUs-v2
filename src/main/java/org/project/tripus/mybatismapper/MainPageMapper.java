package org.project.tripus.mybatismapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.project.tripus.dto.CityDto;

@Mapper
public interface MainPageMapper {

	//도시 정보 가져오기
	public List<CityDto> getData();
	public List<CityDto> getData2();
	public List<CityDto> getData3();
	public List<CityDto> getData4();
	//모든 유저 일정 개수
	public int allUserTrip();
	
	//모든 유저수
	public int allUser();
	
	//모든 여행지 
	public int allPlace();
	
	//모든 리뷰댓글 
	public int allReview();

}
