package org.project.tripus.service;

import java.util.List;
import org.project.tripus.dto.CityTripDto;
import org.project.tripus.dto.MemberDto;
import org.project.tripus.dto.ProfileDto;
import org.project.tripus.dto.TripDto;

public interface MypageServiceInter {
	
	public void userDelete(int num);
	
	public MemberDto getData(int num);
	
	public int userTrip(int member_num);
	
	public List<CityTripDto> getPagingList(int memberNum, int start, int perpage);
	
	public List<TripDto> getAllDates();
	
	public List<TripDto> getAllDates3(int memberNum);
	
	public int userReview(int member_num);
	
	//로딩시 사진 가져오기
	public String findPhoto(int member_num); //(파라미터임) public뒤에있는게 리졀트임 ㅇㅇ 
	
	//마이페이지 업데이트
	public void updateProfile(ProfileDto dto);
	
	//마이페이지 정보 업데이트
	public void updateProfile2(MemberDto dto);
	
	//마이페이지 일정 가져오기
	public List<CityTripDto>getAllDates2(int member_num);
	
	//일정 지우기
	public void tripDelete(int tripNum);
	
	//일정 이름 업데이트
	public void updateTripName(TripDto dto);
	
	//사진 추가하기
	public void profilePhotoInsert(ProfileDto dto);
	
	
	
}
