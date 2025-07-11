package org.project.tripus.dto.controller.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class GetCityResponseDto {

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
