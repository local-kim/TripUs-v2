import React, { useState, useRef, useEffect, state } from 'react';
import '../../styles/plandetail.css';
// import ScrollButton from 'react-scroll-button';
import { useNavigate,useLocation, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { daysToWeeks, format } from 'date-fns';
import { da } from 'date-fns/locale';
import { differenceInDays } from 'date-fns';
import { addDays } from 'date-fns';
import { useDispatch } from 'react-redux';
import { savePlan } from '../../modules/planner';
import Rating from '@mui/material/Rating';
import swal from 'sweetalert';

// 카카오맵

const { kakao } = window;
    

const PlanDetailMain = () => {

    const {num}=useParams();
    
    //stars rating

    //mui
    const [value, setValue] = React.useState('1');
    const [starsvalue, setStarsValue] = React.useState(0);


    const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue==='1'){
    return kakaomapscript();
    }
    };

    const [mapx,setMapx]=useState('');
    const [mapy,setMapy]=useState('');

    useEffect(() => {
        kakaomapscript();
    }, [mapx]);

    //kakomap + tourapi3
    const kakaomapscript = (d) => {
        
        const container = document.getElementById('place_map');

        const options = {
            center: new kakao.maps.LatLng(mapy,mapx),
            // center: new kakao.maps.LatLng(35.1591243474,129.1603078991),
            // new kakao.maps.LatLng(y좌표,x좌표)
            level: 2
        };
        
        const map = new kakao.maps.Map(container, options);
    
        //마커가 표시 될 위치
        let markerPosition = new kakao.maps.LatLng(mapy,mapx);

        // 마커를 생성
        let marker = new kakao.maps.Marker({position: markerPosition,});

        // 마커를 지도 위에 표시
        marker.setMap(map);
        //setPlaces(res.data.response.body.items.item);

        // axios.get(apiUrl)
        // .then((res) => {
        // console.dir(res.data.response.body.items.item);
        
        // const apidata=res.data.response.body.items.item;
        // const placex=d.mapx;  //관광지 위치(x좌표)
        // const placey=d.mapy;  //관광지 위치(y좌표)
        // const placetitle=apidata.title; //관광지명
        // const placeaddr1=apidata.addr1; //관광지 주소 
        // const placeaddr2=apidata.addr2; //관광지 상세주소
        // const placeimg=apidata.firstimage; //관광지 대표 이미지
        
                
        
        // const cat1 =apidata.cat1; //관광지 대분류
        // const cat2=apidata.cat2; //관광지 중분류
        // const cat3=apidata.cat3; //관광지 소분류

        // setCat1name(cat1);
        // setCat2name(cat2);
        // setCat3name(cat3);

        
        // console.log("placeimgurl:",placeimg);
        // console.log("placeaddr2:",placeaddr2);

        // setPlaceTitle(placetitle);
        //     if(placeaddr2===undefined){
        //         setPlaceAddr(placeaddr1);
        //     }else{
        //         setPlaceAddr(placeaddr1+placeaddr2);
        //     }
        // setPlaceImg(placeimg);

        // const options = {
        //     center: new kakao.maps.LatLng(placey,placex),
        //     //center: new kakao.maps.LatLng(35.1591243474,129.1603078991),
        //     //new kakao.maps.LatLng(y좌표,x좌표)
        //     level: 2
        // };
        
        // const map = new kakao.maps.Map(container, options);
    
        // //마커가 표시 될 위치
        // let markerPosition = new kakao.maps.LatLng(placey,placex);

        // // 마커를 생성
        // let marker = new kakao.maps.Marker({position: markerPosition,
        // });

        // // 마커를 지도 위에 표시
        // marker.setMap(map);
        // //setPlaces(res.data.response.body.items.item);
        // }).catch((err) => {
    
        // });
    };

    // axios.get(apiUrl2).then((res) => {

    //     console.log("apiUrl2",res.data.response.body.items.item);
    //     const api2data=res.data.response.body.items.item;
    //     const servicetypecodename=api2data.name;
    //     setPlaceCategory(servicetypecodename);

    // }).catch((err) => {
    
    // });

    const kakaomapscript2 = () => {
        axios.get(mapUrl)
        .then(res => {
            setMdata(res.data)
        })
        // .catch(err => {
        //     alert(err.data);
        // })

        // for (var i = 0; i < mdata.length; i ++ )
        var positions = [
            [...mdata] && [...mdata].map((m) => (
                ({
                    title : m.day,
                    latLng : new kakao.maps.latLng(m.mapy, m.mapx)
                })
            ))
        ]

        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

        for (var i = 0; i < positions.length; i ++) {
            var imageSize = new kakao.maps.Size(24, 35);
            var markerImage = new kakao.maps.markerImage(imageSrc, imageSize);

            var marker = new kakao.maps.Marker({
                map : map,
                position : positions[i].latLng,
                title : positions[i].title,
                image : markerImage
            })
        }

        var container = document.getElementById('place_map'),
            option = {
                center : new kakao.maps.LatLng(33.450701, 126.570667),
                lever : 5,
            };

        var map = new kakao.maps.Map(container, option);


    }



    //  데이터 가져오기
    const [ddata, setDdata] = useState('');
    const [ndata, setNdata] = useState('');
    const [pdata, setPdata] = useState('');
    const [mdata, setMdata] = useState('');

    // 상단 이미지 내부내용 반복문 없이 0번데이터만 데이터가져올때 입력
    const [placeName, setPlaceName] = useState('');
    const [dimage, setDimage] = useState('');
    const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [duringDay, setDuringDay] = useState('');
    const [userName, setUserName] = useState('');
    
    const SPRING_URL = process.env.REACT_APP_SPRING_URL;
    
    let detailUrl = SPRING_URL + "plan/list?num="+num;
    let dateUrl = SPRING_URL + "plan/pdate?num="+num;
    let navUrl = SPRING_URL + "plan/nav?num="+num;
    let nameUrl = SPRING_URL + "plan/name?num="+num;
    let mapUrl = SPRING_URL + "plan/map?num="+num;
    
    // 일정관련 전체 데이터 
    const planGetData = () => {
        axios.get(detailUrl)
        .then(res => {
            // console.log(res.data);
            setPlaceName(res.data[0].name);
            setMapx(res.data[0].mapx);
            setMapy(res.data[0].mapy);
            setDimage(res.data[0].image);
            setDdata(res.data);
        })
        // .catch(err => {
        //     alert(err.data);
        // })
    }
    // 여행 날짜 및 기간 
    const planDate = () => {
        axios.get(dateUrl)
        .then(res => {
            // console.log(res.data);
            setStartDate(res.data[0].start_date);
            setEndDate(res.data[0].end_date);
            setDuringDay(res.data[0].days);
            setPdata(res.data);
        })
        // .catch(err => {
        //     alert(err.data);
        // })
    }

    // 일자별 데이터
    const planGetNav = () => {
        axios.get(navUrl)
        .then(res => {
            setNdata(res.data);
        })
        // .catch(err => {
        //     alert(err.data);
        // })
    }

    const planMember = () => {
        axios.get(nameUrl)
        .then(res => {
            setUserName(res.data[0].name);
        })
        // .catch(err => {
        //     alert(err.data);
        // })
    }

    useEffect(() => {
        planGetData();
        planGetNav();
        planDate();
        planMember();
    },[])
    
    const trip_date = new Date(startDate);
    // console.log(addDays(trip_date, 1));

    // 클립보드에 현재 url 복사하기
    const copyUrl = () => {
        navigator.clipboard.writeText(window.location.href);

        swal("","클립보드에 복사되었습니다","info")
    }
    
    
    const navi = useNavigate();
    const dispatch = useDispatch();
    
    
    // navi('../../../place/placedetail', {state:{place:day.contentid}})
    const modifyPlan = () => {
        const start = format(startDate, "yyyy-MM-dd");
        const end = format(endDate, "yyyy-MM-dd");
        const days = differenceInDays(endDate, startDate) + 1;
        const cityName = placeName;
        // console.log({start, end, days, cityNum, areaCode, sigunguCode});
        dispatch(savePlan(start, end, days, cityName));

        navi('../../../plan');
        
        // navi('../../../plan', {
        //     state:{
        //         planner:{
        //             cityName : placeName,
        //             startDate : startDate,
        //             endDate : endDate,
        //             days : duringDay

        //         }
        //     }
        // })
    }

    
    
    return (
        <div className='wrap-list'>
                    <div className='list-left'>

                        {
                            // day 만큼 반복문 돌리기
                            [...ddata] && [...ddata].map((day, index) => (
                                
                                <div className='day-box' key={index}>
                                {/* 상단바 첫스케쥴 기준 반복 */}
                                    {day.order == 1 ? 
                                    <div className='day-box-title'>
                                        {/* Day별 간격 - distance 덮기 */}
                                        <div className='undistance' />

                                        {/* 왼쪽 list 이동시 top위치 잡아줄 투명 div */}
                                        <div className='last-box' id={'page-'+day.day}
                                            style={{
                                                position:'relative',
                                                top:'-100px'
                                            }} />
                                        <div className='day-num' id={'day-nav'+day.day}>
                                            Day{day.day}

                                        </div>
                                        <div className='day-date'>
                                            <div className='day-date-left'>
                                                <div className='date'>
                                                {format(addDays(trip_date, day.day-1), "yyyy-MM-dd")}
                                                </div>
                                                <div className='day-title'>
                                                    {day.name}
                                                </div>
                                                <div className='clear' />
                                            </div>
                                            <div className='day-date-right'>
                                                {/* 총 금액(사용안할듯) */}
                                                <div className='clear' />
                                            </div>
                                        </div>
                                        <div className='clear'></div>
                                    </div>
                                     : ''}
                                    {/* 리스트-하단바 */}
                                    <div className='day-box-list'>
                                        <div className='day-list-num'>
                                            <div className='list-num'>{day.order}</div>
                                        </div>
                                        <div className='list-content'>
                                            <img alt='spot' src={day.firstimage !== null ? day.firstimage : '../../empty_image.jpg'} className='spot-img'/>
                                            <div className='spot-content-box'>
                                                <div className='spot-name'>
                                                <Link to={`/place/${day.city_num}/${day.contentid}`} >
                                                    {day.title}
                                                </Link>
                                                </div>
                                                <div className='spot-info'>
                                                    {/* <img alt src='https://www.earthtory.com/res//img/common/web/hotel_star_1.5.png' className='star' /> */}
                                                    <div className='sinfo-cat2'>{day.cat2_name}</div>
                                                    <div className='sinfo-line' />
                                                    <div className='sinfo-txt'>
                                                    review&nbsp;<Rating name="read-only" style={{position:'relative', top:'5px', zIndex:'10'}} value={day.avg_star} readOnly size="small" precision={0.1} />({day.avg_star == 0 ? `리뷰없음` : day.avg_star})
                                                    </div>
                                                    <div className='clear' />
                                                </div>
                                            </div>
                                            <div className='spot-btn-box'>
                                                <img alt='' src='https://www.earthtory.com/res/img/mypage/plan/sub/map_ico.png' className='spot-btn map_view' 
                                                onClick={() => {
                                                    // 카카오맵에 사용될 X, Y 좌표 직접 변경 
                                                    setMapx(day.mapx);
                                                    setMapy(day.mapy);
                                                }}/>
                                                
                                                <img alt='' src='https://www.earthtory.com/res/img/mypage/plan/sub/info_ico.png' className='spot-btn spot-info-btn' 
                                                onClick={() => {
                                                    navi('../../../place/placedetail', {state:{place:day.contentid}})
                                                }}/>
                                                <div className='clear' />
                                            </div>
                                            <div className='clear' />
                                        </div>
                                        <div className='clear' />
                                        <div className='list-add-content'>
                                            <div className='list-use-price'>
                                                {/* <div className='use-price'>
                                                    use-price
                                                </div> */}
                                                <div className='use-memo'>
                                                    {day.cat3_name}
                                                </div>
                                            </div>
                                            <div className='clear' />
                                        </div>
                                    </div>
                                    {/* 일정간 간격 */}
                                        <div className='day-box-distance' />

                                    
                                   </div>
                                
                            ))
                        }
                        
                    </div>
                    <div className='list-right'>
                        <div className='list-right-map' id='place_map'>
                            
                        </div>
                        <div className='spot-list-box'>
                        
                            <div className="row">
                            {
                            // 일정 수 만큼 반복문 돌리기
                            [...ddata] && [...ddata].map((day, index) => (

                                <div className="col-sm-4 rlist" key={index}>
                                    <div className="spot-number">{index+1}</div>
                                    <div className="spot-title"
                                    onClick={() => {
                                        // setContentId(day.place_id);
                                        // kakaomapscript(day);         api에 사용될 지역코드 변경 

                                        // 카카오맵에 사용될 X, Y 좌표 직접 변경 
                                        setMapx(day.mapx);
                                        setMapy(day.mapy);
                                    }}>{day.title}</div><span>···</span>
                                </div>
                            ))
                            }
                            </div>
                            <div className='row-more'>스크롤해서 더보기...</div>
                        </div>
                    </div>
                </div>
    );
};

export default PlanDetailMain;