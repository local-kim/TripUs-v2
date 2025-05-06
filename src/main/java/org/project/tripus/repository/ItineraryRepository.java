package org.project.tripus.repository;

import org.project.tripus.entity.ItineraryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItineraryRepository extends JpaRepository<ItineraryEntity, Long> {

}
