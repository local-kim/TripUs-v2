package org.project.tripus.dto;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Alias("trip-rank")
@Data
public class TripRankDto {
	private int tripNum;
	private String tripName;
	@JsonFormat(pattern = "yyyy-MM-dd",timezone="Asia/Seoul")
	private Date start_date;
	@JsonFormat(pattern = "yyyy-MM-dd",timezone="Asia/Seoul")
	private Date end_date;
	private int days;
	private int memberNum;
	private String memberName;
	private int cityNum;
	private String cityName;
	private String image;
	private int count;
}
