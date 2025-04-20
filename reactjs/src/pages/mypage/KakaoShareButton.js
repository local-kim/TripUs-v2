import React, { useEffect, useState, useRef } from "react";
import './share.css';
import busan from '../../assets/images/busan.jpg'


const KakaoShareButton = ({row}) => {



  const url = window.location.href; //현재 url가져오기
  useEffect(() => {
    initKakao(); //
  }, []);

//자바스크립트키로 카카오 init
  const initKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY);
      }
    }
  };

//버튼을 누르면 실행되는 함수
  const shareKakao = () => {
//이부분이 매우 헷갈림 여러 사이트를 참고했는데 이 sendDefault부분을 잘 봐야한다.

    window.Kakao.Link.sendDefault({ 
      objectType: 'feed',
      content: {
        title: `${row.tripName}`,
        description: `${row.startDate}~${row.endDate}  
           (${row.days-1}박 ${row.days}일)` , 
        imageUrl: `https://www.myro.co.kr/myro_image/city/${row.image}`, 
         
        link: {
          mobileWebUrl: url,
          webUrl: `http://localhost:3000/plan/detail/${row.tripNum}`,
        },
      },
      social: {
        likeCount: 9,
 
      },
      buttons: [
        {
          title: '자세히 보기',
          link: {
            mobileWebUrl: url,
            webUrl: `http://localhost:3000/plan/detail/${row.tripNum}`,
          },
        },

      ],
    });
  };

  return (
   
        <div className="share-node" onClick={shareKakao}>
            카카오 공유
           
        </div>
  );



}

export default KakaoShareButton


