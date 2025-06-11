package org.project.tripus.repository;

import java.util.Optional;
import org.project.tripus.entity.TripEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TripRepository extends JpaRepository<TripEntity, Long>, TripCustomRepository {

    @Query("SELECT t FROM TripEntity t JOIN FETCH t.city WHERE t.id = :id")
    Optional<TripEntity> findByIdWithCity(Long id);
}
