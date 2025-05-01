package org.project.tripus.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class GetCityListResponse {

    List<CityItem> cityList;

    @Getter
    @Setter
    @Builder
    public static class CityItem {

        private Long id;
        private String name;
        private String engName;
        private String country;
        private String fileName;
        private Integer areaCode;
        private Integer sigunguCode;
        private String x;
        private String y;
        private Integer cat;
    }
}
