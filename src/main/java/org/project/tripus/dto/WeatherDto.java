package org.project.tripus.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Alias("weather")
@Data
public class WeatherDto {
	private int num;
	private String name;
	private String country;
	private int area_code;
	private int sigungu_code;
}
