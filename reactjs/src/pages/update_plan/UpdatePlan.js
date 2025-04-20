import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { NumPlaceItem } from '../plan';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { saveTrip, savePlan, resetPlan } from '../../modules/planner';

const { kakao } = window;

const UpdatePlan = ({view, setView, day, setDay, setIsBlocking, focus, setFocus}) => {
  // redux에서 변수 얻기
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {tripNum} = useParams();

  const [tripInfo, setTripInfo] = useState({
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
    ...useSelector(state => state.planner.trip),
  });

  const [plan, setPlan] = useState(useSelector(state => state.planner.plan));
  // const [initPlan, setInitPlan] = useState([]);
  let initPlan = [];  // DB에서 plan 받아올 배열
  // console.log(plan);

  // const [focus, setFocus] = useState(0);

  let tripUrl = `${process.env.REACT_APP_SPRING_URL}plan/trip-info?tripNum=`;
  let planUrl = `${process.env.REACT_APP_SPRING_URL}plan/place-list?tripNum=`;

  // redux에 plan이 없을 때 or redux에 저장된 tripNum이 다를 때 axios로 DB에서 일정 가져오기
  // plan이 있으면 그거 사용하기
  useEffect(() => {
    if(plan.length === 0 || tripInfo.tripNum != tripNum){
      // console.log("일정 가져옴");

      axios.all([axios.get(tripUrl + tripNum), axios.get(planUrl + tripNum)])
      .then(
        axios.spread((res1, res2) => {
          // trip info 처리
          setTripInfo(res1.data);
          dispatch(saveTrip({...res1.data, areaCode: res1.data.area_code, sigunguCode: res1.data.sigungu_code}));

          // console.log(res2.data);
          // console.log(initPlan);

          // plan 처리
          for(let i = 0; i < res1.data.days; i++){
            initPlan.push(res2.data.filter(place => place.day == i + 1));
            // console.log(initPlan);
          }

        })
      )
      .then(()=>{
        // console.log(initPlan);
        setPlan(initPlan);
        // console.log(plan);
        dispatch(savePlan(initPlan));
      })
      .catch(err => console.log(err));
    }
  }, []);

  let updateUrl = `${process.env.REACT_APP_SPRING_URL}plan/update/${tripNum}/${tripInfo.cityNum}`;

  const updatePlan = () => {
    setIsBlocking(false); // usePrompt 비활성화

    // DB 업데이트
    axios.post(updateUrl, plan)
    .then(res => {
      // 수정을 완료하면 redux의 plan을 초기화시키고 일정 보기 페이지로 이동
      dispatch(resetPlan());
      navigate(`/plan/detail/${tripNum}`);
    })
    .catch(err => console.log(err));
  }

  // kakao map
  const kakaoMapScript = () => {
    const container = document.getElementById('map'); // 지도를 표시할 div

    const options = {
      center: new kakao.maps.LatLng(tripInfo.y, tripInfo.x), // 지도의 중심좌표
      level: 9  // 지도의 확대 레벨
    };
    
    const map = new kakao.maps.Map(container, options); // 지도를 생성합니다

    // 일정에 있는 장소 마커들
    let markerList = [];

    for(let i in plan[focus]){
      markerList.push({latlng: new kakao.maps.LatLng(plan[focus][i].mapy, plan[focus][i].mapx), title: plan[focus][i].title});
    }

    // 커스텀 오버레이
    for (let i in markerList) {
      // 커스텀 오버레이에 표시할 내용
      // HTML 문자열 또는 Dom Element
      let content = `<div class ="label">${Number(i) + 1}</div>`;

      // 커스텀 오버레이가 표시될 위치
      let position = markerList[i].latlng;

      // 커스텀 오버레이를 생성
      let customOverlay = new kakao.maps.CustomOverlay({
        position: markerList[i].latlng,
        content: content
      });

      // 커스텀 오버레이를 지도에 표시
      customOverlay.setMap(map);
    }

    // 마커와 마커 사이에 선 그리기
    // 선을 구성하는 좌표 배열
    let linePath = [];

    for(let j in plan[focus]){
      linePath.push(new kakao.maps.LatLng(plan[focus][j].mapy, plan[focus][j].mapx));
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

    // 지도 범위 재설정
    if(linePath.length !== 0){  // 좌표 없이 범위 재설정 시 지도가 안 뜸
      // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성
      var bounds = new kakao.maps.LatLngBounds();

      for (let k in linePath) {
        bounds.extend(linePath[k]); // LatLngBounds 객체에 좌표를 추가
      }

      map.setBounds(bounds, 100, 100, 100, 450);
      // map.setBounds(bounds);
    }
  };

  useEffect(() => {
    if(tripInfo.tripNum == tripNum)
      kakaoMapScript();
  }, [focus, tripInfo]);

  return (
    <div id='plan'>
      <div id='map'></div>

      <div className='box-wrap'>
        {tripInfo.tripNum == tripNum && <div>
          <div className='title'>{tripInfo.tripName}</div>
          {
            tripInfo.days == 1 ? <div className='period'>{tripInfo.startDate} ({tripInfo.days}일)</div> : <div className='period'>{tripInfo.startDate} ~ {tripInfo.endDate} ({tripInfo.days}일)</div>
          }

          <button type='button' className='btn btn-primary btn-sm btn-plan' onClick={updatePlan}>일정 저장하기</button>
          {
            // days 만큼 반복문 돌리기
            tripInfo && [...Array(tripInfo.days)].map((day, index) => (
              <div key={index + 1} className='day'>
                <span className='title' onClick={() => setFocus(index)}>Day {index + 1}</span>

                <div className='day-place-list'>
                  {
                    plan[index] && plan[index].map((place, i) => (
                      <div className='place-list-item' key={i}>
                        <NumPlaceItem place={place} num={i + 1} focus={focus === (index) ? true : false}/>
                      </div>
                    ))
                  }
                </div>
                <button type='button' className='btn btn-outline-primary btn-sm btn-place' onClick={() => {
                  // navigate(`/plan/update/${tripNum}/${index + 1}`);
                  setView(2);
                  setDay(index + 1);
                  setFocus(index);
                }}>장소 추가</button>
                <button type='button' className='btn btn-outline-secondary btn-sm btn-memo'>메모 추가</button>
              </div>
            ))
          }
        </div>}
      </div>
    </div>
  );
};

export default UpdatePlan;