package org.project.tripus.dto.repository.output;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetTripListRepositoryOutputDto {

    private Long tripId;

    private String title;

    private LocalDate startDate;

    private LocalDate endDate;

    private Long likes;

    private Long cityId;

    private String cityName;

    private String fileName;

    private Long userId;

    private String username;
}
