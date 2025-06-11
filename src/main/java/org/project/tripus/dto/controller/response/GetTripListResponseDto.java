package org.project.tripus.dto.controller.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class GetTripListResponseDto {

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

            @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
            private LocalDate startDate;

            @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
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
