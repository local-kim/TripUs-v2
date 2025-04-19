package org.project.tripus.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Alias("plan-place")
@Data
public class PlanPlaceDto {
	private int day;
	private int order;
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