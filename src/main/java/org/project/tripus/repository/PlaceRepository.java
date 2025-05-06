package org.project.tripus.repository;

import java.util.Optional;
import org.project.tripus.entity.PlaceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceRepository extends JpaRepository<PlaceEntity, Long> {

    Optional<PlaceEntity> findTop1ByContentid(String contentid);
}
