package org.project.tripus.repository;

import java.util.List;
import org.project.tripus.dto.repository.output.GetTripListRepositoryOutputDto;

public interface TripCustomRepository {

    List<GetTripListRepositoryOutputDto> findAllOrderBy(String sort);
}
