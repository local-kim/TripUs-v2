package org.project.tripus.repository;

import java.util.List;
import org.project.tripus.entity.ItineraryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ItineraryRepository extends JpaRepository<ItineraryEntity, Long> {

    @Query("SELECT i FROM ItineraryEntity i JOIN FETCH i.place WHERE i.trip.id = :tripId ORDER BY i.day, i.seq")
    List<ItineraryEntity> findByTripIdWithPlace(Long tripId);
}
