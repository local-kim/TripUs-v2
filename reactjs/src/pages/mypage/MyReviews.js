import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useSelector } from 'react-redux';

const MyReviews = ({reviewList}) => {
  const navigate = useNavigate();
  const loginNum = useSelector((state) => state.auth.user.num);

  // const [reviewList, setReviewList] = useState([]);

  // let reviewUrl = `${process.env.REACT_APP_SPRING_URL}mypage/myreview?loginNum=${loginNum}`;

  // useEffect(() => {
  //   axios.get(reviewUrl)
  //   .then(res => {
  //     console.log(res.data);
  //     setReviewList(res.data);
  //   })
  //   .catch(err => console.log(err));
  // }, []);

  return (
    <div id='my-reviews'>
      <div className="section-title-container">
        <span className="section-title">
          나의 리뷰
        </span>
      </div>

      {
        reviewList.length === 0 ? (
          <div style={{textAlign:'center', color: 'gray', marginTop:'100px'}}>작성한 후기가 없습니다.</div>
        ) : ""
      }
      {
        reviewList && reviewList.map((review, index) => (
          <div className='review' key={index}>
            {/* <img className='img' src={review.firstimage} alt='' onClick={() => navigate(`/place/${review.city_num}/${review.place_id}`)}/> */}

            {
              // 이미지 없으면 표시하지 않음
              review.firstimage ? <img className='img' src={review.firstimage} alt='' onClick={() => navigate(`/place/${review.city_num}/${review.place_id}`)}/> : <span className="no-image material-symbols-outlined" onClick={() => navigate(`/place/${review.city_num}/${review.place_id}`)}>image_not_supported</span>
            }

            <div style={{width: '-webkit-fill-available'}}>
              <div className='place-wrap'>
                <div className='place'>
                  <span className='title' onClick={() => navigate(`/place/${review.city_num}/${review.place_id}`)}>{review.title}</span>
                  <span className='cat'>{review.cat3_name} • {review.city_name}</span>
                </div>

                <div className='date'>{review.created_at}</div>
              </div>

              <Rating
                name="stars"
                value={review.stars}
                readOnly
                precision={0.5}
                size="small"
                emptyIcon={<StarIcon style={{ opacity: 0.5 }} fontSize="inherit" />}
              />

              <pre className='content'>{review.content}</pre>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default MyReviews;