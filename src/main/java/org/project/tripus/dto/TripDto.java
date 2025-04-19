package org.project.tripus.dto;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@Alias("trip")
public class TripDto {
	private int num;
	private int memberNum;
	private int cityNum;
	private String cityName;
	@JsonFormat(pattern = "yyyy-MM-dd" ,timezone="Asia/Seoul")
	private Date startDate;
	@JsonFormat(pattern = "yyyy-MM-dd" ,timezone="Asia/Seoul")
	private Date endDate;
	private int days;
	private String name;
}
