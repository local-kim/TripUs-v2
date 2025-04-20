package org.project.tripus.service;

import java.util.List;
import org.project.tripus.dto.CityDto;

public interface SearchService {

	public List<CityDto> searchAuto(String searchWord);
}


