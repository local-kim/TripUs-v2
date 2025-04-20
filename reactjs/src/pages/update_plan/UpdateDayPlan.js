import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux'
import { savePlan } from '../../modules/planner';
import { useInView } from 'react-intersection-observer';
import { PlaceItem, MyPlaceList, NumPlaceItem, DayPlaceList } from "../plan";
import '../../styles/plan.css';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import { addDays, format, add } from 'date-fns'
import ko from 'date-fns/locale/ko';

const { kakao } = window;

const UpdateDayPlan = ({view, setView, day, setDay, focus, setFocus}) => {
  const API_KEY = process.env.REACT_APP_TOUR_API_KEY_SY;  // 뒷 두글자만 바꾸면 됨

  const navigate = useNavigate();
  // const {tripNum, day} = useParams();
  const {tripNum} = useParams();

  // redux에서 변수 얻기
  const dispatch = useDispatch();
  const [plan, setPlan] = useState(useSelector(state => state.planner.plan));
  const trip = useSelector(state => state.planner.trip);
  
  // const [plan, setPlan] = useState(Array.from(Array(days), () => new Array())); // [days x n] 2차원 배열
  const [dayPlan, setDayPlan] = useState(plan[day - 1]);

  const [places, setPlaces] = useState([]);

  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [categoryPlace, setCategoryPlace] = useState([]);

  // 호버된 장소 좌표
  const [mapX, setMapX] = useState();
  const [mapY, setMapY] = useState();
  
  // scroll paging
  const [ref, inView] = useInView();
  const [page, setPage] = useState(2);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있는 경우
      if(inView){
        setPage(page + 1);

        // 추천 장소(keyword 값이 아직 없을 때) : 처음 렌더링 시
        if(keyword === ''){
          areaUrl += `&pageNo=${page}`;
          console.log(areaUrl);
          delete axios.defaults.headers.common['Authorization'];
          axios.get(areaUrl)
          .then((res) => {
            console.dir(res.data.response.body.items.item);
            setPlaces([...places, ...res.data.response.body.items.item]);
            setCategoryPlace([...categoryPlace, ...res.data.response.body.items.item]);
          }).catch((err) => console.log(err.data));
        }
        // 키워드 검색 장소
        else{
          keywordUrl += `&pageNo=${page}`;
          // console.log("keyword 검색 요청");
          console.log(keywordUrl);
          delete axios.defaults.headers.common['Authorization'];
          axios.get(keywordUrl)
          .then((res) => {
            console.dir(res.data.response.body.items.item);
            setPlaces([...places, ...res.data.response.body.items.item]);
            setCategoryPlace([...categoryPlace, ...res.data.response.body.items.item]);
          }).catch((err) => console.log(err.data));
        }
      }
  }, [inView]);

  // 추천 장소 url(arrange=P)
  let areaUrl = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&areaCode=${trip.areaCode}&numOfRows=10&arrange=B&MobileOS=ETC&MobileApp=AppTest&_type=json`;

  if(trip.sigunguCode){  // 시군구 코드가 있는 도시이면
    areaUrl += `&sigunguCode=${trip.sigunguCode}`;
  }

  // 키워드 검색 url
  let keywordUrl = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword?ServiceKey=${API_KEY}&keyword=${keyword}&areaCode=${trip.areaCode}&numOfRows=10&arrange=B&MobileOS=ETC&MobileApp=AppTest&_type=json`;

  if(trip.sigunguCode){  // 시군구 코드가 있는 도시이면
    keywordUrl += `&sigunguCode=${trip.sigunguCode}`;
  }

  useEffect(() => {
    // 추천 장소(keyword 값이 아직 없을 때) : 처음 렌더링 시
    if(keyword === ''){
      console.log(areaUrl);
      // setAuthorizationToken(null);
      // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`;
      delete axios.defaults.headers.common['Authorization'];
      axios.get(areaUrl)
      .then((res) => {
        console.dir(res.data.response.body.items.item);
        setPlaces(res.data.response.body.items.item);
        setCategoryPlace(res.data.response.body.items.item);
        kakaoMapScript(res.data.response.body.items.item[0].mapx, res.data.response.body.items.item[0].mapy);
      }).catch((err) => console.log(err.data));
    }
    // 키워드 검색 장소
    else{
      console.log(areaUrl);
      // console.log("keyword 검색 요청");
      // console.log(keywordUrl);
      delete axios.defaults.headers.common['Authorization'];
      axios.get(keywordUrl)
      .then((res) => {
        console.dir(res.data.response.body.items.item);
        setPlaces(res.data.response.body.items.item);
        setCategoryPlace(res.data.response.body.items.item);
      }).catch((err) => console.log(err.data));
    }
  }, [keyword]);

  // 카테고리 필터링
  useEffect(() => {
    if(category === ''){
      setCategoryPlace(places);
      return;
    }
    if(category === 12){ // 관광지, 문화시설
      // console.log(category);
      setCategoryPlace(places.filter((place, index) => place.contenttypeid === '12' || place.contenttypeid === '14'));
      // console.log(categoryPlace);
    }
    else if(category === 39){  // 음식점
      // console.log(category);
      setCategoryPlace(places.filter((place, index) => place.contenttypeid === '39'));
      // console.log(categoryPlace);
    }
    else{ // 숙박
      // console.log(category);
      setCategoryPlace(places.filter((place, index) => place.contenttypeid === '32'));
      // console.log(categoryPlace);
    }
  }, [category, places]);

  useEffect(() => {
    addPlan();
  }, [dayPlan]);

  const prevDay = () => {
    // addPlan();
    setDayPlan(plan[Number(day) - 2]);
    setDay(day - 1);
    setFocus(day - 2);
    // navigate(`/plan/update/${tripNum}/${Number(day) - 1}`);
  }

  const nextDay = () => {
    // addPlan();
    setDayPlan(plan[Number(day)]);  // dayPlan에 다음날의 일정을 저장
    setDay(day + 1);
    setFocus(day);
    // navigate(`/plan/update/${tripNum}/${Number(day) + 1}`);
  }

  // 선택한 장소를 dayPlan에 추가
  const addPlace = (place) => {
    setDayPlan([
      ...dayPlan,
      place
    ]);
  }

  // 선택한 장소를 dayPlan에서 삭제
  const removePlace = (index) => {
    setDayPlan(dayPlan.filter((plan, i) => index !== i));
  }

  // 선택한 장소를 한 칸 위로 옮김
  const upPlace = (index) => {
    setDayPlan([
      ...dayPlan.slice(0, index - 1), // 0 ~ index - 2
      dayPlan[index],
      dayPlan[index - 1],
      ...dayPlan.slice(index + 1)
    ])
  }

  // 선택한 장소를 한 칸 아래로 옮김
  const downPlace = (index) => {
    setDayPlan([
      ...dayPlan.slice(0, index), // 0 ~ index - 1
      dayPlan[index + 1],
      dayPlan[index],
      ...dayPlan.slice(index + 2)
    ])
  }

  // dayPlan을 plan에 저장
  const addPlan = () => {
    // dispatch(addPlan(dayPlan));
    setPlan([
      ...plan.slice(0, day - 1), // 0 ~ day - 2
      dayPlan,  // day - 1
      ...plan.slice(day)  // day ~
    ]);
  }

  // kakao map
  const kakaoMapScript = (mapX, mapY) => {    
    const container = document.getElementById('map'); // 지도를 표시할 div

    const options = {
      // 도시마다 중심 좌표 다르게
      center: new kakao.maps.LatLng(trip.y, trip.x), // 지도의 중심좌표
      level: 8  // 지도의 확대 레벨
    };
    
    const map = new kakao.maps.Map(container, options); // 지도를 생성합니다

    // 일정에 추가한 장소 마커들
    let markerList = [];

    for(let i in dayPlan){
      markerList.push({
        latlng: new kakao.maps.LatLng(dayPlan[i].mapy, dayPlan[i].mapx),
        title: dayPlan[i].title
      });
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
          position: position,
          content: content
      });

      // 커스텀 오버레이를 지도에 표시
      customOverlay.setMap(map);
    }

    // 마커와 마커 사이에 선 그리기
    // 선을 구성하는 좌표 배열
    let linePath = [];

    for(let j in markerList){
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
  
    // 목록에서 호버한 장소 마커
    // 마커 이미지의 이미지 주소
    let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    // 마커 이미지의 이미지 크기
    let imageSize = new kakao.maps.Size(24, 35);
    
    // 마커 이미지를 생성
    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    //마커가 표시 될 위치
    let markerPosition = new kakao.maps.LatLng(mapY, mapX);

    // 마커를 생성
    let marker = new kakao.maps.Marker({
      position: markerPosition,
      image : markerImage
    });

    // 마커를 지도 위에 표시
    marker.setMap(map);
  };

  useEffect(() => {
    kakaoMapScript(mapX, mapY);
  }, [mapX, mapY, dayPlan]);

  return (
    <div id='day-plan'>
      <div id='map'></div>

      <div className='list-container'>
        <div className='left'>
          <div style={{textAlign:'center',color:'gray',fontSize:'14px'}}>{format(add(new Date(trip.startDate), {days: day - 1}), "MM/dd (eee)", {locale: ko})}</div>
          <div className='title-wrap'>
          {
              // day1이면 이전 날짜 버튼 안보임
              day == 1 ? <span class="material-symbols-rounded btn-arrow" style={{opacity:'0',cursor:'default'}}>chevron_left</span> : <span class="material-symbols-rounded btn-arrow" style={{cursor:'pointer'}} onClick={prevDay}>chevron_left</span>
            }
            <span className='title'>DAY {day}</span>
            {
              // 마지막 날이면 다음 날짜 버튼 안보임
              day == trip.days ? <span class="material-symbols-rounded btn-arrow" style={{opacity:'0',cursor:'default'}}>chevron_right</span> : <span class="material-symbols-rounded btn-arrow" style={{cursor:'pointer'}} onClick={nextDay}>chevron_right</span>
            }
          </div>

          <DayPlaceList dayPlan={dayPlan} setDayPlan={setDayPlan} removePlace={removePlace}/>

          <div style={{textAlign:'center', marginTop:'10px'}}>
            <button type='button' className='btn btn-secondary btn-sm btn-ok' onClick={() => {
              // plan을 redux 전역 변수에 저장
              console.log(plan);
              dispatch(savePlan(plan));
              // navigate(`/plan/update/${tripNum}`);
              setView(1);
            }}>완료</button>
          </div>
        </div>

        <div className='right'>
          {/* 장소 검색창 */}
          <TextField id="" label="검색할 키워드를 입력하세요" variant="outlined" size="small" fullWidth onKeyPress={(e) => {
            if(e.key === 'Enter' && e.target.value !== ''){
              setKeyword(e.target.value);
              e.target.value = '';
              setPlaces([]);
            }
          }}/>
          
          {/* API에서 장소 목록 불러오기 */}
          <div className='api-place-list'>
            <div className='label-wrap'>
              <span className='label'>
                {
                  keyword === '' ? '추천 장소' : "'" + keyword + "' 검색 결과"
                }
              </span>

              {/* 카테고리 필터(관광지, 음식점, 숙소,,) */}
              <span className='category-btn'>
                <button type='button' className={category === 12 ? 'btn btn-dark btn-sm' : 'btn btn-outline-dark btn-sm'} onClick={() => {
                  if(category === 12){
                    setCategory('');
                  }
                  else{
                    setCategory(12);
                  }
                }}>관광</button>
                <button type='button' className={category === 39 ? 'btn btn-dark btn-sm' : 'btn btn-outline-dark btn-sm'} onClick={() => {
                  if(category === 39){
                    setCategory('');
                  }
                  else{
                    setCategory(39);
                  }
                }}>맛집</button>
                <button type='button' className={category === 32 ? 'btn btn-dark btn-sm' : 'btn btn-outline-dark btn-sm'} onClick={() => {
                  if(category === 32){
                    setCategory('');
                  }
                  else{
                    setCategory(32);
                  }
                }}>숙소</button>
              </span>
            </div>
            
            <div className='place-list'>
              {
                // 끝까지 스크롤하면 장소 더 불러오기
                // places && places.map((place, index) => (
                categoryPlace && categoryPlace.map((place, index) => (
                  (categoryPlace.length - 1 === index) ? (
                    <div className='place-list-item' key={index} ref={ref} onMouseOver={()=>{
                      setMapX(place.mapx);
                      setMapY(place.mapy);
                    }} onMouseOut={()=>{
                      setMapX();
                      setMapY();
                    }}>
                      <PlaceItem place={place} addPlace={addPlace}/>
                      <button type='button' className='edit-btn btn btn-light btn-sm' onClick={() => addPlace(place)}>+</button>
                    </div>
                  ) : (
                    <div className='place-list-item' key={index} onMouseOver={()=>{
                      setMapX(place.mapx);
                      setMapY(place.mapy);
                    }} onMouseOut={()=>{
                      setMapX();
                      setMapY();
                    }}>
                      <PlaceItem place={place} addPlace={addPlace}/>
                      <button type='button' className='edit-btn btn btn-light btn-sm' onClick={() => addPlace(place)}>+</button>
                    </div>
                  )
                ))
              }
            </div>
          </div>
          
          {/* DB에서 저장한 장소 목록 불러오기 */}
          <MyPlaceList addPlace={addPlace} setMapX={setMapX} setMapY={setMapY}/>
        </div>
      </div>
    </div>
  );
};

export default UpdateDayPlan;