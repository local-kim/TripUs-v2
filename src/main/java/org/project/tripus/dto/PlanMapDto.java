package org.project.tripus.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Alias("planMap")
@Data
public class PlanMapDto {
	private int day;
	private int order;
	private int days;
	private double mapx;
	private double mapy;
	private String title;
}
