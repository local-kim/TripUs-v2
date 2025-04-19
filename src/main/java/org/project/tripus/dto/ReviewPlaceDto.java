package org.project.tripus.dto;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@Alias("review-place")
public class ReviewPlaceDto {
	private int review_num;
	private String place_id;
	private double stars;
	private String content;
	@JsonFormat(pattern = "yyyy-MM-dd" ,timezone="Asia/Seoul")
	private Timestamp created_at;
	private String title;
	private String cat3_name;
	private int city_num;
	private String city_name;
	private String firstimage;
}
