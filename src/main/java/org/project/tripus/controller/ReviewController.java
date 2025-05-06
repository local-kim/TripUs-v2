package org.project.tripus.controller;

import jakarta.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import org.project.tripus.dto.ReviewDto;
import org.project.tripus.service.ReviewService;
import org.project.tripus.service.TripService;
import org.project.tripus.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
@RequestMapping("/review")
public class ReviewController {
   
   @Autowired
   private ReviewService reviewService;
   
   @Autowired
   private TripService tripService;
   
   List<String> photoName=new ArrayList<String>(); //리엑트에서 업로드한 이미지명
   //@Autowired
   //private ReviewMapper reviewMapper;
//   @Autowired
//   private MemerService memberService;
   
   @GetMapping("/deleteUploadPhoto")
   public void deleteUploadPhoto(@RequestParam int idx) {
	   System.out.println(photoName);
	   System.out.println(idx);
	   photoName.remove(idx);
	   System.out.println(photoName);
   }
   
   @PostMapping("/upload")
      public List<String> fileUpload(
       HttpServletRequest request, @RequestParam List<MultipartFile> imagefile) {
      
      //업로드할 폴더 위치
            String path=request.getServletContext().getRealPath("/review_photo");
            
      for(String name:photoName) {
         //직전에 업로드한 이미지 삭제하기
         File file =new File(path+"/"+name);
         
         //만약 존재할 경우 삭제
         if(file.exists())
            file.delete();
         }
         
         photoName.clear();
         
      for(MultipartFile f:imagefile){
      //파일명
      String fileName=f.getOriginalFilename();
      System.out.println("fileName="+fileName);
      
      
      //파일명 변경
      FileUtil fileUtil =new FileUtil();
      String changedName = fileUtil.changeFileName(fileName);
      photoName.add(changedName);
      System.out.println("fileName="+fileName+"=>"+changedName);
      
      //save폴더에 업로드
      try {
         f.transferTo(new File(path+"/"+changedName));
         }catch(IllegalStateException | IOException e) {
            e.printStackTrace();
         }
      }
        return photoName;
            
   }
   
   @PostMapping("/insert")
   public void insert(@RequestBody ReviewDto dto) {
//     int member_num=18;
//	   dto.setMember_num();)
      System.out.println(dto);
      int num=reviewService.insertReview(dto);
      
      if(photoName!=null) {
         for(String fn:photoName) {
         reviewService.insertPhoto(Integer.toString(num),fn);
         }
         
      }
      photoName.clear();
   }
   
   @PostMapping("/update")
   public void update(@RequestBody ReviewDto dto) {
      System.out.println("update"+dto);
      //사진이 있을경우 이미지명 넣기
      //dto.setFile_name(photoName);
      int num=dto.getNum();
//      reviewService.deletePhoto(num);
      dto.setNum(num);
//      dto.setFile_name(photoName);
//      reviewService.insertPhoto(dto);
      if(photoName!=null) {
         for(String fn:photoName) {
         reviewService.insertPhoto(Integer.toString(num),fn);
         }
      }
      reviewService.updateReview(dto);
      photoName.clear();
   }
   
   @DeleteMapping("/delete")
   public void delete(@RequestParam int num,HttpServletRequest request) {
      
      String path=request.getServletContext().getRealPath("/review_photo");
      List<ReviewDto> photo=reviewService.getData(num);
      
      for(ReviewDto p : photo) {
         File file = new File(path+"/"+p.getFile_name());
         if(file.exists()) {
            file.delete();
            reviewService.deletePhoto(num);
         }
      }
      
      
      //db delete
      reviewService.deleteReview(num);
      photoName.clear();
   }
   
   @DeleteMapping("/onedelete")
   public void onephotodelete(@RequestParam int review_photo_num,HttpServletRequest request) {
      
      String path=request.getServletContext().getRealPath("/review_photo");
      // review_photo_num 받아서 해당하는 file_name 반환하는 sql
      //String photo=reviewService.getData(review_photo_num); //새..로 하나 만들기...데이터받는거.....아련...하나만 받는거 만들기
      String photo=reviewService.getOneDataPhoto(review_photo_num);
      File file = new File(path+"/"+photo);
      if(file.exists()) {
         file.delete();
         //reviewService.deletePhoto(num);
         reviewService.oneDeletePhoto(review_photo_num);
      }
   }
   @GetMapping("/allreview")
   public List<ReviewDto> getAllList(@RequestParam String place_id){
      System.out.println("ok");
      return reviewService.getAllDatas(place_id);
   }
   
   
   @GetMapping("/detail")
   public Map<String,Object> detail(@RequestParam int num) {
      System.out.println("ok");
      System.out.println(num);
      List<ReviewDto> dto = reviewService.getData(num);
      List<String> fname = reviewService.getDataFiles(num);
      System.out.println(dto);
      Map<String,Object> detailmap = new HashMap<>();
      detailmap.put("dto",dto);
      detailmap.put("fname", fname);
      return detailmap;
   }
   @GetMapping("/avgstars")
   public double getAvgStars(@RequestParam String place_id) {
      System.out.println("stars");
      return reviewService.getAvgStars(place_id);
   }
   
