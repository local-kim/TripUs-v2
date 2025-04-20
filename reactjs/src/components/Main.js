import { BorderAll, Margin } from '@mui/icons-material';
import { height, textAlign } from '@mui/system';
import React ,{useState} from 'react';
import { ReactDOM } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../main.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import MainLogo from '../assets/images/MainLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../modules/auth';
import AnimatedNumber from "react-animated-numbers"
import { Carousel } from 'reactjs-infinite-carousel';

import Fullpage,{FullPageSections,FullpageSection,FullpageNavigation} from '@ap.cx/react-fullpage';
import Myslide from './Myslide';
import Myslide2 from './Myslide2';

import '../main.css';
import axios from 'axios';
import jQuery from 'jquery';
import { NavLink } from 'react-router-dom';
import { setDate } from 'date-fns';

import ButtonGroup from '@mui/material/ButtonGroup';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';

import MenuList from '@mui/material/MenuList';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


import Beach from './Beach.mp4';
import Islands from './Islands.mp4';
import Cliff from './Cliff.mp4';
import Wave from './Waves.mp4';
import zIndex from '@mui/material/styles/zIndex';

import page2img from '../assets/images/busan1.jpg';
import page3img from '../assets/images/junjoo1.jpg';
import page4img from '../assets/images/seoul1.jpg';
import page5img from '../assets/images/seoul2.jpg';

import page6img from '../assets/images/seoul4.jpg';
import page7img from '../assets/images/seoul5.jpg';
import page8img from '../assets/images/seoul6.jpg';



//ㅡㅡㅡㅡㅡㅡㅡ배경 랜덤 

const video =[Beach, Cliff, Islands, Wave];
const video_Number = 4;

const getRandom=()=>{

    return Math.floor(Math.random()* video_Number)
}

const options = ['인기순','오름차순' ,'내림차순'];

// ㅡㅡㅡㅡㅡㅡㅡㅡㅡ


