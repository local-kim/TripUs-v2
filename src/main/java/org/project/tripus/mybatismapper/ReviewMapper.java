package org.project.tripus.mybatismapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import org.project.tripus.dto.ReviewDto;

@Mapper
public interface ReviewMapper {

   public void insertReview(ReviewDto dto);
   public void insertPhoto(Map<String,String> map);
   public void deleteReview(int num);
   public void deletePhoto(int num);
   public void oneDeletePhoto(int review_photo_num);
   public int getTotalCount();
   public List<ReviewDto> getPagingList(Map<String,Integer> map);
   public List<ReviewDto> getAllDatas(String place_id);
   public double getAvgStars(String place_id);
   public int getSumLikes(String place_id);
   public int getLike(Map<String ,String> map);
   public int insertLike(Map<String,Integer> map);
   public void deleteLike(Map<String,String> map);
   public List<ReviewDto> getData(int num);
   public String getOneDataPhoto(int review_photo_num);
   public List<String> getDataFiles(int num); 
   public void updateReview(ReviewDto dto);
   public void updatePhoto(ReviewDto dto);
   
}