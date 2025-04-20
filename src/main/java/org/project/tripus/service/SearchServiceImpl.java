package org.project.tripus.service;

import java.util.List;
import org.project.tripus.dto.CityDto;
import org.project.tripus.mapper.SearchMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SearchServiceImpl implements SearchService {

    @Autowired
    SearchMapper mapper;

    @Override
    public List<CityDto> searchAuto(String searchWord) {
        // TODO Auto-generated method stub
        return mapper.searchAuto(searchWord);
    }

}
