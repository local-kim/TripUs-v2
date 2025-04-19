package org.project.tripus.service;

import java.util.List;
import org.project.tripus.dto.CityDto;

public interface SearchServiceInter {
	public List<CityDto> searchAuto(String searchWord);
}


