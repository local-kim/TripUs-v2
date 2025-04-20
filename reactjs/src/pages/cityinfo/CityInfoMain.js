import React, {useCallback, useEffect, useRef, useState} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, TextField } from '@mui/material';
import axios from "axios";
import '../../styles/cityinfo.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import CityInfoImage from './CityInfoImage';
import CityInfoMore from './CityInfoMore';
import { add, addDays, addYears, differenceInDays, format, subYears } from 'date-fns';
import { useInView } from "react-intersection-observer"
import { PlaceItem } from '../plan';
import { height } from '@mui/system';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ko from 'date-fns/locale/ko';
import { event } from 'jquery';

const CityInfoMain = () => {
    const contentTypeId = {
        A01010100: '국립공원',
        A01010200: '도립공원',
        A01010300: '군립공원',
        A01010400: '산',
        A01010500: '자연생태관광지',
        A01010600: '자연휴양림',
        A01010700: '수목원',
        A01010800: '폭포',
        A01010900: '계곡',
        A01011000: '약수터',
        A01011100: '해안절경',
        A01011200: '해수욕장',
        A01011300: '섬',
        A01011400: '항구/포구',
        A01011500: '어촌',
        A01011600: '등대',
        A01011700: '호수',
        A01011800: '강',
        A01011900: '동굴',
        A01020100: '희귀동.식물',
        A01020200: '기암괴석',
        A02010100: '고궁',
        A02010200: '성',
        A02010300: '문',
        A02010400: '고택',
        A02010500: '생가',
        A02010600: '민속마을',
        A02010700: '유적지/사적지',
        A02010800: '사찰',
        A02010900: '종교성지',
        A02011000: '안보관광',
        A02020100: '유원지',
        A02020200: '관광단지',
        A02020300: '온천/욕장/스파',
        A02020400: '이색찜질방',
        A02020500: '헬스투어',
        A02020600: '테마공원',
        A02020700: '공원',
        A02020800: '유람선/잠수함관광',
        A02030100: '농.산.어촌 체험',
        A02030200: '전통체험',
        A02030300: '산사체험',
        A02030400: '이색체험',
        A02030500: '관광농원',
        A02030600: '이색거리',
        A02040100: '제철소',
        A02040200: '조선소',
        A02040300: '공단',
        A02040400: '발전소',
        A02040500: '광산',
        A02040600: '식음료',
        A02040700: '화학/금속',
        A02040800: '기타',
        A02040900: '전자/반도체',
        A02041000: '자동차',
        A02050100: '다리/대교',
        A02050200: '기념탑/기념비/전망대',
        A02050300: '분수',
        A02050400: '동상',
        A02050500: '터널',
        A02050600: '유명건물',
        A02060100: '박물관',
        A02060200: '기념관',
        A02060300: '전시관',
        A02060400: '컨벤션센터',
        A02060500: '미술관/화랑',
        A02060600: '공연장',
        A02060700: '문화원',
        A02060800: '외국문화원',
        A02060900: '도서관',
        A02061000: '대형서점',
        A02061100: '문화전수시설',
        A02061200: '영화관',
        A02061300: '어학당',
        A02061400: '학교',
        A02070100: '문화관광축제',
        A02070200: '일반축제',
        A02080100: '전통공연',
        A02080200: '연극',
        A02080300: '뮤지컬',
        A02080400: '오페라',
        A02080500: '전시회',
        A02080600: '박람회',
        A02080700: '컨벤션',
        A02080800: '무용',
        A02080900: '클래식음악회',
        A02081000: '대중콘서트',
        A02081100: '영화',
        A02081200: '스포츠경기',
        A02081300: '기타행사',
        A03010100: '육상레포츠',
        A03010200: '수상레포츠',
        A03010300: '항공레포츠',
        A03020100: '스포츠센터',
        A03020200: '수련시설',
        A03020300: '경기장',
        A03020400: '인라인(실내 인라인 포함)',
        A03020500: '자전거하이킹',
        A03020600: '카트',
        A03020700: '골프',
        A03020800: '경마',
        A03020900: '경륜',
        A03021000: '카지노',
        A03021100: '승마',
        A03021200: '스키/스노보드',
        A03021300: '스케이트',
        A03021400: '썰매장',
        A03021500: '수렵장',
        A03021600: '사격장',
        A03021700: '야영장,오토캠핑장',
        A03021800: '암벽등반',
        A03021900: '빙벽등반',
        A03022000: '서바이벌게임',
        A03022100: 'ATV',
        A03022200: 'MTB',
        A03022300: '오프로드',
        A03022400: '번지점프',
        A03022500: '자동차경주',
        A03022600: '스키(보드) 렌탈샵',
        A03022700: '트래킹',
        A03030100: '윈드서핑/제트스키',
        A03030200: '카약/카누',
        A03030300: '요트',
        A03030400: '스노쿨링/스킨스쿠버다이빙',
        A03030500: '민물낚시',
        A03030600: '바다낚시',
        A03030700: '수영',
        A03030800: '래프팅',
        A03040100: '스카이다이빙',
        A03040200: '초경량비행',
        A03040300: '헹글라이딩/패러글라이딩',
        A03040400: '열기구',
        A03050100: '복합 레포츠',
        A04010100: '5일장',
        A04010200: '상설시장',
        A04010300: '백화점',
        A04010400: '면세점',
        A04010500: '할인매장',
        A04010600: '전문상가',
        A04010700: '공예,공방',
        A04010800: '관광기념품점',
        A04010900: '특산물판매점',
        A05020100: '한식',
        A05020200: '서양식',
        A05020300: '일식',
        A05020400: '중식',
        A05020500: '아시아식',
        A05020600: '패밀리레스토랑',
        A05020700: '이색음식점',
        A05020800: '채식전문점',
        A05020900: '바/까페',
        A05021000: '클럽',
        B02010100: '관광호텔',
        B02010200: '수상관광호텔',
        B02010300: '전통호텔',
        B02010400: '가족호텔',
        B02010500: '콘도미니엄',
        B02010600: '유스호스텔',
        B02010700: '펜션',
        B02010800: '여관',
        B02010900: '모텔',
        B02011000: '민박',
        B02011100: '게스트하우스',
        B02011200: '홈스테이',
        B02011300: '서비스드레지던스',
        B02011400: '의료관광호텔',
        B02011500: '소형호텔',
        B02011600: '한옥스테이',
        C01120001: '가족코스',
        C01130001: '나홀로코스',
        C01140001: '힐링코스',
        C01150001: '도보코스',
        C01160001: '캠핑코스',
        C01170001: '맛코스',
      }
    

    
    // 회원넘버, 로그인중?
    const loginNum = useSelector(state => state.auth.user.num);
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn); //로그인여부 체크

    //관광명소 api contentId 받아오기
    const [pcontentId,setPcontentId]=useState(126078); //2360786

    // redux에서 state 얻기
    // const dispatch = useDispatch(); 

    const naVi=useNavigate();

    // MUi 메뉴 탭
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Mui 스타일 변수
    const muiStyle={
        margin:"0 auto",
        width:"1092px",
        typography:"body1"
    }

    // 날씨 데이타 db받는 변수
    const [cityData,setCityData]=useState([]);
    let PlaceUrl;
    const {num}=useParams();   
    const city_num = num;
    const [border,setBorder] = useState(0);
    
    // 일정 url에 필요한 변수들   
    const [img,setImg]=useState([]);
    const [start_date,setStart_date]=useState(format(new Date(), "yyyy-MM-dd"));    // 기본 타입변경 필수!
    const [end_date,setEnd_date]=useState(format(new Date(), "yyyy-MM-dd"));        // 기본 타입변경 필수!
    const [days,setDays]=useState('365');
    
    // 작년 날짜로 수정
    const slastYear = format(subYears(new Date(start_date), 1), "yyyyMMdd");        // 페이지 로딩후 이걸로 교체
    const elastYear = format(subYears(new Date(end_date), 1), "yyyyMMdd");          // 페이지 로딩후 이걸로 교체

    // 좋아요
    const [like_btn, setLike_btn] = useState(false)
    const [checked, setChecked] = useState(false);
    // const [db_contentid,setDb_contentid] = useState('');
    // const [con_id, setCon_id] = useState(126078);
    const [l_T_placeid,setL_T_placeid] = useState('');
    const [like_list,setLike_list] = useState([]);
    
    // 지역 데이타 변수 
    const [areaCode,setAreaCode]=useState('');
    const [sigunguCode,setSigunguCode]=useState('');
    const [cityname,setCityname]=useState('');
    const [engname, setEngname]=useState('');
    const [keyWord,setKeyWord]=useState('');  // 검색 input 관광지 contentid 담는 변수
    const [page,setPage]=useState(2);   // 관광지 목록 데이타 페이지
    const [keyword_contenttypeid, setKeyword_contenttypeid] = useState('');
    // const [y,setY] = useState(1451);
    
    const [categoryPlace0,setCategoryPlace0] = useState([]);  // 전체보기
    const [categoryPlace1,setCategoryPlace1] = useState([]);  // 12 명소
    const [categoryPlace2,setCategoryPlace2] = useState([]);  // 39 음식점
    const [categoryPlace3,setCategoryPlace3] = useState([]);  // 38 쇼핑
    const [categoryPlace4,setCategoryPlace4] = useState([]);  // 15 행사/공연/축제
    const [categoryPlace5,setCategoryPlace5] = useState([]);  // 28 레포츠
    const [categoryPlace6,setCategoryPlace6] = useState([]);  // 32 숙박  
    const [places,setPlaces] = useState([]);
    // const [keyWordPlace,setKeyWordPlace] = useState([]);
    const [place12,setPlace12] = useState([]);
    const [place14,setPlace14] = useState([]);
    
    // 맨 아래로 화면 전환
    // 1
    // const messagesEndRef = useRef(null)
    // const scrollToBottom = () => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    // }
    // useEffect(() => {
    //     scrollToBottom();
    // }, [categoryPlace0,categoryPlace1,categoryPlace2,categoryPlace3,categoryPlace4,categoryPlace5,categoryPlace6]);
    // 2
    const [ navy, setNavy ] = useState(0);


    // API
    // 날씨 
    const API_KEY="hG2QkKkmuiN38w%2BeGu53VbRK%2BBNzKRpnjbLE%2BHDXZ0dHzgbBQ67K67NsuR5xOAs%2BErSqbSpOpk1UKBnj4dvlnA%3D%3D";  // 내꺼
    // const API_KEY="YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D";  // 현지씌꺼
    // const API_KEY="sRb6GSV%2FXAgOAdS%2FpBID9d0lsR8QfJ78C4bJYMZCu2MItPGIbX8JvFumAqXoFD61AoXODAxJdlrUaDwDavWlsg%3D%3D";  // 시연씌꺼
    // const API_KEY="7Et3sUoEnYoi9UiGk4tJayBnDo4ZMQ%2FM%2FOkEKTJMSjXkoukxdqrTDOu3WAzTgO5QsOTQOBSKfwMMuIbl8LyblA%3D%3D";  // 웅쓰꺼
    
    // // 일정 계획 데이타
    const [cityPlan,setCityPlan]=useState([]);
    const [cityPlan2,setCityPlan2]=useState([]);

    // 날씨 데이타 변수
    const [stnId,setStnId]=useState('');         // 지역번호
    const [stnNm,setStnNm]=useState('');         // 지역명
    const [maxTa,setMaxTa]=useState('');         // 최고기온
    const [minTa,setMinTa]=useState('');         // 최저기온
    const [iscs,setIscs]=useState('');           // 일기현상
    const [sumRn,setSumRn]=useState('');         // 일 강수량
    const [avgWs,setAvgWs]=useState('');            // 평균 풍속
    const [avgRhm,setAvgRhm]=useState('');          // 평균 습도 %
    const [ddMes,setDdMes]=useState('');            // 일 적설량
    

    
    
    const [w_data,setW_data]=useState([]);  // 날씨 데이터 담는 배열 변수
    // const [weatherImg,setWeatherImg]=useState([]);

    
    // URL
    // db city테이블 가져오는 거
    PlaceUrl=process.env.REACT_APP_SPRING_URL+"city/citydata?num="+num;
    
    // 날씨 api 받아오는 거   
    let weather_url=`https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${API_KEY}&numOfRows=${days}&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=${slastYear}&endDt=${elastYear}&stnIds=${num}`;
    // let weather_url=`https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${API_KEY}&numOfRows=20&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=20210101&endDt=20210501&stnIds=108`;
    let areaUrl = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&numOfRows=2&arrange=R&MobileOS=ETC&MobileApp=AppTest&_type=json&areaCode=`;
    // if(sigunguCode){  // 시군구 코드가 있는 도시이면
    //     areaUrl += `&sigunguCode=${sigunguCode}`;
    // }
    
     // contenttypeid 포함
    let area_content_type_12_url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&numOfRows=2&arrange=R&contentTypeId=12&MobileOS=ETC&MobileApp=AppTest&_type=json&areaCode=`;
    
    let area_content_type_14_url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&numOfRows=2&arrange=R&contentTypeId=14&MobileOS=ETC&MobileApp=AppTest&_type=json&areaCode=`;
    
    let area_content_type_39_url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&numOfRows=2&arrange=R&contentTypeId=39&MobileOS=ETC&MobileApp=AppTest&_type=json&areaCode=`;
    
    let area_content_type_38_url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&numOfRows=2&arrange=R&contentTypeId=38&MobileOS=ETC&MobileApp=AppTest&_type=json&areaCode=`;
    
    let area_content_type_15_url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&numOfRows=2&arrange=R&contentTypeId=15&MobileOS=ETC&MobileApp=AppTest&_type=json&areaCode=`;
    
    let area_content_type_28_url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&numOfRows=2&arrange=R&contentTypeId=28&MobileOS=ETC&MobileApp=AppTest&_type=json&areaCode=`;
    
    let area_content_type_32_url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?ServiceKey=${API_KEY}&numOfRows=2&arrange=R&contentTypeId=32&MobileOS=ETC&MobileApp=AppTest&_type=json&areaCode=`;
    

    // 일정
    let trip_url=`${process.env.REACT_APP_SPRING_URL}city/tripdata?city_num=${city_num}&loginNum=${loginNum}`;     
    // 좋아요
    let like_url=process.env.REACT_APP_SPRING_URL+"city/like?place_id="+pcontentId+"&loginNum="+loginNum;        
    let insert_like_url=process.env.REACT_APP_SPRING_URL+"city/insertlike";
    let delete_like_url=process.env.REACT_APP_SPRING_URL+"city/deletelike?place_id="+pcontentId+"&loginNum="+loginNum;
    let like_table_url=process.env.REACT_APP_SPRING_URL+"city/liketable?loginNum="+loginNum;
    // let like_table_url=process.env.REACT_APP_SPRING_URL+"city/liketable?&place_id="+l_T_placeid+"loginNum="+loginNum;
    // 키워드 검색 url
    let keyWord_url = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword?ServiceKey=${API_KEY}&keyword=${keyWord}&areaCode=${areaCode}&numOfRows=2&arrange=B&MobileOS=ETC&MobileApp=AppTest&_type=json`;
    if(sigunguCode){  // 시군구 코드가 있는 도시이면
        keyWord_url += `&sigunguCode=${sigunguCode}`;
    }
    if(keyword_contenttypeid) {
        keyWord_url += `&contentTypeId=${keyword_contenttypeid}`;
    }


    
    useEffect(() => {
        window.scrollTo(0,0);
        place_area_Data();
        trip_weather_Data();
        like_table();
        place_12_14();
    }, []);
    const place_area_Data = () => {
        // console.log("axios.place_area_Data");
        axios.get(PlaceUrl)
        .then(response => {
            console.log(PlaceUrl);
            setCityData(response);
            setAreaCode(response.data.area_code);
            setSigunguCode(response.data.sigungu_code);
            setCityname(response.data.name);
            setEngname(response.data.eng_name.toUpperCase());
            console.log(response.data.area_code);
            
            // console.log(areaUrl + response.data.area_code + response.data.sigungu_code);

            if(response.data.sigungu_code == 0 || !response.data.sigungu_code){
                console.log(area_content_type_39_url + response.data.area_code);
                axios.get(areaUrl + response.data.area_code)
                .then((res1) => {
                    setPlaces(res1.data.response.body.items.item);
                    setCategoryPlace0(res1.data.response.body.items.item);
                    console.log(res1.data);
                })
                axios.get(area_content_type_39_url + response.data.area_code)
                .then((res3) => {
                    setCategoryPlace2(res3.data.response.body.items.item);
                })
                axios.get(area_content_type_38_url + response.data.area_code)
                .then((res4) => {
                    setCategoryPlace3(res4.data.response.body.items.item);
                })
                axios.get(area_content_type_15_url + response.data.area_code)
                .then((res5) => {
                    setCategoryPlace4(res5.data.response.body.items.item);
                })
                axios.get(area_content_type_28_url + response.data.area_code)
                .then((res6) => {
                    setCategoryPlace5(res6.data.response.body.items.item);
                })
                axios.get(area_content_type_32_url + response.data.area_code)
                .then((res7) => {
                    setCategoryPlace6(res7.data.response.body.items.item);
                })
                axios.get(area_content_type_12_url + response.data.area_code)
                .then((res2) => {
                    setPlace12(res2.data.response.body.items.item);
                })
                axios.get(area_content_type_14_url + response.data.area_code)
                .then((res8) => {
                    setPlace14(res8.data.response.body.items.item);
                })

                
                // areaUrl = areaUrl + response.data.area_code;
                // console.log(areaUrl);
            } else {
                console.log(areaUrl + response.data.area_code + "&sigunguCode=" + response.data.sigungu_code);
                axios.get(areaUrl + response.data.area_code + "&sigunguCode=" + response.data.sigungu_code)
                .then((res1) => {
                    setPlaces(res1.data.response.body.items.item);
                    setCategoryPlace0(res1.data.response.body.items.item);
                    console.log(res1.data);
                })
                axios.get(area_content_type_39_url + response.data.area_code + "&sigunguCode=" + response.data.sigungu_code)
                .then((res3) => {
                    setCategoryPlace2(res3.data.response.body.items.item);
                })
                axios.get(area_content_type_38_url + response.data.area_code + "&sigunguCode=" + response.data.sigungu_code)
                .then((res4) => {
                    setCategoryPlace3(res4.data.response.body.items.item);
                })
                axios.get(area_content_type_15_url + response.data.area_code + "&sigunguCode=" + response.data.sigungu_code)
                .then((res5) => {
                    setCategoryPlace4(res5.data.response.body.items.item);
                })
                axios.get(area_content_type_28_url + response.data.area_code + "&sigunguCode=" + response.data.sigungu_code)
                .then((res6) => {
                    setCategoryPlace5(res6.data.response.body.items.item);
                })
                axios.get(area_content_type_32_url + response.data.area_code + "&sigunguCode=" + response.data.sigungu_code)
                .then((res7) => {
                    setCategoryPlace6(res7.data.response.body.items.item);
                })
                axios.get(area_content_type_12_url + response.data.area_code + "&sigunguCode=" + response.data.sigungu_code)
                .then((res2) => {
                    setPlace12(res2.data.response.body.items.item);
                })
                axios.get(area_content_type_14_url + response.data.area_code + "&sigunguCode=" + response.data.sigungu_code)
                .then((res8) => {
                    setPlace14(res8.data.response.body.items.item);
                })
            }
        })
        .catch(err => console.log(err))
    }
    const trip_weather_Data = () => {
        axios.get(trip_url)
        .then((res9) => {
            setCityPlan(res9.data);
            setCityPlan2(res9.data[0]);
            setStart_date([res9.data[0].start_date]);  // 잘 들어가짐
            setEnd_date([res9.data[0].end_date]);  // 잘 들어가짐
            setDays([res9.data[0].days]);  // 잘 들어가짐
        })
        .then(()=>{
            axios.get(weather_url)
            .then((res10) => {
                setW_data(res10.data.response.body.items.item);
                // setWeatherImg(res10.data.response.body.items.item);
            })
        })
    }

    

    // 날씨 API 데이터
    useEffect(()=>{
        axios.get(weather_url)
        .then(res=>{
            setW_data(res.data.response.body.items.item);
        })
    },[start_date,end_date])

    // // 내 좋아요 현황
    // useEffect(() => {
    //     myLike();
    // },[])
    // const myLike=()=>{
    //     if(!isLoggedIn){
    //         return;
    //     }
    //     axios.get(like_url).then(res=>{
    //         console.log(res.data)
    //         if(res.data==null||res.data == 0){
    //             // setLike_btn(res.data);
    //             setChecked(false);
    //         }else{
    //             setLike_btn(res.data);
    //             setChecked(true);
    //         }
    //     }).catch(err => {
    //         alert(err);
    //     })
    // }

    // contenttype 12 + 14
    const place_12_14 = () => {
        setCategoryPlace1([...place12, ...place14]);
    }

    // 좋아요 ON
    const insert_btn = (e, item) => {
        if (!isLoggedIn) {
            alert("로그인 후 이용해주세요")
        }
        axios.post(insert_like_url,{
            // place: item,
            contentid: String(item.contentid),
            contenttypeid: String(item.contenttypeid),
            title: item.title,
            cat3: item.cat3,
            addr1: item.addr1,
            addr2: item.addr2,
            firstimage: item.firstimage,
            mapx: String(item.mapx),
            mapy: String(item.mapy),
            loginNum,
            cityNum: city_num,
            check:Number(checked)
        })
        .then(res=>{
            // alert("좋아요 true:",res.data);
            // setLike_btn(true);
            like_table();
        })
    }
    // 좋아요 OFF
    const delete_btn = (e, contentid) => {
        axios.delete(process.env.REACT_APP_SPRING_URL+"city/deletelike?place_id="+contentid+"&loginNum="+loginNum,{place_id:String(contentid), loginNum : loginNum})
        .then(res=>{
            console.log("delete_like_url : "+ delete_like_url)
            // alert("좋아요 false");
            like_table();
            // setLike_btn(false);
        })
    }

    // like table에서 place_id랑 loginNum 가져와서 클릭한 카드의 contentid 비교해서 insert,delete 버튼 실행하기
    const like_table = () => {
        axios.get(like_table_url)
        .then(res => {
            setLike_list(res.data);  // like 테이블에 있는 place_id 여기에 member_num(loginNum)만 +해서 비교하면 될 듯?
            // console.log(res.data)
        })
    }

    // // 일정만들기 로그인 확인
    // const Add_Plan_login_check = () => {
    //     if (!isLoggedIn) {
    //         alert("로그인 후 이용해주세요")
    //     }
    //     if{
    //         naVi(`../plan/city/${num}`)
    //     }
    // }


    // 검색
    useEffect(() => {
        // console.log("keyword");
        // 추천 장소(keyword 값이 아직 없을 때) : 처음 렌더링 시
        if(keyWord == ''){
            axios.get(areaUrl)
            .then((res) => {
                setPlaces(res.data.response.body.items.item);
                setCategoryPlace0(res.data.response.body.items.item);
            }).catch((err) => console.log(err.data));
        }
        // 키워드 검색 장소
        else{
        //   console.log("keyword 검색 요청");
        //   console.log(keyWord_url);
            axios.get(keyWord_url)
            .then((res) => {
                console.log(keyWord_url);
                setPlaces(res.data.response.body.items.item);
                setCategoryPlace0(res.data.response.body.items.item);
            }).catch((err) => console.log(err.data));
        }
    }, [keyWord]);


    const moreinfo = (value,keyWord) => {
        if(sigunguCode == 0 || !sigunguCode){
            if (value == 1){
                setPage(page + 1);
                // areaUrl += `&pageNo=${page}`;
                console.log(area_content_type_12_url + areaCode + `&pageNo=${page}`);
                axios.get(areaUrl + areaCode + `&pageNo=${page}`)
                .then((res) => {
                    setPlaces([...places, ...res.data.response.body.items.item]);
                    setCategoryPlace0([...categoryPlace0, ...res.data.response.body.items.item]);
                })
            } else if (value == 1214){
                setPage(page + 1);

                axios.get(area_content_type_12_url + areaCode + `&pageNo=${page}`)
                .then((res1) => {
                    axios.get(area_content_type_14_url + areaCode + `&pageNo=${page}`)
                    .then((res2) => {
                        setCategoryPlace1([...categoryPlace1, ...res1.data.response.body.items.item, ...res2.data.response.body.items.item]);
                    })
                })
            } else if (value == 39){
                setPage(page + 1);
                axios.get(area_content_type_39_url + areaCode + `&pageNo=${page}`)
                .then((res) => {
                    setCategoryPlace2([...categoryPlace2, ...res.data.response.body.items.item]);
                })
            } else if (value == 38){
                setPage(page + 1);
                axios.get(area_content_type_38_url + areaCode + `&pageNo=${page}`)
                .then((res) => {
                    setCategoryPlace3([...categoryPlace3, ...res.data.response.body.items.item]);
                })
            } else if (value == 15){
                setPage(page + 1);
                axios.get(area_content_type_15_url + areaCode + `&pageNo=${page}`)
                .then((res) => {
                    setCategoryPlace4([...categoryPlace4, ...res.data.response.body.items.item]);
                })
            } else if (value == 28){
                setPage(page + 1);
                axios.get(area_content_type_28_url + areaCode + `&pageNo=${page}`)
                .then((res) => {
                    setCategoryPlace5([...categoryPlace5, ...res.data.response.body.items.item]);
                })
            } else {
                setPage(page + 1);
                axios.get(area_content_type_32_url + areaCode + `&pageNo=${page}`)
                .then((res) => {
                    setCategoryPlace6([...categoryPlace6, ...res.data.response.body.items.item]);
                })
            }
        } else {
            if (value == 1){
                setPage(page + 1);
                // areaUrl += `&pageNo=${page}`;
                console.log(area_content_type_12_url + areaCode + "&sigunguCode=" + sigunguCode + `&pageNo=${page}`);
                axios.get(areaUrl + areaCode + "&sigunguCode=" + sigunguCode + `&pageNo=${page}`)
                .then((res) => {
                    setPlaces([...places, ...res.data.response.body.items.item]);
                    setCategoryPlace0([...categoryPlace0, ...res.data.response.body.items.item]);
                })
            } else if (value == 1214){
                setPage(page + 1);

                axios.get(area_content_type_12_url + areaCode + "&sigunguCode=" + sigunguCode + `&pageNo=${page}`)
                .then((res1) => {
                    axios.get(area_content_type_14_url + areaCode + "&sigunguCode=" + sigunguCode + `&pageNo=${page}`)
                    .then((res2) => {
                        setCategoryPlace1([...categoryPlace1, ...res1.data.response.body.items.item, ...res2.data.response.body.items.item]);
                    })
                })
            } else if (value == 39){
                setPage(page + 1);
                axios.get(area_content_type_39_url + areaCode + "&sigunguCode=" + sigunguCode + `&pageNo=${page}`)
                .then((res) => {
                    setCategoryPlace2([...categoryPlace2, ...res.data.response.body.items.item]);
                })
            } else if (value == 38){
                setPage(page + 1);
                axios.get(area_content_type_38_url + areaCode + "&sigunguCode=" + sigunguCode + `&pageNo=${page}`)
                .then((res) => {
                    setCategoryPlace3([...categoryPlace3, ...res.data.response.body.items.item]);
                })
            } else if (value == 15){
                setPage(page + 1);
                axios.get(area_content_type_15_url + areaCode + "&sigunguCode=" + sigunguCode + `&pageNo=${page}`)
                .then((res) => {
                    setCategoryPlace4([...categoryPlace4, ...res.data.response.body.items.item]);
                })
            } else if (value == 28){
                setPage(page + 1);
                axios.get(area_content_type_28_url + areaCode + "&sigunguCode=" + sigunguCode + `&pageNo=${page}`)
                .then((res) => {
                    setCategoryPlace5([...categoryPlace5, ...res.data.response.body.items.item]);
                })
            } else {
                setPage(page + 1);
                axios.get(area_content_type_32_url + areaCode + "&sigunguCode=" + sigunguCode + `&pageNo=${page}`)
                .then((res) => {
                    setCategoryPlace6([...categoryPlace6, ...res.data.response.body.items.item]);
                })
            }
        }
    }

    
    // console.log("categoryPlace1 : ",categoryPlace1);
    // console.log("weather_url : "+weather_url);
    // console.log("like_url : " + like_url);
    // console.log("l_T_placeid : "+ l_T_placeid);
    // console.log("like_table_url : " + like_table_url);
    


    return (
        <div id='cityinfo' style={muiStyle} >
        
            <div className='title-city'>
                <span className='kor-name'>{cityname}</span>&ensp;<span className='eng-name'>{engname}</span>
            </div>    
            <div>
                <CityInfoImage num={city_num}/>
            </div>
            <div style={{display:'flex'}}>
                <div className='scheduleContainer'>
                    <div style={{display:'flex',marginTop:'20px',marginBottom:'10px'}}>
                        {
                            cityPlan.length === 0 ?
                            <div className='schedule-title-add-box'>
                                    <div className='schedule-title'>My Plan</div>
                            </div>
                            :
                            <div className='schedule-title-add-box'>
                                    <div className='schedule-title'>My Plan&nbsp;
                                        <div className="add-date" onClick={()=> {
                                            if(isLoggedIn){
                                             naVi(`/plan/city/${num}`)
                                            } else {
                                                alert("로그인 후 등록해주세요")
                                                naVi('/login')
                                            }
                                        }}>Add Plan</div>
                                    </div>
                            </div>
                        }
                        {
                            cityPlan.length === 0 ?
                            <div className='weather-title'>
                                Today Weather
                            </div>
                            :
                            <div className='weather-title'>
                                Weather
                            </div>
                        }
                    </div>
                    <div style={{display:'flex'}}>
                        <div className='schedule-big-box'>
                            {
                                cityPlan.length === 0 ?
                                <div className='no-schedule-box'>
                                    <span class="material-symbols-outlined no-schedule">event_busy</span><br/>
                                    <div style={{fontFamily:'Montserrat'}}>일정을 등록해주세요</div>
                                    <div className="no-schedule-add-date-box">
                                        <div className="no-schedule-add-date" onClick={()=> {
                                            if(isLoggedIn){
                                             naVi(`/plan/city/${num}`)
                                            } else {
                                                alert("로그인 후 등록해주세요")
                                                naVi('/login')
                                            }
                                        }}>Add Plan</div>
                                    </div>
                                </div>
                                :
                                ''
                            }
                            {
                                cityPlan && cityPlan.map((item, index) => (
                                    <div className={border == index ? 'schedule-box-border' : 'schedule-box'} style={{display:'flex'}}>
                                        {
                                            (new Date() < new Date(item.start_date)) ? 
                                            <div className='d-day'>
                                                <span>D - {differenceInDays(new Date(item.start_date) ,new Date())+1}</span>
                                            </div> 
                                            : 
                                            <div className='d-day' style={{backgroundColor:'lightpink'}}>
                                                <span>여행중</span>
                                            </div>
                                        }
                                        <div className='subject'>
                                            {item.name}
                                        </div>
                                        <div className='start-end-date'>
                                            {format(new Date(item.start_date), "yyyy-MM-dd")} ~ {format(new Date(item.end_date), "yyyy-MM-dd")}({item.days}일)
                                        </div>
                                        &emsp;&nbsp;
                                        <span class="material-symbols-outlined view-weather" onClick={(e)=>{
                                            setStart_date(item.start_date); setEnd_date(item.end_date); setDays(item.days); setBorder(index);
                                        }}>sunny</span>
                                    </div>
                                ))
                            }
                        </div>
                        {/* 날씨 */}
                        <div id='weather-css'>
                            {
                                cityPlan.length === 0 ?
                                w_data && w_data.map((item,index) => (
                                    <div style={{marginRight:'5px'}}>
                                        <div className='no-schedule-weather-info-box'>
                                            
                                            <div className='no-schedule-weather-day'>
                                                {
                                                    format(addYears(new Date(item.tm),1), "MM/dd (eee)", {locale: ko})
                                                }
                                            </div>
                                            <div className='no-schedule-weater-image'>
                                                <span class="material-symbols-outlined no-schedule-weather_span">
                                                    {   
                                                        (item.iscs == "" || item.iscs != "") && ((item.maxTa > "27" && item.sumRn == "" && item.avgRhm < '55.4') || (item.maxTa > "29" && item.sumRn == "" && item.avgRhm < '55.4')) ? 'sunny' : 
                                                        // (item.iscs == "" || item.iscs != "") && (('75.7' < item.avgRhm < '76.0') && ('2' < item.avgWs < '2.2') && ('26.7' < maxTa < '26.9') && ('18.5' < minTa < '18.7')) ? <img className='wimg' alt='' src={`${process.env.PUBLIC_URL}/WeatherImage/비온_뒤_맑음.png`}/> : 
                                                        // (item.iscs == "" || item.iscs != "") && ('67' < item.sumRn < '73') && ( '2' < item.avgWs < '3') && (('28' < maxTa && minTa < '22') || ( maxTa < '31' && minTa < '21')) ? <img className='wimg' alt='' src={`${process.env.PUBLIC_URL}/WeatherImage/맑음_뒤_흐림.png`}/> : 
                                                        (item.iscs == "" || item.iscs != "") && ( '2' < item.avgWs || item.avgWs == '3.7') && ( '59' < item.avgRhm < '61') && (('35' < maxTa && minTa < '26') || ( '29' < maxTa && minTa < '20')) ? 'partly_cloudy_day' : 
                                                        (item.sumRn > '40') || ((item.iscs == "" || item.iscs != "") && (item.sumRn > '30' || item.sumRn == '') && ((item.avgWs > '5' && item.avgRhm > '80') || ('75' < item.avgRhm < '78' && (avgWs == "3.3" || avgWs == "1.5") && ((maxTa > '26' && minTa < '17') || (maxTa > '31' && minTa < '25'))))) ? 'thunderstorm' : 
                                                        (item.iscs == "" || item.iscs != "") && item.ddMes != "" ? 'cloudy_snowing' : 
                                                        (item.iscs == "" || item.iscs != "") && ((item.sumRn != "" ) || (item.avgRhm > '55' && item.avgWs > '2.2')) ? 'rainy' : 
                                                        (item.iscs == "" || item.iscs != "") && item.sumRn == '' && ((item.avgWs > '4' && item.avgRhm > '50') || (item.avgWs < '3' && item.avgRhm < '50'))? 'cloudy' : 'sunny'
                                                    }
                                                </span><br/>
                                            </div>
                                            <div className='no-schedule-weather-temp'>
                                                {item.maxTa}℃&nbsp;/&nbsp;{item.minTa}℃
                                            </div>
                                        </div>
                                    </div>
                                ))
                                :
                                w_data && w_data.map((item,index) => (
                                    <div style={{marginRight:'5px'}}>
                                        <div className='weather-info-box' style={{display:'flex'}}>
                                            <div className='weather-day'>
                                                {
                                                    format(addYears(new Date(item.tm),1), "MM/dd (eee)", {locale: ko})
                                                }
                                            </div>
                                            <div className='weater-image'>
                                                <span class="material-symbols-outlined weather_span">
                                                    {   
                                                        (item.iscs == "" || item.iscs != "") && ((item.maxTa > "27" && item.sumRn == "" && item.avgRhm < '55.4') || (item.maxTa > "29" && item.sumRn == "" && item.avgRhm < '55.4')) ? 'sunny' : 
                                                        // (item.iscs == "" || item.iscs != "") && (('75.7' < item.avgRhm < '76.0') && ('2' < item.avgWs < '2.2') && ('26.7' < maxTa < '26.9') && ('18.5' < minTa < '18.7')) ? <img className='wimg' alt='' src={`${process.env.PUBLIC_URL}/WeatherImage/비온_뒤_맑음.png`}/> : 
                                                        // (item.iscs == "" || item.iscs != "") && ('67' < item.sumRn < '73') && ( '2' < item.avgWs < '3') && (('28' < maxTa && minTa < '22') || ( maxTa < '31' && minTa < '21')) ? <img className='wimg' alt='' src={`${process.env.PUBLIC_URL}/WeatherImage/맑음_뒤_흐림.png`}/> : 
                                                        (item.iscs == "" || item.iscs != "") && ( '2' < item.avgWs || item.avgWs == '3.7') && ( '59' < item.avgRhm < '61') && (('35' < maxTa && minTa < '26') || ( '29' < maxTa && minTa < '20')) ? 'partly_cloudy_day' : 
                                                        (item.sumRn > '40') || ((item.iscs == "" || item.iscs != "") && (item.sumRn > '30' || item.sumRn == '') && ((item.avgWs > '5' && item.avgRhm > '80') || ('75' < item.avgRhm < '78' && (avgWs == "3.3" || avgWs == "1.5") && ((maxTa > '26' && minTa < '17') || (maxTa > '31' && minTa < '25'))))) ? 'thunderstorm' : 
                                                        (item.iscs == "" || item.iscs != "") && item.ddMes != "" ? 'cloudy_snowing' : 
                                                        (item.iscs == "" || item.iscs != "") && ((item.sumRn != "" ) || (item.avgRhm > '55' && item.avgWs > '2.2')) ? 'rainy' : 
                                                        (item.iscs == "" || item.iscs != "") && item.sumRn == '' && ((item.avgWs > '4' && item.avgRhm > '50') || (item.avgWs < '3' && item.avgRhm < '50'))? 'cloudy' : 'sunny'
                                                    }
                                                </span>
                                            </div>
                                            <div className='weather-temp'>
                                                {item.maxTa}℃&nbsp;/&nbsp;{item.minTa}℃
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>                
                </div>
            </div>
            <div className='place-list-box'>
                <div>
                    <Box>
                        <TabContext value={value} >
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList style={{fontFamily:'Montserrat'}} onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="전체보기" value="1" />
                                    <Tab label="관광명소" value="1214" />
                                    <Tab label="음식점" value="39" />
                                    <Tab label="쇼 핑" value="38" />
                                    <Tab label="행사/공연/축제" value="15" />
                                    <Tab label="레포츠" value="28" />
                                    <Tab label="숙 박" value="32" />
                                </TabList>
                            </Box>
                            <TabPanel value='1'>
                                <div className='keyword-search'>
                                    <div className='searchCity'>
                                        <TextField id="" label="검색할 키워드를 입력하세요" variant="outlined" size="small" fullWidth onKeyPress={(e) => {
                                            if(e.key === 'Enter' && e.target.value !== ''){
                                            setKeyWord(e.target.value);
                                            e.target.value = '';
                                            setCategoryPlace0([]);
                                            }
                                        }}/>
                                    </div>
                                </div>
                                <div style={{display:'flex'}} className='place-heart row'>
                                    {
                                        categoryPlace0 && categoryPlace0.map((item, idx) => (
                                            <div className='col-sm-3'>
                                                { 
                                                    like_list.includes(item.contentid) ?
                                                    <span class="material-icons heart_span" style={{color:'red'}} 
                                                        onClick={()=>{
                                                            delete_btn(event, item.contentid)
                                                        }}>favorite</span>
                                                    :
                                                    <span class="material-icons heart_span" style={{color:'#ccc'}} 
                                                        onClick={()=>{
                                                            insert_btn(event, item);
                                                        }}>favorite_border</span>
                                                }
                                                <Link to={`/place/${city_num}/${item.contentid}`}>
                                                    <Card value={item} sx={{width: 250, height: 300, marginRight: 12}}>
                                                        <CardActionArea>
                                                            {
                                                                item.firstimage ? 
                                                                <CardMedia className='tabtag-image' component="img" width="250" height="180" image = {item.firstimage} alt=""/>
                                                                :
                                                                <CardMedia width="250" height="200" alt="">
                                                                    <span class="material-symbols-outlined span-no-image">image_not_supported</span>
                                                                </CardMedia>
                                                            }
                                                            <CardContent>
                                                                <Typography gutterBottom component="div">
                                                                    {item.title}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            {contentTypeId[item.cat3]}
                                                        </CardActions>
                                                    </Card>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                                <span className='more-city-info' value='1' onClick={()=>{
                                    moreinfo(value,keyWord);
                                    setNavy(navy + Number(710));
                                    window.scrollTo(0, navy + Number(710))
                                    }}>More..?</span>
                                {/* </div> 서브카테고리 div 닫는거 */}
                            </TabPanel>
                            <TabPanel value='1214'>
                                <div className='keyword-search'>
                                    <div className='searchCity'>
                                        <TextField id="" label="검색할 키워드를 입력하세요" variant="outlined" size="small" fullWidth onKeyPress={(e) => {
                                            if(e.key === 'Enter' && e.target.value !== ''){
                                            setKeyWord(e.target.value);
                                            e.target.value = '';
                                            setCategoryPlace1([]);
                                            }
                                        }}/>
                                    </div>
                                </div>
                                <div style={{display:'flex'}} className='place-heart row'>
                                    {
                                        categoryPlace1 && categoryPlace1.map((item, idx) => (
                                            <div className='col-sm-3'>
                                                { 
                                                    like_list.includes(item.contentid) ?
                                                    <span class="material-icons heart_span" style={{color:'red'}} 
                                                        onClick={()=>{
                                                            delete_btn(event, item.contentid)
                                                        }}>favorite</span>
                                                    :
                                                    <span class="material-icons heart_span" style={{color:'#ccc'}} 
                                                        onClick={()=>{
                                                            insert_btn(event, item)
                                                        }}>favorite_border</span>
                                                }
                                                <Link to={`/place/${city_num}/${item.contentid}`}>
                                                    <Card value={item} sx={{width: 250, height: 300, marginRight: 12}}>
                                                        <CardActionArea>
                                                            {
                                                                item.firstimage ? 
                                                                <CardMedia className='tabtag-image' component="img" width="250" height="180" image = {item.firstimage} alt=""/>
                                                                :
                                                                <CardMedia width="250" height="200" alt="">
                                                                    <span class="material-symbols-outlined span-no-image">image_not_supported</span>
                                                                </CardMedia>
                                                            }
                                                            <CardContent>
                                                                <Typography gutterBottom component="div">
                                                                    {item.title}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            {contentTypeId[item.cat3]}
                                                        </CardActions>
                                                    </Card>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                                <span className='more-city-info' value='1214' onClick={()=>{moreinfo(value,keyWord)}}>More..?</span>
                                {/* </div> 서브카테고리 div 닫는거 */}
                            </TabPanel>
                            <TabPanel value='39'>
                                <div className='keyword-search'>
                                    <div className='searchCity'>
                                        <TextField id="" label="검색할 키워드를 입력하세요" variant="outlined" size="small" fullWidth onKeyPress={(e) => {
                                            if(e.key === 'Enter' && e.target.value !== ''){
                                            setKeyWord(e.target.value);
                                            e.target.value = '';
                                            setCategoryPlace2([]);
                                            }
                                        }}/>
                                    </div>
                                </div>
                                <div style={{display:'flex'}} className='place-heart row'>
                                    {
                                        categoryPlace2 && categoryPlace2.map((item, idx) => (
                                            <div className='col-sm-3'>
                                                { 
                                                    like_list.includes(item.contentid) ?
                                                    <span class="material-icons heart_span" style={{color:'red'}} 
                                                        onClick={()=>{
                                                            delete_btn(event, item.contentid)
                                                        }}>favorite</span>
                                                    :
                                                    <span class="material-icons heart_span" style={{color:'#ccc'}} 
                                                        onClick={()=>{
                                                            insert_btn(event, item)
                                                        }}>favorite_border</span>
                                                }
                                                <Link to={`/place/${city_num}/${item.contentid}`}>
                                                    <Card value={item} sx={{width: 250, height: 300, marginRight: 12}}>
                                                        <CardActionArea>
                                                            {
                                                                item.firstimage ? 
                                                                <CardMedia className='tabtag-image' component="img" width="250" height="180" image = {item.firstimage} alt=""/>
                                                                :
                                                                <CardMedia width="250" height="200" alt="">
                                                                    <span class="material-symbols-outlined span-no-image">image_not_supported</span>
                                                                </CardMedia>
                                                            }
                                                            <CardContent>
                                                                <Typography gutterBottom component="div">
                                                                    {item.title}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            {contentTypeId[item.cat3]}
                                                        </CardActions>
                                                    </Card>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                                <span className='more-city-info' value='39' onClick={()=>{moreinfo(value,keyWord)}}>More..?</span>
                                {/* </div> 서브카테고리 div 닫는거 */}
                            </TabPanel>
                            <TabPanel value='38'>
                                <div className='keyword-search'>
                                    <div className='searchCity'>
                                        <TextField id="" label="검색할 키워드를 입력하세요" variant="outlined" size="small" fullWidth onKeyPress={(e) => {
                                            if(e.key === 'Enter' && e.target.value !== ''){
                                            setKeyWord(e.target.value);
                                            e.target.value = '';
                                            setCategoryPlace3([]);
                                            }
                                        }}/>
                                    </div>
                                </div>
                                <div style={{display:'flex'}} className='place-heart row'>
                                    {
                                        categoryPlace3 && categoryPlace3.map((item, idx) => (
                                            <div className='col-sm-3'>
                                                { 
                                                    like_list.includes(item.contentid) ?
                                                    <span class="material-icons heart_span" style={{color:'red'}} 
                                                        onClick={()=>{
                                                            delete_btn(event, item.contentid)
                                                        }}>favorite</span>
                                                    :
                                                    <span class="material-icons heart_span" style={{color:'#ccc'}} 
                                                        onClick={()=>{
                                                            insert_btn(event, item)
                                                        }}>favorite_border</span>
                                                }
                                                <Link to={`/place/${city_num}/${item.contentid}`}>
                                                    <Card value={item} sx={{width: 250, height: 300, marginRight: 12}}>
                                                        <CardActionArea>
                                                            {
                                                                item.firstimage ? 
                                                                <CardMedia className='tabtag-image' component="img" width="250" height="180" image = {item.firstimage} alt=""/>
                                                                :
                                                                <CardMedia width="250" height="200" alt="">
                                                                    <span class="material-symbols-outlined span-no-image">image_not_supported</span>
                                                                </CardMedia>
                                                            }
                                                            <CardContent>
                                                                <Typography gutterBottom component="div">
                                                                    {item.title}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            {contentTypeId[item.cat3]}
                                                        </CardActions>
                                                    </Card>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className='more-city-info' value='38' onClick={()=>{moreinfo(value,keyWord)}}>More..?</div>
                                {/* </div> 서브카테고리 div 닫는거 */}
                            </TabPanel>
                            <TabPanel value='15'>
                                <div className='keyword-search'>
                                    <div className='searchCity'>
                                        <TextField id="" label="검색할 키워드를 입력하세요" variant="outlined" size="small" fullWidth onKeyPress={(e) => {
                                            if(e.key === 'Enter' && e.target.value !== ''){
                                            setKeyWord(e.target.value);
                                            e.target.value = '';
                                            setCategoryPlace4([]);
                                            }
                                        }}/>
                                    </div>
                                </div>
                                <div style={{display:'flex'}} className='place-heart row'>
                                    {
                                        categoryPlace4 && categoryPlace4.map((item, idx) => (
                                            <div className='col-sm-3'>
                                                { 
                                                    like_list.includes(item.contentid) ?
                                                    <span class="material-icons heart_span" style={{color:'red'}} 
                                                        onClick={()=>{
                                                            delete_btn(event, item.contentid)
                                                        }}>favorite</span>
                                                    :
                                                    <span class="material-icons heart_span" style={{color:'#ccc'}} 
                                                        onClick={()=>{
                                                            insert_btn(event, item)
                                                        }}>favorite_border</span>
                                                }
                                                <Link to={`/place/${city_num}/${item.contentid}`}>
                                                    <Card value={item} sx={{width: 250, height: 300, marginRight: 12}}>
                                                        <CardActionArea>
                                                            {
                                                                item.firstimage ? 
                                                                <CardMedia className='tabtag-image' component="img" width="250" height="180" image = {item.firstimage} alt=""/>
                                                                :
                                                                <CardMedia width="250" height="200" alt="">
                                                                    <span class="material-symbols-outlined span-no-image">image_not_supported</span>
                                                                </CardMedia>
                                                            }
                                                            <CardContent>
                                                                <Typography gutterBottom component="div">
                                                                    {item.title}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            {contentTypeId[item.cat3]}
                                                        </CardActions>
                                                    </Card>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                                <span className='more-city-info' value='15' onClick={()=>{moreinfo(value,keyWord)}}>More..?</span>
                                {/* </div> 서브카테고리 div 닫는거 */}
                            </TabPanel>
                            <TabPanel value='28'>
                                <div className='keyword-search'>
                                    <div className='searchCity'>
                                        <TextField id="" label="검색할 키워드를 입력하세요" variant="outlined" size="small" fullWidth onKeyPress={(e) => {
                                            if(e.key === 'Enter' && e.target.value !== ''){
                                            setKeyWord(e.target.value);
                                            e.target.value = '';
                                            setCategoryPlace5([]);
                                            }
                                        }}/>
                                    </div>
                                </div>
                                <div style={{display:'flex'}} className='place-heart row'>
                                    {
                                        categoryPlace5 && categoryPlace5.map((item, idx) => (
                                            <div className='col-sm-3'>
                                                { 
                                                    like_list.includes(item.contentid) ?
                                                    <span class="material-icons heart_span" style={{color:'red'}} 
                                                        onClick={()=>{
                                                            delete_btn(event, item.contentid)
                                                        }}>favorite</span>
                                                    :
                                                    <span class="material-icons heart_span" style={{color:'#ccc'}} 
                                                        onClick={()=>{
                                                            insert_btn(event, item)
                                                        }}>favorite_border</span>
                                                }
                                                <Link to={`/place/${city_num}/${item.contentid}`}>
                                                    <Card value={item} sx={{width: 250, height: 300, marginRight: 12}}>
                                                        <CardActionArea>
                                                            {
                                                                item.firstimage ? 
                                                                <CardMedia className='tabtag-image' component="img" width="250" height="180" image = {item.firstimage} alt=""/>
                                                                :
                                                                <CardMedia width="250" height="200" alt="">
                                                                    <span class="material-symbols-outlined span-no-image">image_not_supported</span>
                                                                </CardMedia>
                                                            }
                                                            <CardContent>
                                                                <Typography gutterBottom component="div">
                                                                    {item.title}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            {contentTypeId[item.cat3]}
                                                        </CardActions>
                                                    </Card>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                                <span className='more-city-info' value='28' onClick={()=>{moreinfo(value,keyWord)}}>More..?</span>
                                {/* </div> 서브카테고리 div 닫는거 */}
                            </TabPanel>
                            <TabPanel value='32'>
                                <div className='keyword-search'>
                                    <div className='searchCity'>
                                        <TextField id="" label="검색할 키워드를 입력하세요" variant="outlined" size="small" fullWidth onKeyPress={(e) => {
                                            if(e.key === 'Enter' && e.target.value !== ''){
                                            setKeyWord(e.target.value);
                                            e.target.value = '';
                                            setCategoryPlace6([]);
                                            }
                                        }}/>
                                    </div>
                                </div>
                                <div style={{display:'flex'}} className='place-heart row'>
                                    {
                                        categoryPlace6 && categoryPlace6.map((item, idx) => (
                                            <div className='col-sm-3'>
                                                { 
                                                    like_list.includes(item.contentid) ?
                                                    <span class="material-icons heart_span" style={{color:'red'}} 
                                                        onClick={()=>{
                                                            delete_btn(event, item.contentid)
                                                        }}>favorite</span>
                                                    :
                                                    <span class="material-icons heart_span" style={{color:'#ccc'}} 
                                                        onClick={()=>{
                                                            insert_btn(event, item)
                                                        }}>favorite_border</span>
                                                }
                                                <Link to={`/place/${city_num}/${item.contentid}`}>
                                                    <Card value={item} sx={{width: 250, height: 300, marginRight: 12}}>
                                                        <CardActionArea>
                                                            {
                                                                item.firstimage ? 
                                                                <CardMedia className='tabtag-image' component="img" width="250" height="180" image = {item.firstimage} alt=""/>
                                                                :
                                                                <CardMedia width="250" height="200" alt="">
                                                                    <span class="material-symbols-outlined span-no-image">image_not_supported</span>
                                                                </CardMedia>
                                                            }
                                                            <CardContent>
                                                                <Typography gutterBottom component="div">
                                                                    {item.title}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions>
                                                            {contentTypeId[item.cat3]}
                                                        </CardActions>
                                                    </Card>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                                <span className='more-city-info' value='32' onClick={()=>{moreinfo(value,keyWord)}}>More..?</span>
                                {/* </div> 서브카테고리 div 닫는거 */}
                            </TabPanel>
                        </TabContext>
                        
                    </Box>
                </div>
            </div>
            
        </div>

    );
};

export default CityInfoMain;
