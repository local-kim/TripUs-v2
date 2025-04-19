package org.project.tripus.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.project.tripus.dto.ReviewDto;
import org.project.tripus.mapper.ReviewMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService implements ReviewServiceInter {
   
   @Autowired
   private ReviewMapper reviewMapper;

   @Override
   public int insertReview(ReviewDto dto) {
      // TODO Auto-generated method stub
      reviewMapper.insertReview(dto);
      return dto.getNum();

   }
   
   @Override
   public void insertPhoto(String num,String file_name) {
      // TODO Auto-generated method stub
      Map<String, String> map = new HashMap<>();
      map.put("num", num);
      map.put("file_name",file_name);
      reviewMapper.insertPhoto(map);
   }

   @Override
   public int getTotalCount() {
      // TODO Auto-generated method stub
      return reviewMapper.getTotalCount();
   }

   @Override
   public List<ReviewDto> getPagingList(int start, int perpage) {
      // TODO Auto-generated method stub
      Map<String, Integer> map = new HashMap<>();
      map.put("start", start);
      map.put("perpage", perpage);
      return reviewMapper.getPagingList(map);
   }

   @Override
   public List<ReviewDto> getAllDatas(String place_id) {
      // TODO Auto-generated method stub
      return reviewMapper.getAllDatas(place_id);
   }

   @Override
   public List<ReviewDto> getData(int num) {
      // TODO Auto-generated method stub
      return reviewMapper.getData(num);
   }
   
   @Override
   public String getOneDataPhoto(int num) {
      // TODO Auto-generated method stub
      return reviewMapper.getOneDataPhoto(num);
   }
   
   @Override
   public List<String> getDataFiles(int num) {
      // TODO Auto-generated method stub
      return reviewMapper.getDataFiles(num);
   }
   @Override
   public double getAvgStars(String place_id) {
      return reviewMapper.getAvgStars(place_id);
   }
   
   @Override
   public int getSumLikes(String place_id) {
      // TODO Auto-generated method stub
      return reviewMapper.getSumLikes(place_id);
   }
   
   @Override
   public int getLike(String place_id,int loginNum) {
      // TODO Auto-generated method stub
      Map<String, String> map = new HashMap<>();
      map.put("place_id", place_id);
      map.put("loginNum", Integer.toString(loginNum));
      return reviewMapper.getLike(map);
   }
   
   @Override
   public int insertLike(int place_id,int LoginNum) {
      // TODO Auto-generated method stub
      Map<String, Integer> map = new HashMap<>();
      map.put("place_id", place_id);
      map.put("member_num",LoginNum);
      return reviewMapper.insertLike(map);
   }
   
   @Override
   public void deleteLike(String place_id, int loginNum) {
      // TODO Auto-generated method stub
      Map<String, String> map = new HashMap<>();
      map.put("place_id", place_id);
      map.put("loginNum", Integer.toString(loginNum));
      reviewMapper.deleteLike(map);
   }
   
   @Override
   public void deleteReview(int num) {
      reviewMapper.deleteReview(num);
   }
   
   @Override
   public void deletePhoto(int num) {
      // TODO Auto-generated method stub
      reviewMapper.deletePhoto(num);
      
   }
   
   @Override
   public void oneDeletePhoto(int num) {
      // TODO Auto-generated method stub
      reviewMapper.oneDeletePhoto(num);
   }
   @Override
   public void updateReview(ReviewDto dto) {
      reviewMapper.updateReview(dto);
   }
   
   @Override
   public void updatePhoto(ReviewDto dto) {
      // TODO Auto-generated method stub
      
      reviewMapper.updatePhoto(dto);
   }

}