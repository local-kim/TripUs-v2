package org.project.tripus.service;

import java.util.List;
import java.util.Optional;
import org.project.tripus.dto.output.GetLikedPlaceListOutputDto;
import org.project.tripus.entity.PlaceEntity;
import org.project.tripus.entity.UserEntity;

public interface PlaceService {

    Optional<PlaceEntity> findPlaceByContentid(String contentid);

    void createPlaceEntity(PlaceEntity placeEntity);

    GetLikedPlaceListOutputDto getLikedPlaceList(Long cityId, UserEntity userEntity);

    List<PlaceEntity> getLikedPlaceEntityList(Long cityId, UserEntity userEntity);
}
