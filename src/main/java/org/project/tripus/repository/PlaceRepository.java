package org.project.tripus.repository;

import java.util.List;
import java.util.Optional;
import org.project.tripus.entity.PlaceEntity;
import org.project.tripus.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceRepository extends JpaRepository<PlaceEntity, Long> {

    Optional<PlaceEntity> findTop1ByContentid(String contentid);

    @Query("SELECT p FROM PlaceEntity p, PlaceLikeEntity pl WHERE p.city.id = :cityId AND pl.user = :userEntity")
    List<PlaceEntity> findLikedPlaceByCityIdAndUser(Long cityId, UserEntity userEntity);
}
