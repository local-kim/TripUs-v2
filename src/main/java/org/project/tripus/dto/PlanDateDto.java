package org.project.tripus.dto;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Alias("pdate")
@Data
public class PlanDateDto {
	private int num;
	private int days;
	private int member_num;
	private String name;
	@JsonFormat(pattern = "yyyy-MM-dd" ,timezone="Asia/Seoul")
	private Timestamp start_date;
	@JsonFormat(pattern = "yyyy-MM-dd" ,timezone="Asia/Seoul")
	private Timestamp end_date;
	private String file_name;
}
