package org.project.tripus.mapper;

import java.util.List;
import org.project.tripus.dto.CityDto;

public interface SearchMapper {

	public List<CityDto> searchAuto(String searchWord);

}