   @GetMapping("/sumlikes")
   public int getSumLikes(@RequestParam String place_id) {
      System.out.println("likes");
      return reviewService.getSumLikes(place_id);
   }
   
   @GetMapping("/like")
   public int getLike(@RequestParam String place_id,@RequestParam int loginNum) {
      System.out.println("mylike");
      System.out.println(reviewService.getLike(place_id,loginNum));
      return reviewService.getLike(place_id,loginNum);
   }

//   @PostMapping("/insertlike")
//   public void insertLike(@RequestBody HashMap<String, Object> request){
////      int member_num=18;
//      System.out.println(request);
//
//	   PlaceDto place = new PlaceDto();
//
//	   place.setCity_num(Integer.parseInt((String)request.get("cityNum")));
//
//		place.setContentid((String)request.get("contentid"));
//		place.setContenttypeid((String)request.get("contenttypeid"));
//		place.setTitle((String)request.get("title"));
//		place.setCat3((String)request.get("cat3"));
//		place.setAddr1((String)request.get("addr1"));
//		place.setAddr2((String)request.get("addr2"));
//		place.setFirstimage((String)request.get("firstimage"));
//		place.setMapx((String)request.get("mapx"));
//		place.setMapy((String)request.get("mapy"));
//
//		System.out.println(place);
//
//      if(tripService.existsPlace(place.getContentid()) == 0) {
//         tripService.insertPlace(place);
//		}
//
//      int place_id=Integer.parseInt(String.valueOf(request.get("place_id")));
//      int loginNum=(Integer)request.get("loginNum");
//      request.get("check");
////      ReviewDto dto=new ReviewDto();
////      dto.setMember_num(loginNum);
////      System.out.println(dto);
//      reviewService.insertLike(place_id,loginNum);
////      int num=reviewService.insertLike(member_num);
//   }
   
   @DeleteMapping("/deletelike")
   public void deleteLike(@RequestParam String place_id,@RequestParam int loginNum) {
      reviewService.deleteLike(place_id, loginNum);
   }
   
   @GetMapping("/pagelist")
   public Map<String,Object> getPagingList(
         @RequestParam(defaultValue = "1") int currentPage){
      
      System.out.println("currentPage="+currentPage);
      int totalCount; //총갯수
      int perPage=4; //한페이지당 보여질 글의 갯수
      int perBlock=3;//한블럭당 보여질 글의 갯수
      int totalPage;//총 페이지수
      int startNum;//한 페이지에서 보여질 시작 글번호
      int startPage;//한블럭에서 보여질 시작 페이지 번호
      int endPage;//한블럭에서 보여질 끝 페이지 번호
      int no;//각페이지당 보여질 시작번호
      
      //총글의 갯수를 구한다
      totalCount=reviewService.getTotalCount();
      //총 페이지수를 구한다
      totalPage=totalCount/perPage+(totalCount%perPage==0?0:1);
      //totalPage=(int)Math.ceil((double)totalCount/perPage);
      //각 블럭의 시작페이지(한 블럭당 5개일 경우 예)
      //1,6,11...(currentPage 가 1~5일때는 1, 6~10일때는 6)
      startPage=(currentPage-1)/perBlock*perBlock+1;
      //5,10,15...(currentPage 가 1~5일때는 5, 6~10일때는 10)
      endPage=startPage+perBlock-1;
      //문제점(마지막블럭은 총페이지수까지만 나와야한다)
      if(endPage>totalPage)
      {
         endPage=totalPage;
      }
      //각 페이지에서 보여질 글의 시작번호(mysql은 0부터)
      //예)한페이지당 3개일경우 1페이지:0, 2페이지:3, 3페이지 :6...
      startNum=(currentPage-1)*perPage; //oracle일땐 (currentPage-1)*perPage+1 하면됨 oracle은 1부터시작,,
      //각페이지당 보여질 시작번호
      no=totalCount-(currentPage-1)*perPage;
      //데이터 가져오기
      List<ReviewDto> list=reviewService.getPagingList(startNum, perPage);
      
      //출력할 페이지 번호
      Vector<Integer> parr=new Vector<>();
      for(int pp=startPage;pp<=endPage;pp++) {
         parr.add(pp);
      }
      
      //리턴할 Map에 필요한 변수들 넣기
      Map<String,Object> map = new HashMap<>();
      map.put("list", list);
      map.put("parr", parr);
      map.put("totalCount", totalCount);
      map.put("totalPage", totalPage);
      map.put("startPage", startPage);
      map.put("endPage", endPage);
      map.put("no", no);
      
      return map;
   }

}