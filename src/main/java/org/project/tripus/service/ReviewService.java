package org.project.tripus.service;

import java.util.List;
import org.project.tripus.dto.ReviewDto;

public interface ReviewService {

   public int insertReview(ReviewDto dto);

   public void deleteReview(int num);

   public void deletePhoto(int num);

   public void oneDeletePhoto(int num);

   public int getTotalCount();

   public List<ReviewDto> getPagingList(int start, int perpage);

   public List<ReviewDto> getAllDatas(String place_id);

   public double getAvgStars(String place_id);

   public int getSumLikes(String place_id);

   public int getLike(String place_id, int loginNum);

   public int insertLike(int place_id, int LoginNum);

   public void deleteLike(String place_id, int loginNum);

   public List<ReviewDto> getData(int num);

   public String getOneDataPhoto(int num);

   public List<String> getDataFiles(int num);

   public void updateReview(ReviewDto dto);

   public void insertPhoto(String num, String file_name);

   public void updatePhoto(ReviewDto dto);
}