package org.project.tripus.mapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import org.project.tripus.dto.CityTripDto;
import org.project.tripus.dto.MemberDto;
import org.project.tripus.dto.ProfileDto;
import org.project.tripus.dto.TripDto;

@Mapper
public interface MyPageMapper {
	
	// user 로그인 정보수정
	public MemberDto getMemberData(MemberDto dto);

	// 회원 탈퇴
	public void userDelete(int num);
	
	//id얻기
	public int getUserId(String id);
	
	//유저 정보 가져오기
	public MemberDto getData(int num);
	
	//유저 일정 갯수 가져오기
	public int userTrip(int member_num);
	
	
	
	//유저 일정 페이징 처리
	public List<CityTripDto> getPagingList(Map<String, Integer>map);
	
	//유저 일정 정보
	public List<TripDto> getAllDates();
	
	//유저 리뷰 갯수 가져오기
	public int userReview(int member_num);
	
	//마이페이지 프로필 등록
	public void insertProfile(ProfileDto dto);
	
	//로딩시 사진 가져오기
	public String findPhoto(int member_num); //(파라미터임) public뒤에있는게 리졀트임 ㅇㅇ 
	
	//마이페이지  사진 업데이트
	public void updateProfile(ProfileDto dto);
	
	//마이페이지 정보 업데이트
	public void updateProfile2(MemberDto dto);
	
	//일정 리스트 정보 가져오기
	public List<CityTripDto> getAllDates2(int member_num);
	
	// 일정 지우기
	public void tripDelete(int tripNum);
	
	//일정 이름 업데이트
	public void updateTripName(Map<String, String> map);
	
	//캘린
	public List<TripDto> getAllDates3(int memberNum);
	
	//사진 추가하기
	public void profilePhotoInsert(ProfileDto dto);
}
