package org.project.tripus.dto.service.output;

import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class GetTripListOutputDto {

    private List<TripListItem> list;

    @Getter
    @Setter
    @Builder
    public static class TripListItem {

        private TripItem trip;

        private CityItem city;

        private UserItem user;

        @Getter
        @Setter
        @Builder
        public static class TripItem {

            private Long id;

            private String title;

            private LocalDate startDate;

            private LocalDate endDate;

            private int days;

            private Long likes;
        }

        @Getter
        @Setter
        @Builder
        public static class CityItem {

            private Long id;

            private String name;

            private String image;
        }

        @Getter
        @Setter
        @Builder
        public static class UserItem {

            private Long id;

            private String username;
        }
    }
}
