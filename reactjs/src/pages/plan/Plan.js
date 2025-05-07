import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {NumPlaceItem} from './index';
import '../../styles/plan.css';
import {format} from 'date-fns';
import {resetPlan} from '../../modules/planner';

const {kakao} = window;

const Plan = ({view, setView, day, setDay, setIsBlocking, focus, setFocus}) => {
  const loginNum = useSelector(state => state.auth.user.num);

  // redux에서 변수 얻기
  const dispatch = useDispatch();
  const trip = useSelector(state => state.planner.trip);
  const plan = useSelector(state => state.planner.plan);

  const navigate = useNavigate();

  let insertUrl = process.env.REACT_APP_SPRING_URL + `trip`;

  const insertPlan = () => {
    setIsBlocking(false); // usePrompt 비활성화

    axios.post(insertUrl, {
          itinerary: plan,
          trip: {
            ...trip,
            startDate: format(trip.startDate, "yyyy-MM-dd"),
            endDate: format(trip.endDate, "yyyy-MM-dd")
          },
          loginNum: loginNum
        },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huZG9lIiwiaWF0IjoxNzQ2NTk5NTA3LCJleHAiOjE3NDY2ODU5MDd9.as9Qk8cnaMg3AcH_zuTteTXPdjZopKxGOjuQbvVXPEM`
          }
        })
    .then(res => {
      // 해당 일정 상세 페이지로 이동(trip_num 이용)
      dispatch(resetPlan());
      navigate(`/plan/detail/${res.data}`);
    })
    .catch(err => console.log(err));
  }

  // const [focus, setFocus] = useState(0);

  // kakao map
  const kakaoMapScript = () => {
    const container = document.getElementById('map'); // 지도를 표시할 div  

    const options = {
      // 도시마다 중심 좌표 다르게
      center: new kakao.maps.LatLng(trip.y, trip.x), // 지도의 중심좌표
      level: 9  // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(container, options); // 지도를 생성합니다

    // 일정에 있는 장소 마커들
    let markerList = [];

    for (let i in plan[focus]) {
      if (plan[focus][i].mapx && plan[focus][i].mapy) {
        markerList.push({
          latlng: new kakao.maps.LatLng(plan[focus][i].mapy,
              plan[focus][i].mapx),
          title: plan[focus][i].title,
          num: Number(i) + 1
        });
      }
    }

    // 커스텀 오버레이
    for (let i in markerList) {
      // 커스텀 오버레이에 표시할 내용
      // HTML 문자열 또는 Dom Element
      let content = `<div class ="label">${markerList[i].num}</div>`;

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

    // for(let j in plan[focus]){
    for (let j in markerList) {
      // linePath.push(new kakao.maps.LatLng(plan[focus][j].mapy, plan[focus][j].mapx));
      linePath.push(markerList[j].latlng);
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
    if (linePath.length !== 0) {  // 좌표 없이 범위 재설정 시 지도가 안 뜸
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
    kakaoMapScript();
  }, [focus]);

  return (
      <div id='plan'>

        <div id='map'></div>

        <div className='box-wrap'>
          <div className='title'>{trip.cityName} 여행</div>
          {
            trip.days == 1 ? <div className='period'>{format(trip.startDate,
                "yyyy-MM-dd")} ({trip.days}일)</div> : <div
                className='period'>{format(trip.startDate,
                "yyyy-MM-dd")} ~ {format(trip.endDate,
                "yyyy-MM-dd")} ({trip.days}일)</div>
          }

          <button type='button' className='btn btn-primary btn-sm btn-plan'
                  onClick={insertPlan}>일정 생성하기
          </button>

          {
            // days 만큼 반복문 돌리기
            [...Array(trip.days)].map((day, index) => (
                <div key={index + 1} className='day'>
              <span className='title' onClick={() => {
                setFocus(index);
              }}>Day {index + 1}</span>
                  <div className='day-place-list'>
                    {
                        plan[index] && plan[index].map((place, i) => (
                            <div className='place-list-item' key={i}>
                              <NumPlaceItem place={place} num={i + 1}
                                            focus={focus === (index) ? true
                                                : false}/>
                            </div>
                        ))
                    }
                  </div>
                  <button type='button'
                          className='btn btn-outline-primary btn-sm btn-place'
                          onClick={() => {
                            // navigate(`/plan/${index + 1}`);
                            setView(2);
                            setDay(index + 1);
                            setFocus(index);
                          }}>장소 추가
                  </button>
                  <button type='button'
                          className='btn btn-outline-secondary btn-sm btn-memo'>메모
                    추가
                  </button>
                </div>
            ))
          }
        </div>

      </div>
  );
};

export default Plan;