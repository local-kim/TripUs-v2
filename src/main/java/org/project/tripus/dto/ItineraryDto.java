package org.project.tripus.dto;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@Alias("itinerary")
public class ItineraryDto {
	private int trip_num;
	private int day;
	private int order;
	private String place_id;

}