const Main=(row)=>{

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [number, setNumber] = React.useState(32838)
  const [number2, setNumber2] = React.useState(30000)
  const [number3, setNumber3] = React.useState(3000)
  const [number4, setNumber4] = React.useState(3000)

  const [diff, setDiff] = React.useState(0)


  //숫자 애니메이션 

  // const easeOutExpo = (t = 3000) => {

  //  return  t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
  // }
  
    
  // const useCountUp  = (end = 3000, start = 0, duration = 2000) => {  
    
  //   const [count, setCount] = useState(start)
  //   const frameRate = 1000 / 60
  //   const totalFrame = Math.round(duration / frameRate)

    
  
  //   useEffect(() => {
  //     let currentNumber = start
  //     const counter = setInterval(() => {
  //       const progress = easeOutExpo(++currentNumber / totalFrame)
  //       setCount(Math.round(end * progress))
  
  //       if (progress === 1) {
  //         clearInterval(counter)
  //       }
  //     }, frameRate)
  //   }, [end, frameRate, start, totalFrame])
  // }



     // redux에서 변수 얻기
  const dispatch = useDispatch();

  const loginNum = useSelector(state => state.auth.user.num);
  const loginName = useSelector(state => state.auth.user.name);
  const loginProfile = useSelector(state => state.auth.user.profile);
  const loginType = useSelector(state => state.auth.user.type);

  const pages = ['여행지', '인기 일정', 'About']; //일정 만들기 , '일정 보기'
  const pageLinks = ['city/list', 'plan/list', '']; //, 'plan/city/108', 'plan/detail/1'

  const loginSettings = ['Mypage', 'Schedule','Logout'];
  const loginLinks = ['mypage/1', 'dashboard','logout'];

  const logoutSettings = ['Login', 'Join'];
  const logoutLinks = ['login', 'join'];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };



    let cityDataUrl = process.env.REACT_APP_SPRING_URL + "cityData/";

    const [citydata2,setCityData2] = useState([]);
    const [citydata3,setCityData3] = useState([]);
    const [citydata4,setCityData4] = useState([]);

    const [citydata,setCityData] = useState('');

    const [allUserTrip,setAllUserTrip] = useState('');
    const [allUser,setAllUser] = useState('');
    const [allReview,setAllReview] = useState('');
    const [allPlace,setAllPlace] = useState('');




    let allTripUrl = process.env.REACT_APP_SPRING_URL + "allUserTrip";
    

    const allTrip=()=>{
        axios.get(allTripUrl)
        .then(res=>{
    
            setAllUserTrip(res.data);
            console.log(res.data);
   
        })
        .catch(err => {
            alert(err);
        })
      }


      let allUserUrl = process.env.REACT_APP_SPRING_URL + "allUser";
    

      const allUserCount=()=>{
          axios.get(allUserUrl)
          .then(res=>{
      
              setAllUser(res.data);
              console.log(res.data);
     
          })
          .catch(err => {
              alert(err);
          })
        }

        let allReviewUrl = process.env.REACT_APP_SPRING_URL + "allReview";
    

        const allReviewCount=()=>{
            axios.get(allReviewUrl)
            .then(res=>{
        
                setAllReview(res.data);
                console.log(res.data);
       
            })
            .catch(err => {
                alert(err);
            })
          }

          let allPlaceUrl = process.env.REACT_APP_SPRING_URL + "allPlace";
    

          const allPlaceCount=()=>{
              axios.get(allPlaceUrl)
              .then(res=>{
          
                  setAllPlace(res.data);
                  console.log(res.data);
         
              })
              .catch(err => {
                  alert(err);
              })
            }


    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment);
    };

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };
    
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);


    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
      };
      
      const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
      };
      
      const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };
      
      const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
      
        setOpen(false);

    }
   
    const [city, setCity] = useState([]) 

    const navi=useNavigate();

    const sectionStyle = {
        height:'100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center'

    }

    

    const sectionStyle2 = {
        height:'',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center'

    }

    const sectionStyle3 = {
      
        height:'100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        

    }


    const sectionStyle5 = {
      
      height:'100vh',
      width: '100%',
    
      justifyContent: 'center',
      alignItems:'center',
      

  }

    const Search=(e)=>{


        if(e.target.value!=""){

        let searchUrl = process.env.REACT_APP_SPRING_URL+"searchauto?searchWord="+e.target.value;
    
    
    
    
        axios.get(searchUrl)
        .then(res=>{
            console.log(res.data)
        
          setCity(res.data);
            
    
        })
    
    }else{
        setCity('');
    }
       
    
    }

    const handleKeyPress = e => {
        if(e.key === 'Enter') {
            setCity();
        }
      }

      useEffect(() => {

        allTrip();
        allUserCount();
        allReviewCount();
        allPlaceCount();
      

      }, []);

      // const page2Image = [page2img ,page3img, page4img, page5img]
      // const page3Image = [page6img ,page7img, page8img]
      
       
      
      //   useEffect(() => {
      //     const interval = setInterval(() => {
      //       page2Image();
      //       page3Image();

      //     }, 1000);
      //     return () => clearInterval(interval);
      //   }, []);

      const list= [
        {
          image_url : `${page2img}` , 
        },
        
        {
          image_url : `${page3img}` ,
        },

        {
          image_url : `${page4img}` ,
        },

        {
          image_url : `${page5img}` ,
        },
      
      ];



      const list2= [
        {
          image_url : `${page6img}` , 
        },
        
        {
          image_url : `${page6img}` ,
        },

        {
          image_url : `${page8img}` ,
        },
      
      ];

    const [category, setCategory] = useState(0); //카테고리 숫자 저장 하는 변수 

    return(
 
        <Fullpage>
           <AppBar position="fixed" style={{ backgroundColor:'rgba( 0,0,0,0.0 )'}}>
      <Container maxWidth="xl" style={{ backgroundColor:'rgba( 0,0,0,0.0 )'}}>
        <Toolbar disableGutters style={{ backgroundColor:'rgba( 0,0,0,0.0 )'}}>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              backgroundColor:' none;'
            }}
          >
            <img src={MainLogo} alt='' style={{width:'60px'}}/>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                backgroundColor:'0D9DE6'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                backgroundColor:'0D9DE6',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' ,backgroundColor:'0D9DE6' },
              }}
            >
              {pages.map((page, index) => (
                <Link to={`/${pageLinks[index]}`} key={index}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              backgroundColor:' none;'
              
            }}
          >
            
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Link to={`/${pageLinks[index]}`} key={index}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {
                  isLoggedIn && loginType == 2 && <Avatar alt={loginName} src={loginProfile} />
                }
                {
                  isLoggedIn && loginType == 1 && <Avatar alt={loginName} src={`${process.env.REACT_APP_SPRING_URL}save/${loginProfile}`} />
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
                  <MenuItem key={setting} onClick={() => {
                    handleCloseUserMenu();

                    if(index === loginSettings.length - 1){ // 마지막 메뉴(로그아웃)를 클릭했을 때
                      localStorage.removeItem('jwtToken');
                      dispatch(logout());
                    }
                    else{
                      navi(loginLinks[index]);
                    }
                  }}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))
              }
              {
                // 로그아웃 상태의 메뉴
                !isLoggedIn && logoutSettings.map((setting,index) => (
                  <MenuItem key={setting} onClick={() => {
                    handleCloseUserMenu();
                    navi(logoutLinks[index]);
                  }}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>


          <FullpageNavigation/>
            <FullPageSections>
                <FullpageSection style={sectionStyle3}>      
                     <div className='main_top'>
                             <div style={{zIndex:'1000'}}>
                            <video muted autoPlay loop style={{width:'100%', height:'100vh', objectFit:'cover',position:'absolute'}}>
                                <source src={video[getRandom()]} type="video/mp4"/>
                            </video>
                            </div> 
                             <div className="wrap"style={{marginTop:'60px'}}>
                         
                            <div className='main_top_title' >나만의 여행 플래너 Trip:Us!</div>
                            <div className='main_top_desc' >쉽고 빠르게 여행을 계획하세요.</div>
                            <div className='search_area' >
                                <div className='city_autocomplete' style={{display:'block'}}></div>
                                <input className='search_input' placeholder='도시명으로 검색' autoComplete="off" onKeyUp={Search} ></input>
                                <ul  style={{display:'block'}} id="searchAuto">{city && city.map((data, index)=>(<li onClick={()=>{navi(`/city/${data.num}`)}} >{data.name} <span className="h_search_cicu">대한민국</span></li> ))}</ul>
                                    <div className='latest_search'><Link to={`city/list`} style={{color:'white', margin: '10px' ,fontSize: '15px' , textDecorationLine: 'none', fontWeight: 'bolder'}}>추천도시</Link>:  <Link to={`city/108`} style={{color:'white', margin: '10px' ,fontSize: '15px' , textDecorationLine: 'none', fontWeight: 'bolder'}}>서울</Link> <Link to={`city/159`} style={{color:'white', margin: '10px' ,fontSize: '15px' , textDecorationLine: 'none', fontWeight: 'bolder'}}>부산</Link> <Link to={`city/184`} style={{color:'white', margin: '10px' ,fontSize: '15px' , textDecorationLine: 'none', fontWeight: 'bolder'}}>제주</Link> <Link to={`city/136`} style={{color:'white', margin: '10px' ,fontSize: '15px' , textDecorationLine: 'none', fontWeight: 'bolder'}}>안동</Link> <Link to={`city/105`} style={{color:'white', margin: '10px' ,fontSize: '15px' , textDecorationLine: 'none', fontWeight: 'bolder'}}>강릉</Link> </div>
                            </div>
                            
                        </div>
                        
                    </div>  
              
                </FullpageSection>
                <FullpageSection style={sectionStyle}>                
                    
                <div className="page2Wrap" style={{fontFamily:'Montserrat'}} >
                    <div className='page2img' style={{       
                            color:'white',
                            height: '100vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width:'60vh',
                            fontWeight:'bold',
                            fontFamily: 'Montserrat',
                            background: `url(${list})`
                            
                            }}>
                             

                
                   
                        {/* <h5 style={{marginBottom:'350px', fontSize:'px',fontFamily:'Montserrat'}}>
                            여행 일자,가고 싶은 장소만
                            <br/>
                            선택하면 일정이 자동으로 완성되는
                            <br/>
                            쉽고 간편한 여행 일정 플래너</h5> */}
                            

                        <div style={{marginTop:'680px',marginLeft:'30px', color:'white' , fontSize:'20px',fontFamily:'Montserrat'}}>
                            <AnimatedNumber style={{display:'inline-block'}}
                                              fontStyle={{ fontFamily: ",fontFamily:'Montserrat'" , fontWeight:'bold', color:'white' , fontSize:'20px' ,animationDuration: 90}}
                                              animateToNumber={allUser}
                                              includeComma
                                              config={{ tension: 89, friction: 40  }}
                                              onStart={() => console.log("onStart")}
                                              onFinish={() => console.log("onFinish")}
                
                                              animationType={"calm"}
                                             
                                            />유저수
                        </div>

                               <div style={{marginTop:'680px' , marginLeft:'60px',color:'white', fontSize:'20px',fontFamily:'Montserrat'}}>
                            <AnimatedNumber style={{display:'inline-block'}}
                                              fontStyle={{ fontFamily: ",fontFamily:'Montserrat'", fontSize:'20px', fontWeight:'bold' ,color:'white'  }}
                                              animateToNumber={allPlace}
                                              includeComma
                                              config={{ tension: 89, friction: 40 ,duration: 800 }}
                                              onStart={() => console.log("onStart")}
                                              onFinish={() => console.log("onFinish")}
                                              animationType={"calm"}
                                            />여행지
                        </div>      

                                                       <div style={{marginTop:'680px' , marginLeft:'60px',color:'white', fontSize:'20px',fontFamily:'Montserrat',marginRight:'20px'}}>
                            <AnimatedNumber style={{display:'inline-block'}}
                                              fontStyle={{ fontFamily: ",fontFamily:'Montserrat'", fontSize:'20px', fontWeight:'bold' ,color:'white'  }}
                                              animateToNumber={number}
                                              includeComma
                                              config={{ tension: 89, friction: 40 }}
                                              onStart={() => console.log("onStart")}
                                              onFinish={() => console.log("onFinish")}
                                              animationType={"calm"}
                                            />관광지
                        </div>                      

                      <div style={{
                          
                          backgroundColor: 'black',
                          zIndex:'-10',
                          height: '130px',
                          opacity: '0.4',
                          marginRight: '200px',
                          position: 'absolute',
                          width: '677px',
                          marginTop: '666px'}}></div>    
                    </div>                    
                </div>

                <div style={{margin: '0' , padding: '0'}} className="uk-width-3-5@m">
                    <div>
                        <div className="row" style={{height: '300px'}}>
                            <div style={{
                                    margin: '0',
                                    padding: '0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    msFlexDirection: 'column',
                                    backgroundColor: '#fff',
                                    height: '100%',
                                    marginLeft:'20px'}}
                                   className = "col s12 m4">

                                <h4 style={{fontFamily: 'Montserrat !important', textAlign:'center'}}>
                                    <b style={{fontSize:'35px' ,fontFamily:'Montserrat'}}>STEP 1</b>
                                    <br/>
                                    <br/>
                                <div style={{color: 'gray' , fontSize:'25px' , textAlign:'center',fontFamily:'Montserrat'}}>여행지선택</div>
                                </h4>
                            
                              </div>

                                                
                                <div style={{
                                    margin: '0',
                                    padding: '0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    msFlexDirection: 'column',
                                    backgroundColor: '#fff',
                                    height: '100%'}}
                                   className = "col s12 m4">

                                <h4 style={{fontFamily: 'Montserrat !important'}}>
                                    <b style={{fontSize:'35px',fontFamily:'Montserrat'}}>STEP 2</b>
                                    <br/>
                                    <br/>
                                <div style={{color: 'gray' , fontSize:'25px' , textAlign:'center',fontFamily:'Montserrat'}}>장소선택</div>
                               
                                
                                </h4>
                               

                                </div>

                                <div style={{
                                    margin: '0',
                                    padding: '0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    msFlexDirection: 'column',
                                    backgroundColor: '#fff',
                                    height: '100%'}}
                                   className = "col s12 m4">

                                <h4 style={{fontFamily: 'Montserrat !important'}}>
                                    <b style={{fontSize:'35px',fontFamily:'Montserrat', fontWeight:''}}>STEP 3</b>
                                    <br/>
                                    <br/>
                                <div style={{color: 'gray' , fontSize:'25px' , textAlign:'center',fontFamily:'Montserrat'}}>일정생성</div>
                                </h4>


                                  </div>
                                  <div style={{fontSize:'20px', display:'flex' , justifyContent:'center',marginLeft:'15px' , marginTop:'130px', cursor:'pointer'}} onClick={() =>  isLoggedIn ? navi('/city/list') : navi('/login')}>  지금 일정 만들기 </div> 

                               </div>                   
                            </div>
                        </div>
                    
             </FullpageSection>


             <FullpageSection style={sectionStyle5}>                
                    
             <div className="page2Wrap" >
                      <div style={{margin: '0' , padding: '0' ,alignSelf:'center' ,marginTop: '10px'}} className="uk-width-3-5@m">                      
                            <div className="row" style={{height:'150px'}}>
                                <div style={{
                                        margin: '0',
                                        padding: '0',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        msFlexDirection: 'column',
                                        backgroundColor: '#fff',
                                        height: '100%',
                                        marginLeft:'20px',
                                        textAlign:'center',
                                        
                                        
                                        }}
                                       className = "col s12 m4">
    
                                    <h4 style={{fontFamily: 'Montserrat !important', textAlign:'center'}}>
                                    <b style={{fontSize:'35px' ,fontFamily:'Montserrat'}}>STEP 4</b>
                                        <br/>
                                        <br/>
                                        <div style={{color: 'gray' , fontSize:'25px' , textAlign:'center',fontFamily:'Montserrat'}}>일정공유</div>
                                    </h4>
                                
                                  </div>
    
                                                          
                                          <div style={{
                                              margin: '0',
                                              padding: '0',
                                              display: 'flex',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                              msFlexDirection: 'column',
                                              backgroundColor: '#fff',
                                              height: '100%'}}
                                            className = "col s12 m4">
          
                                          <h4 style={{fontFamily: 'Montserrat !important'}}>
                                          <b style={{fontSize:'35px' ,fontFamily:'Montserrat'}}>STEP 5</b>
                                              <br/>
                                              <br/>
                                              <div style={{color: 'gray' , fontSize:'25px' , textAlign:'center',fontFamily:'Montserrat'}}>리뷰작성</div>
                                          </h4>
                                        
    
                                    </div>
    
                                    <div style={{
                                            margin: '0',
                                            padding: '0',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            msFlexDirection: 'column',
                                            backgroundColor: '#fff',
                                            height: '100%'}}
                                          className = "col s12 m4">
        
                                        <h4 style={{fontFamily: 'Montserrat !important'}}>
                                        <b style={{fontSize:'35px' ,fontFamily:'Montserrat'}}>STEP 6</b>
                                            <br/>
                                            <br/>
                                            <div style={{color: 'gray' , fontSize:'25px' , textAlign:'center',fontFamily:'Montserrat'}}>추천하기</div>
                                        </h4>
                                    </div>


                                     
                                    <div style={{fontSize:'20px', display:'flex' , justifyContent:'center',marginLeft:'15px' , marginTop:'165px' , cursor:'pointer'}} onClick={() =>  isLoggedIn ? navi('/mypage/1') : navi('/login')}>  지금 일정 공유하기 </div> 
{/*                                      
                                     <button onClick={isLoggedIn ? navi('/mypage/1') : navi('/login')}>
                                        Click
                                      </button> */}
                                                                          
                                      </div>                                 
                                    </div>

                                
                                 

                                    <div className='page3img' style={{       
                                      color:'white',
                                      height: '100vh',
                                      display: 'flex',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      width:'90vh',
                                      fontWeight:'bold',
                                      textAlign:'center',
                                      justifyContent:'center',
                                      zIndex:1000
                                      // background: 'linear-gradient(to left, rgb(113,113,255),rgb(138,255,146))'
                                      
                                      }}>
{/* 
      
                              <h7 style={{marginBottom:'350px', fontSize:'px'}}>
                                    여행 공유, 지역추천
                                    <br/>
                                    모든 사람들과 일정 공유를
                                    <br/>
                                    쉽고 간편한 여행 일정 플래너</h7>  */}
                                    
                               
        
                                  <div style={{marginTop:'680px',marginLeft:'30px', color:'white' , fontSize:'20px',justifyContent:'center'}}>
                                      <AnimatedNumber style={{display:'inline-block',justifyContent:'center'}}
                                                        fontStyle={{ fontFamily: "Nunito" , fontWeight:'bold', color:'white' , fontSize:'20px',justifyContent:'center' }}
                                                        animateToNumber={allUserTrip}
                                                        includeComma
                                                        config={{ tension: 89, friction: 40 }}
                                                        onStart={() => console.log("onStart")}
                                                        onFinish={() => console.log("onFinish")}
                                                        animationType={"calm"}
                                                      />일정수
                                    </div>
    
                                   <div style={{marginTop:'680px' , marginLeft:'60px',color:'white', fontSize:'20px',justifyContent:'center'}}>
                                <AnimatedNumber style={{display:'inline-block', justifyContent:'center'}}
                                                  fontStyle={{ fontFamily: "Nunito", fontSize:'20px', fontWeight:'bold' ,color:'white',justifyContent:'center' }}
                                                  animateToNumber={allReview}
                                                  includeComma
                                                  config={{ tension: 89, friction: 40 }}
                                                  onStart={() => console.log("onStart")}
                                                  onFinish={() => console.log("onFinish")}
                                                  animationType={"calm"}
                                                />리뷰댓글
                                                                                                                    
                                        </div>

                                        <div style={{
                             
                             backgroundColor: 'black',
                             
                             height: '130px',
                             opacity: '0.4',
                             zIndex:'-10',
                             position: 'absolute',
                             width: '480px',
                             marginTop: '666px',}}
                              ></div>    
                       
                                        
                                      </div>                                  
                                    </div>                                                                                                                                                              
                      </FullpageSection>
                


                
                {/* <FullpageSection style={sectionStyle}>                
                    
                    <div className='page white'>
                        <div className='wrap'>
                          
                            <div className='page_title' style={{marginTop:'150px'}}>Trip:Us에서 여행을 시작하세요!</div>
                            <div className='clear'></div>
                            <div className="intro_list">
                                <div className="intro_box" onClick={() => navi('/ko/area')}>
                                    <img src="https://www.earthtory.com/res/img/main/intro_img/intro_1.jpg" alt=""/>
                                <div className="intro_title">여행정보</div>
                                <div className="intro_desc"> 대한민국 
                                            <AnimatedNumber style={{display:'inline-block'}}
                                              fontStyle={{ fontFamily: "Nunito", fontSize: 25 }}
                                              animateToNumber={number}
                                              includeComma
                                              config={{ tension: 89, friction: 40 }}
                                              onStart={() => console.log("onStart")}
                                              onFinish={() => console.log("onFinish")}
                                              animationType={"calm"}
                                            /> 개의도시, 
                                            <br></br>
                                            <br/>
                                            <AnimatedNumber style={{display:'inline-block'}}
                                              fontStyle={{ fontFamily: "Nunito", fontSize: 25 }}
                                              animateToNumber={number2}
                                              includeComma
                                              config={{ tension: 89, friction: 40 }}
                                              onStart={() => console.log("onStart")}
                                              onFinish={() => console.log("onFinish")}
                                              animationType={"calm"}
                                            /> 
                                            개의 관광명소, 음식점<br/> 쇼핑 정보를 확인하세요.	</div>
                            </div>

                            <div className="intro_box">
                                <img src="https://www.earthtory.com/res/img/main/intro_img/intro_2.jpg" alt=""/>
                                <div class="intro_title"> 여행일정	</div>
                                <div class="intro_desc" style={{marginLeft:'5px'}}>대한민국       
                                            <span>
                                             <AnimatedNumber style={{display:'inline-block'}}
                                              fontStyle={{ fontFamily: "Nunito", fontSize: 25 }}
                                              animateToNumber={number3}
                                              includeComma
                                              config={{ tension: 89, friction: 40 }}
                                              onStart={() => console.log("onStart")}
                                              onFinish={() => console.log("onFinish")}
                                              animationType={"calm"}
                                            /> 개 이상의 여행일정을 확인하고 <br/> 나만의 일정을 계획해 보세요.
                                            </span>
                                            </div>
                            </div>
                                        
                            <div className="intro_box">
                                <img src="https://www.earthtory.com/res/img/main/intro_img/intro_3.jpg" alt=""/>
                                <div className="intro_title">커뮤니티</div>
                                <div className="intro_desc" style={{marginLeft:'5px'}}>여행자들과 정보를 공유하고, 궁금한 것은 언제든 물어보세요.</div>
                            </div>

                            <div className="clear"></div>
                            <a href="/ko/intro" className="intro_link"> 사용방법이 궁금하신가요?</a>
                        </div>
                    </div>
                </div>
             </FullpageSection> */}
                
            <FullpageSection style={sectionStyle}>
                <div className="page silver" style={{paddingTop:"30px"}}>    
                <div className="wrap" style={{width:'1200px'}}>
                    <div className="page_title" >
                        <div> 인기 여행일정</div>
                    </div>
                    
                    <div className="page_desc">다른 여행자들의 일정을 참고해 나만의 여행을 계획해보세요!</div>

                            <Myslide></Myslide>
                
                                     <div className="more_btn" style={{marginTop:'70px'}}> <Link to = {`plan/list`} style={{color:'black'}}> {allUserTrip} 개의 추천일정 모두보기</Link> </div> 
                            
                        </div>
                    </div>  
  
                </FullpageSection>

                <FullpageSection style={sectionStyle}>
                     <div className="page silver">
                        <div className="wrap">
                            <div className="page_title" style={{marginTop:'70px'}}>인기도시</div>
                            <p className="uk-text-meta">  여행지를 목록에서 직접 선택해주세요.  </p>

                        <div style={{textAlign:'center' , borderColor:'white'}}>
                            <ToggleButtonGroup
                                color="primary"
                                value={alignment}
                                exclusive
                                onChange={handleChange}
                                >
                                <ToggleButton onClick={() => setCategory(0)} value="web">전체</ToggleButton>
                                <ToggleButton onClick={() => setCategory(1)} value="ios">도시</ToggleButton>
                                <ToggleButton onClick={() => setCategory(2)} value="android">바다</ToggleButton>
                                <ToggleButton onClick={() => setCategory(3)} value="tema">테마</ToggleButton>
                                

                             </ToggleButtonGroup>
                        </div>


                            {/* 
                                 <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        '& > *': {
                                        m: 1,
                                        },
                                    }}
                                    >
                          
                                    <ButtonGroup variant="text" aria-label="text button group">
                                        <Button>전체</Button>
                                        <Button>바다</Button>
                                        <Button>전통</Button>
                                        <Button>산악</Button>
                                    </ButtonGroup>
                                    </Box> */}

                           
                   

                                <div style={{float:'right'  ,borderColor:'#f6f6f6', marginBottom:'20px'}}>
                                    <React.Fragment>
                                        <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button" style={{zIndex:'1000'}}>
                                            <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                                            <Button
                                            size="small"
                                            aria-controls={open ? 'split-button-menu' : undefined}
                                            aria-expanded={open ? 'true' : undefined}
                                            aria-label="select merge strategy"
                                            aria-haspopup="menu"
                                            onClick={handleToggle}
                                            >
                                            <ArrowDropDownIcon />
                                            </Button>
                                        </ButtonGroup>
                                        <Popper 
                                            open={open}
                                            anchorEl={anchorRef.current}
                                            role={undefined}
                                            transition
                                            disablePortal
                                            style={{zIndex:'1000'}} >
                                            {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{
                                                transformOrigin:
                                                    placement === 'bottom' ? 'center top' : 'center bottom',
                                                }}
                                            >
                                                <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList id="split-button-menu" autoFocusItem>
                                                    {options.map((option, index) => (
                                                        <MenuItem
                                                        key={option}
                                                        // disabled={index === 2}
                                                        selected={index === selectedIndex}
                                                        onClick={(event) => handleMenuItemClick(event, index)}
                                                        >
                                                        {option}
                                                        </MenuItem>
                                                    ))}
                                                    </MenuList>
                                                </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                            )}
                                        </Popper>
                                        </React.Fragment>
                                    </div>

                                <div className="top_city_list">

                                    <Myslide2 row={row} select={selectedIndex} category={category}></Myslide2>
                                             
                                    <div className="clear"></div>
                                </div>
                            </div>
                        </div>
                </FullpageSection>

                        {/* <FullpageSection style={sectionStyle}>
                                <Carousel images={list} autoPlay={2} />;
                      </FullpageSection>             */}
            </FullPageSections>
        </Fullpage>

        
    )
}

export default Main;
