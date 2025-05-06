package org.project.tripus.service;

import java.util.List;
import java.util.Optional;
import org.project.tripus.dto.PlaceDto;
import org.project.tripus.entity.PlaceEntity;

public interface PlaceService {

    Optional<PlaceEntity> findPlaceByContentid(String contentid);

    void createPlaceEntity(PlaceEntity placeEntity);

    List<PlaceDto> getMyPlaceList(int cityNum, int memberNum);
}
