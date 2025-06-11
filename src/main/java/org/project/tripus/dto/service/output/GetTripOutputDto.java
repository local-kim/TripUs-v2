package org.project.tripus.dto.service.output;

import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class GetTripOutputDto {

    private CityItem city;

    private TripItem trip;

    private List<List<PlaceItem>> itinerary;

    @Getter
    @Setter
    @Builder
    public static class CityItem {

        private Long cityId;

        private String name;

        private String x;

        private String y;
    }

    @Getter
    @Setter
    @Builder
    public static class TripItem {

        private Long tripId;

        private String title;

        private LocalDate startDate;

        private LocalDate endDate;

        private int days;
    }

    @Getter
    @Setter
    @Builder
    public static class PlaceItem {

        private String contentid;

        private String contenttypeid;

        private String title;

        private String cat3;

        private String addr1;

        private String addr2;

        private String firstimage;

        private String mapx;

        private String mapy;
    }
}
