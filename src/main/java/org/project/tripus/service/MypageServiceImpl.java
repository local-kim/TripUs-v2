package org.project.tripus.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.project.tripus.dto.CityTripDto;
import org.project.tripus.dto.MemberDto;
import org.project.tripus.dto.ProfileDto;
import org.project.tripus.dto.TripDto;
import org.project.tripus.mapper.MyPageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MypageServiceImpl implements MypageService {

    @Autowired
    MyPageMapper mapper;

    @Override
    public void userDelete(int num) {
        // TODO Auto-generated method stub
        mapper.userDelete(num);

    }

    @Override
    public MemberDto getData(int num) {
        // TODO Auto-generated method stub
        return mapper.getData(num);
    }

    @Override
    public int userTrip(int member_num) {
        // TODO Auto-generated method stub
        return mapper.userTrip(member_num);
    }

    @Override
    public List<CityTripDto> getPagingList(int memberNum, int start, int perpage) {
        // TODO Auto-generated method stub
        Map<String, Integer> map = new HashMap<>();
        map.put("member_num", memberNum);
        map.put("start", start);
        map.put("perpage", perpage);

        return mapper.getPagingList(map);
    }

    @Override
    public List<TripDto> getAllDates() {
        // TODO Auto-generated method stub
        return mapper.getAllDates();
    }

    @Override
    public int userReview(int member_num) {
        // TODO Auto-generated method stub
        return mapper.userReview(member_num);
    }

    @Override
    public String findPhoto(int member_num) {
        // TODO Auto-generated method stub
        return mapper.findPhoto(member_num);
    }

    @Override
    public void updateProfile(ProfileDto dto) {
        // TODO Auto-generated method stub
        mapper.updateProfile(dto);

    }

    @Override
    public void updateProfile2(MemberDto dto) {
        // TODO Auto-generated method stub
        mapper.updateProfile2(dto);

    }

    @Override
    public List<CityTripDto> getAllDates2(int member_num) {
        // TODO Auto-generated method stub
        return mapper.getAllDates2(member_num);

    }

    @Override
    public void tripDelete(int tripNum) {
        // TODO Auto-generated method stub

        mapper.tripDelete(tripNum);
    }

    @Override
    public void updateTripName(TripDto dto) {
        // TODO Auto-generated method stub
        Map<String, String> map = new HashMap<String, String>();
        map.put("num", Integer.toString(dto.getNum()));
        map.put("name", dto.getName());
        mapper.updateTripName(map);
    }

    @Override
    public List<TripDto> getAllDates3(int memberNum) {
        // TODO Auto-generated method stub

        return mapper.getAllDates3(memberNum);
    }

    @Override
    public void profilePhotoInsert(ProfileDto dto) {
        // TODO Auto-generated method stub
        mapper.profilePhotoInsert(dto);
    }
}
	