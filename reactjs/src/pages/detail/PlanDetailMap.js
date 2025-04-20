import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../styles/plandetail.css';
import '../../styles/planmap.css';

const { kakao } = window;

const PlanDetailMap = () => {

    // 전체 데이타 (좌표, 타이틀) URL
    const [mapData, setMapData] = useState('');
    // NAV 리모컨 데이타 (Day별)
    const [navData, setNavData] = useState('');
    
    const [cDay, setCDay] = useState(0);
    
    const {num} = useParams();

    const SPRING_URL = process.env.REACT_APP_SPRING_URL;
    let mapUrl = SPRING_URL + "plan/map?num="+num;
    let navUrl = SPRING_URL + "plan/nav?num="+num;

      // kakao map
  const kakaoMapScript = () => {
    console.log(dayPlan);
    const container = document.getElementById('detail-map'); // 지도를 표시할 div  
   
    
    
    const options = {
      // TODO: 도시마다 중심 좌표 다르게(DB에 넣어놓기)
      center: new kakao.maps.LatLng(35.1795543, 129.0756416), // 지도의 중심좌표
      level: 3  // 지도의 확대 레벨
    };
    
    const map = new kakao.maps.Map(container, options); // 지도를 생성합니다

    // 일정에 있는 장소 마커들
    let markerList = [];

    for(let i in dayPlan[cDay]){
      if (dayPlan[cDay][i].mapy !== 0 && dayPlan[cDay][i].mapx !== 0){
      markerList.push({latlng: new kakao.maps.LatLng(dayPlan[cDay][i].mapy, dayPlan[cDay][i].mapx), title: dayPlan[cDay][i].title,});
      } 
    }
    // 커스텀 오버레이
    for (let i in markerList) {
      // 커스텀 오버레이에 표시할 내용
      // HTML 문자열 또는 Dom Element
      let content = `<div class ="label">
                      <div class="label-title">${Number(i)+1}. ${markerList[i].title}</div>
                      <div class="label-num">${Number(i)+1}</div>
                    </div>`;

      // 커스텀 오버레이가 표시될 위치
      let position = markerList[i].latlng;

      // 커스텀 오버레이를 생성
      let customOverlay = new kakao.maps.CustomOverlay({
          position: position,
          content: content
      });

      // 커스텀 오버레이를 지도에 표시
      customOverlay.setMap(map);
    }

    // 마커와 마커 사이에 선 그리기
    // 선을 구성하는 좌표 배열
    let linePath = [];

    
    for(let j in dayPlan[cDay]){
      if (dayPlan[cDay][j].mapy !== 0 && dayPlan[cDay][j].mapx !== 0){
      linePath.push(new kakao.maps.LatLng(dayPlan[cDay][j].mapy, dayPlan[cDay][j].mapx));
      }
    }

    // 지도에 표시할 선을 생성
    let polyline = new kakao.maps.Polyline({
      path: linePath, // 선을 구성하는 좌표 배열
      strokeWeight: 2.5, // 선의 두께
      strokeColor: '#333333', // 선의 색깔
      strokeOpacity: 0.6, // 선의 불투명도: 1에서 0 사이의 값, 0에 가까울수록 투명
      strokeStyle: 'shortdash' // 선의 스타일
    });

    // 지도에 선을 표시
    polyline.setMap(map);

    if(linePath.length !== 0){  // 좌표 없이 범위 재설정 시 지도가 안 뜸
      // 지도 범위 재설정
      // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성
      var bounds = new kakao.maps.LatLngBounds();

      for (let k in linePath) {
        // LatLngBounds 객체에 좌표를 추가
        bounds.extend(linePath[k]);
      }

    //   map.setBounds(bounds, 100, 100, 100, 450);
      map.setBounds(bounds);
    }

    
    
    
  };

  useEffect(() => {
    kakaoMapScript();
  }, [mapData, cDay]);

  // dayPlan 에 mapData 배열로 집어넣기
  const [dayPlan, setDayPlan] = useState([]);

  useEffect(() => {
    axios.get(mapUrl)
    .then(res => {
        setMapData(res.data)
        console.log(res.data);
        // console.log(res.data[0].days);

        // for(let i = 0; i < navData[navData.length-1].day; i++){
        for(let i = 0; i < res.data[res.data.length-1].day; i++){
            console.log(i);
            dayPlan.push(res.data.filter(data => data.day == i + 1));
            console.log(res.data.filter(data => data.day == i + 1));
        }
    })
    // .catch(err => {
    //     alert(err.data)
    // });
  }, []);

  // navData (Day별) 없는날짜 치우고 여행 있는날짜만 추가
  const [navPlan, setNavPlan] = useState([]);
  
  useEffect(() => {
    axios.get(navUrl)
    .then(res => {
      setNavData(res.data)
      // for(let i = 0; i < res.data.length; i++){
      //   navPlan.push(res.data.filter(data => data.day == i + 1));
      //   // console.log(i)
      //   console.log('navdata'+res.data.length)
      //   console.log(res.data)
      // }
      
    })
    // .catch(err => {
    //   alert(err.data)
    // });
  }, []);

  useEffect(() => {
    window.scrollTo(0,400)
  },[])
  
  const changeDay = (i) => {
    console.log(i);
    setCDay(i);
  }

    
    return (
        
        <div className='wrap-list'>
            <div id='detail-map'>
            <div className='map-day-box'>
                {/* navData 별로 리모컨 만들어주기 */}
                {
                    navData && navData.map((day, index) => (
                        <div className='map-day-list' style={{zIndex:'999'}}
                            onClick={()=>{changeDay(day.day-1)}} key={index}>Day {day.day}</div>
                    ))
                }
            </div>
            </div>
        </div>
    );
};

export default PlanDetailMap;