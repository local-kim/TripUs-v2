package org.project.tripus.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.sql.Timestamp;
import lombok.Data;
import org.apache.ibatis.type.Alias;

@Alias("review")
@Data
public class ReviewDto {
   private int num;
   private int review_photo_num;
   private String place_id;
   private int member_num;
   private String name;
   private double stars;
   private int like;
   private String content;
   private String file_name;
   @JsonFormat(pattern = "yyyy-MM-dd" ,timezone="Asia/Seoul")
   private Timestamp created_at;
}