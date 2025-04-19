package org.project.tripus.dto;

import lombok.Data;
import org.apache.ibatis.type.Alias;

@Alias("city")
@Data
public class CityDto {

    private int num;
    private String name;
    private String eng_name;
    private String country;
    private String image;
    private int area_code;
    private int sigungu_code;
    private int cat;
    private String x;
    private String y;
    private int count;
}
