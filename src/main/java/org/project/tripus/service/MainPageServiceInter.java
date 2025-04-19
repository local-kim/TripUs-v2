package org.project.tripus.service;

import java.util.List;
import org.project.tripus.dto.CityDto;

public interface MainPageServiceInter	{
	
	public List<CityDto> getData();
	public List<CityDto> getData2();
	public List<CityDto> getData3();
	public List<CityDto> getData4();
	public int allUserTrip();
	public int allUser();
	public int allPlace();
	public int allReview();

}
