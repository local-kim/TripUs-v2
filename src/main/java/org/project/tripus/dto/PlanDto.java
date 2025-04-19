package org.project.tripus.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Alias("plan")
@Data
public class PlanDto {
	private int num;
	private int trip_num;
	private int day;
	private int order;
	private int place_id; 
	private int contentid;
	private int city_num;
	private double avg_star;
	private String cat2_name;
	private String mapx;
	private String mapy;
	private String image;
	private String name;
	private String firstimage;
	private String type;
	private String title;
	private String cat3;
	private String cat3_name;
	
}
