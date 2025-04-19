package org.project.tripus.dto;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("plan_insert")
public class PlanInsertDto {
	private List<List<PlaceDto>> plan;
	private TripDto trip;
	private int loginNum;
}
