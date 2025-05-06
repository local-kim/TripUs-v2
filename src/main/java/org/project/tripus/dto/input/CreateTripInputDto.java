package org.project.tripus.dto.input;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    private List<List<PlaceItem>> itinerary;

    @Getter
    @Setter
    @Builder
    public static class TripItem {

        private Long cityId;

        @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDate startDate;

        @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        private LocalDate endDate;
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
