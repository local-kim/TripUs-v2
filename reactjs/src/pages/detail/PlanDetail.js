import React, { useState, useRef, useEffect, state } from 'react';
import '../../styles/plandetail.css';
// import ScrollButton from 'react-scroll-button';
import { useNavigate,useLocation, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { daysToWeeks, format } from 'date-fns';
import { da } from 'date-fns/locale';
import { differenceInDays } from 'date-fns';
import { addDays } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { savePlan } from '../../modules/planner';
import Rating from '@mui/material/Rating';
import { PlanDetailMain, PlanDetailMessage, PlanDetailMap } from '.';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { logout } from '../../modules/auth';

import swal from 'sweetalert';


const PlanDetail = () => {

    const {num}=useParams();
    
//stars rating

    const loginNum = useSelector(state => state.auth.user.num); //로그인번호 유지
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn); //로그인여부 체크
    const loginName = useSelector(state => state.auth.user.name);
    const loginProfile = useSelector(state => state.auth.user.profile);

    const [ myLogin, setMyLogin ] = useState();
    // console.log(loginNum);
    
    //mui
    const [value, setValue] = React.useState('1');
    const [starsvalue, setStarsValue] = React.useState(0);

    const [detailData,setDetailData]=useState([0]);

    const handleChange = (event, newValue) => {
    
    };

    //지도api & 관광지 api 
    const [contentId, setContentId] = useState(126674); //임시 contentid 값 추후 cityInfo에서 contentid 넘겨받기
    const [mapx,setMapx]=useState('');
    const [mapy,setMapy]=useState('');
    
    const [placeTitle, setPlaceTitle] = useState();
    const [placeAddr, setPlaceAddr] = useState();
    const [placeImg,setPlaceImg]= useState();
    const [review,setReview]= useState();

    const [cat1name,setCat1name] =useState();
    const [cat2name,setCat2name] = useState();
    const [cat3name,setCat3name] =useState();
    const [placeCategory, setPlaceCategory]=useState();

    // console.log("let cat1:",cat1name,"let cat2:",cat2name,"let cat3:",cat3name);

    // 사진이 있는 장소만 받는 url(arrange=P)
    //  let apiUrl=`http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?ServiceKey=7Et3sUoEnYoi9UiGk4tJayBnDo4ZMQ%2FM%2FOkEKTJMSjXkoukxdqrTDOu3WAzTgO5QsOTQOBSKfwMMuIbl8LyblA%3D%3D&contentId=${contentId}&defaultYN=Y&mapinfoYN=Y&addrinfoYN=Y&firstImageYN=Y&catcodeYN=Y&MobileOS=ETC&MobileApp=AppTest&_type=json`;
    //  let apiUrl2=`http://api.visitkorea.or.kr/openapi/service/rest/KorService/categoryCode?ServiceKey=YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D&cat1=${cat1name}&cat2=${cat2name}&cat3=${cat3name}&MobileOS=ETC&MobileApp=AppTest&_type=json`;

    

    
    //  데이터 가져오기
    const [ddata, setDdata] = useState('');
    const [ndata, setNdata] = useState('');
    const [pdata, setPdata] = useState('');
    const [mdata, setMdata] = useState('');

    //  좋아요
    const [ tLike, setTLike ] = useState('');

    // 상단 이미지 내부내용 반복문 없이 0번데이터만 데이터가져올때 입력
    const [placeName, setPlaceName] = useState('');
    const [dimage, setDimage] = useState('');
    const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [duringDay, setDuringDay] = useState('');
    const [userName, setUserName] = useState('');
    const [planCount, setPlanCount] = useState(0);
    const [userFile, setUserFile ] = useState('');
    const [userNumber, setUserNumber ] = useState('');
    
    const SPRING_URL = process.env.REACT_APP_SPRING_URL;
    
    let detailUrl = SPRING_URL + "plan/list?num="+num;
    let dateUrl = SPRING_URL + "plan/pdate?num="+num;
    let navUrl = SPRING_URL + "plan/nav?num="+num;
    let nameUrl = SPRING_URL + "plan/name?num="+num;
    let mapUrl = SPRING_URL + "plan/map?num="+num;
    let profilePhotoUrl=process.env.REACT_APP_SPRING_URL+"save/";

    // 좋아요 관련
    let planLikeUrl = SPRING_URL + "plan/like?num="+num+"&loginNum="+loginNum;
    let insertLikeUrl = SPRING_URL + "plan/insertlike";
    let deleteLikeUrl = SPRING_URL + "plan/deletelike?num="+num+"&loginNum="+loginNum;
    let totalLikeUrl = SPRING_URL + "plan/totallike?num="+num;

    const likeCheck = () => {
        if(isLoggedIn){
        axios.get(planLikeUrl)
        .then(res => {
            if(res.data == 0){
                setMemLike(false)
            } else {
                setMemLike(true)
            }
        })}
    }

    const insertLike = () => {
        if (!isLoggedIn) {
            swal("","로그인 후 이용해주세요","error")
        } else {
            axios.post(insertLikeUrl, {num: num, loginNum: loginNum})
            .then(res => {
                likeBtnT();
            })
        }
    }

    const deleteLike = () => {
        if (!isLoggedIn) {
            // alert("로그인해라");
            return;
        }
        axios.delete(deleteLikeUrl, {num: num, loginNum: loginNum})
        .then(res => {
            likeBtnF();
        }).catch(err => {
            // console.log(err)
        })
    }

    const totalLike = () => {
        axios.get(totalLikeUrl)
        .then(res => {
            setTLike(res.data);
        })
    }

    //  로그인버튼 MUI
    const [anchorElUser, setAnchorElUser] = useState(null);

    const loginSettings = ['Mypage', 'Dashboard','Logout'];
    const loginLinks = ['../../../mypage/1', '../../../dashboard','../../../logout'];

    const logoutSettings = ['Login', 'Join'];
    const logoutLinks = ['../../../login', '../../../join'];
    
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
    
    
    
    // 일정관련 전체 데이터 
    const planGetData = () => {
        axios.get(detailUrl)
        .then(res => {
            // console.log(res.data);
            setPlaceName(res.data[0].name);
            setMapx(res.data[0].mapx);
            setMapy(res.data[0].mapy);
            setDimage(res.data[0].image);
            setPlanCount(res.data.length);
            setDdata(res.data);
        })
        // .catch(err => {
        //     // alert(err.data);
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
            setMyLogin(res.data[0].member_num);
            setPdata(res.data);
        })
        // .catch(err => {
        //     // alert(err.data);
        // })
    }

    // 일자별 데이터
    const planGetNav = () => {
        axios.get(navUrl)
        .then(res => {
            setNdata(res.data);
        })
        // .catch(err => {
        //     // alert(err.data);
        // })
    }

    const planMember = () => {
        axios.get(nameUrl)
        .then(res => {
            setUserName(res.data[0].name);
            setUserFile(res.data[0].file_name);
            setUserNumber(res.data[0].member_num);
        }).catch(err => {
            // alert(err.data);
            swal("","존재하지 않는 일정","warning");
            navi('../../../');
        })
    }

    useEffect(() => {
        planGetData();
        planGetNav();
        planDate();
        planMember();
        likeCheck();
        totalLike();
        heartLogin();
        console.log(mainList);
        // console.log("login?"+isLoggedIn);
        // console.log(memLike);
    },[])

    
    // const kakaomapscript2 = (d) => {
    //     axios.get(mapUrl)
    //     .then(res => {
    //         setMdata(res.data)
    //     }).catch(err => {
    //         alert(err.data);
    //     })

    //     var positions = [
    //         [...mdata] && [...mdata].map(map, index) (
    //             ({
    //                 title : map.day,
    //                 latLng : new kakao.maps.latLng(map.mapy, map.mapx)
    //             })
    //         )
    //     ]

    //     var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    //     for (var i = 0; i < positions.length; i ++) {
    //         var imageSize = new kakao.maps.Size(24, 35);
    //         var markerImage = new kakao.maps.markerImage(imageSrc, imageSize);

    //         var marker = new kakao.maps.Marker({
    //             map : map,
    //             position : positions[i].latLng,
    //             title : positions[i].title,
    //             image : markerImage
    //         })
    //     }

    //     var container = document.getElementById('place_map'),
    //         option = {
    //             center : new kakao.maps.LatLng(33.450701, 126.570667),
    //             lever : 5,
    //         };

    //     var map = new kakao.maps.Map(container, option);


    // }
    
    const trip_date = new Date(startDate);
    // console.log(addDays(trip_date, 1));

    // 클립보드에 현재 url 복사하기
    
    const copyUrl = () => {
        navigator.clipboard.writeText(window.location.href);

        swal("","클립보드에 복사되었습니다","info")
    }
    
    
    const navi = useNavigate();
    const dispatch = useDispatch();
    

    const [mainList, setMainList] = useState(1);

    const switchOn = (e) => {
        
            // 앞, 뒤 객체 찾기
            var leftList1 = e.currentTarget.previousElementSibling;
            var leftList2 = e.currentTarget.nextElementSibling;

            // 앞, 뒤 객체 있을 때 까지 지우기 반복
            while(leftList1){
                leftList1.classList.remove('on')
                leftList1 = leftList1.previousSibling
            }
            while(leftList2){
                leftList2.classList.remove('on');
                leftList2 = leftList2.nextSibling
            }

            // 현재 객체만 추가
            e.currentTarget.classList.add('on')
         
    }

    const [ memLike, setMemLike ] = useState(false)

    const likeBtnT = () => {
        setMemLike(true)
    }

    const likeBtnF = () => {
        setMemLike(false)
    }

    const heartLogin = () => {
        if(!isLoggedIn){
            setMemLike(false);
        }
    }

    const imgDetail = () => {
        axios.get(detailUrl+num).then(res=>{
            if(res.file_name ===null){
              setDetailData(res.data.dto);
            }
            else{
              setDetailData(res.data.dto);
            }
        })
    }

    //별점 이미지 = https://www.earthtory.com/res//img/common/web/hotel_star_?.?.png

    // const [asd, setAsd] = useState(...Array(ndata.day))

    
        const imgadd1 = `http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?ServiceKey=YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D&contentId=`
        const imgadd2 = `&defaultYN=Y&mapinfoYN=Y&addrinfoYN=Y&firstImageYN=Y&catcodeYN=Y&MobileOS=ETC&MobileApp=AppTest&_type=json`
        
    return (
        <div id = 'plan-detail'>
            <div id = 'place-top' />
            <div className='plan-header'>
                <div className='header-logo'>
                    <img src='../../MainLogo.png' alt='...' 
                    onClick={() => (
                        navi('../../../')
                    )}/>
                </div>
                <div className='header-left'>
                    <div className='header-list' onClick={() => (navi('../../../city/list'))}>
                        <div className='txt'>여행지</div>
                    </div>
                    {/* <div className='header-list' onClick={() => (navi('../../../plan/calendar/159'))}>
                        <div className='txt'>일정 만들기</div>
                    </div>
                    <div className='header-list' onClick={() => (navi('../../../plan/detail/1'))}>
                        <div className='txt'>일정 보기</div>
                    </div> */}
                    <div className='header-list' onClick={() => (navi(`../../../plan/list`))}>
                        <div className='txt'>인기 일정</div>
                    </div>
                    <div className='header-list' onClick={() => (navi('../../../'))}>
                        <div className='txt'>ABOUT</div>
                    </div>
                </div>
                <div className='header-right'>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {
                  isLoggedIn && <Avatar alt={loginName} src={`${process.env.REACT_APP_SPRING_URL}save/${loginProfile}`} />
                }
                        {
                        !isLoggedIn && <Avatar src="/static/images/avatar/2.jpg" />
                        }
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                    {
                        // 로그인 상태의 메뉴
                        isLoggedIn && loginSettings.map((setting,index) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center" onClick={()=>{
                            if(index === loginSettings.length - 1){ // 마지막 메뉴(로그아웃)를 클릭했을 때
                                localStorage.removeItem('jwtToken');
                                dispatch(logout());
                                swal("","로그아웃 되었습니다","success");
                            }
                            else{
                                navi(loginLinks[index]);
                            }
                            }}>{setting}</Typography>
                        </MenuItem>
                        ))
                    }
                    {
                        // 로그아웃 상태의 메뉴
                        !isLoggedIn && logoutSettings.map((setting,index) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center" onClick={()=>{
                            navi(logoutLinks[index]);
                            }}>{setting}</Typography>
                        </MenuItem>
                        ))
                    }
                    </Menu>
                </Box>
                </div>
            </div>
            <div className='all-top'>
            {/* 좌측 이동 리스트 - mainList(개요) 시에만 표시 */}
            {mainList == 1 ? 
            <div className='scroll-item'>
                {/* <a href = {'#place-top'}> */}
                <div className='scroll-item-prev' 
                onClick={() => (
                    window.scrollTo(0, 0)
                )}></div>
                {/* </a> */}
                <div className='scroll-item-list' >
                    <div className={'scroll-item-btn first'}/>
                {
                            // day 만큼 반복문 돌리기
                            [...ndata] && [...ndata].map((nav, index) => (
                                nav.day == 1 ? 
                                <div className={`scroll-item-btn on`} id={'nav-list'+index}
                                 onClick={switchOn} key={index}><a id='nav-hard-css' href = {'#page-'+nav.day}>D{nav.day} Place</a></div> :
                                  <div className={`scroll-item-btn`} id={'nav-list'+index}
                                  onClick={switchOn} key={index}><a id='nav-hard-css' href = {'#page-'+nav.day}>D{nav.day} Place</a></div>
                            
                            ))
                }
                <div className='scoroll-item-btn last' />

                </div>
                <div className='scroll-item-next'></div>
            </div>
            : ''}
            {/* 대표 이미지 */}
            <div className='main-image'
                // style={{backgroundImage:'url(../../city_detail_image/seoul2.jpg)'}}>
                style={{backgroundImage:'url(../../city_detail_image/'+dimage+')'}}>
                <div className='top-box'>
                    {/* 좋아요 버튼 on/off */}
                    { memLike == true && isLoggedIn
                    ? 
                    <div className='like-btn on'>
                        <div className='ico'
                        onClick={deleteLike}></div>
                    </div>
                    :     
                    <div className='like-btn'>
                        <div className='ico'
                        onClick={insertLike}></div>
                    </div>
                    }
                    <div className='clear' />
                </div>
                <div className='cover-bottom'>
                    <div className='bottom-box'>
                        <div className='bottom-head'>
                        {/* <span className="material-icons">person</span> */}
                            {/* <img alt='' src='../../DetailImage/box-user.png' /> */}
                            <img alt='돌려줘' src={profilePhotoUrl+userFile}
                                onClick={() => (
                                    navi(`../../../user/`+userNumber)
                                )} />
                            <span><b style={{color:'white'}}>{userName}</b></span>
                        </div>
                        <div className='bottom-body'>
                            <h4>{placeName} 여행</h4>
                            <h6>{startDate} ~ {endDate} ({duringDay}일)</h6>
                            <div className='bottom-bottom-box'>
                                <div className='bottom-count'>
                                    <img src='../../DetailImage/spot.png' alt='spot' />{planCount}&nbsp;
                                    <img src='../../DetailImage/white-heart2.png' alt='heart' 
                                    style={{width:'17px', height:'16px'}}/> {tLike}&nbsp;
                                    <img src='../../DetailImage/share.png' alt='share' 
                                    style={{width:'17px', height:'17px'}}/> 1&nbsp;
                                </div>
                                {/* <div className='bottom-price'>
                                    <select>
                                        <option>KRW</option>
                                        <option>USD</option>
                                    </select>

                                    <span className='bottom-number'>
                                        00,000,000
                                    </span>
                                    <div className='clear' />
                                </div> */}
                            </div>
                        </div>
                        <div className='clear' />
                    </div>
                </div>
            </div>

            {/* 메뉴창 */}
            <div className='main-list'>
                {/* 상단 메뉴바 */}
                <div className='list-header'>
                    <div className='header-menu on'
                        onClick={(e) => {
                            setMainList(1);
                            switchOn(e);
                        }}>개요</div>
                    <div className='header-menu-line'></div>
                    {/* <div className='header-menu'
                        onClick={() => {
                            setMainList(2);
                        }}>일정표</div>
                    <div className='header-menu-line'></div> */}
                    <div className='header-menu'
                        onClick={(e) => {
                            setMainList(3);
                            switchOn(e);
                        }}>지도</div>
                    <div className='header-menu-line'></div>
                    <div className='header-menu'
                        onClick={(e) => {
                            setMainList(4);
                            switchOn(e);
                        }}>댓글</div>
                    <div className='header-menu-line'></div>

                    {myLogin == loginNum && isLoggedIn
                    ?
                    <div className='header-menu-right1'
                        onClick={() => (navi(`../../../plan/update/`+num))}>수정하기</div>
                    : ''}
                    <div className='header-menu-right2'
                        onClick={copyUrl}>URL복사</div>
                    <div className='clear' />
                </div>
                {/* 메뉴 리스트 */}
                {mainList == 1 ? < PlanDetailMain /> :
                 mainList == 3 ? < PlanDetailMap /> :
                                < PlanDetailMessage /> 
                     
                }
                <div className='clear' />
            </div>
            <div className='clear' />
            </div>
        </div>
    );
};

export default PlanDetail;