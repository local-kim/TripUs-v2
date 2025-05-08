package org.project.tripus.dto.input;

import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CreateTripInputDto {

    private TripItem trip;

    private List<List<SaveTripPlaceItemInputDto>> itinerary;

    @Getter
    @Setter
    @Builder
    public static class TripItem {

        private Long cityId;

        private LocalDate startDate;

        private LocalDate endDate;
    }
}
