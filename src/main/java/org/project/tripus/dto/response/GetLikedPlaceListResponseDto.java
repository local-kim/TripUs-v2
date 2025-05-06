package org.project.tripus.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class GetLikedPlaceListResponseDto {

    private List<PlaceItem> place;

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
