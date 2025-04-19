package org.project.tripus.service;

import java.util.List;
import org.project.tripus.dto.CityDto;
import org.project.tripus.mapper.MainPageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MainPageService implements MainPageServiceInter {
	
	@Autowired
	MainPageMapper mapper;

	@Override
	public List<CityDto> getData() {
		// TODO Auto-generated method stub
		
		
		return mapper.getData();
		
	}

	
	@Override
	public List<CityDto> getData2() {
		// TODO Auto-generated method stub
		
		
		return mapper.getData2();
		
	}
	@Override
	public List<CityDto> getData3() {
		// TODO Auto-generated method stub
		
		
		return mapper.getData3();
		
	}
	@Override
	public List<CityDto> getData4() {
		// TODO Auto-generated method stub
		
		
		return mapper.getData4();
		
	}
	
	@Override
	public int allUserTrip() {
		// TODO Auto-generated method stub
		return mapper.allUserTrip();
	}
	
	@Override
	public int allReview() {
		// TODO Auto-generated method stub
		return mapper.allReview();
	}
	
	@Override
	public int allPlace() {
		// TODO Auto-generated method stub
		return mapper.allPlace();
	}
	
	@Override
	public int allUser() {
		// TODO Auto-generated method stub
		return mapper.allUser();
	}
	
}
