import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../../styles/join.css';
// import GoogleLogin from 'react-google-login';
import KakaoLogin from 'react-kakao-login';
import { SearchId, SearchPass } from './index.js';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../modules/auth';
import kakao_icon from '../../assets/images/icon_login_kakao.png';
import naver_icon from '../../assets/images/naver_icon.png';
import google_icon from '../../assets/images/google_icon.png';


const LoginForm = () => {
   const [ id, setId ] = useState('');
   const [password,setPassword] = useState('');
   const [ email, setEmail ] = useState('');
   const [SearchId_modal,setSearchId_modal] = useState(false);
   const [SeachPass_modal,setSearchPass_modal] = useState(false);
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const [ token, setToken ] = useState();
   const [ profile,setProfile ] = useState();
   const [ nickname,setNickname ] = useState();
  
                




   let saveId=useSelector(state => state.auth.saveId);
   let saveUser=useSelector(state => state.auth.user.id);
   console.log(saveUser);

    // redux
    const dispatch = useDispatch();
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')
 
    const handleInputId = (e) => {


        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    const navi=useNavigate();
    const REST_API_KEY = "c78ded458e4b18060e7a0d0868e70cd1";
    const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    let loginUrl = `${process.env.REACT_APP_SPRING_URL}auth/login`;
    
    // const onSubmit=(e)=>{
    //     e.preventDefault();
    //     const url=process.env.REACT_APP_SPRING_URL+"login";
    //     axios.post(url,{id,password})
    //     .then(res=>{
    //         if(res.data===0){
    //             alert("아아디 또는 비밀번호가 틀렸습니다")
    //         }else{
    //             localStorage.loginOk="yes";
    //             localStorage.myid=id;
    //             navi(-1);//새로고침
                
    //         }
    //     })
        
    // }
  

    const onClickLogin = (e) => {
        e.preventDefault();

        // console.log('click login')
        // console.log('ID : ', inputId)
        // console.log('PW : ', inputPw)

        axios.post(loginUrl, {id: inputId, password: inputPw})
        .then(res => {
          console.log(res.data);
          localStorage.setItem('jwtToken', res.data.token); // 로컬 스토리지에 토큰 저장
          dispatch(login(isChecked, res.data)); // redux에 로그인 유저 정보 저장
          navi(-1);
          // navi("/");
        })
        .catch(err => {
          console.log(err);
          alert("아이디 또는 비밀번호가 일치하지 않습니다.");
          // input 초기화
          setInputId('');
          setInputPw('');
        })
    }
    //카카오 로그인 API

    // window.kakao.init("e836ea2cbc2eeba0ece8371ed77a25e0");
    function KakaoLogin() {
      window.Kakao.Auth.login({
        //받아오고 싶은 정보
        scope: 'profile_nickname, profile_image, account_email',
        //로그인 후 실행되는 코드(res=받아온데이터)
        success: function (res) {
          //console.log(res);
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: res => {
              console.log(JSON.stringify(res));

              
  
              //이메일 중복확인
              //-----Username 중복체크
              const id = res.id;
              const email = res.kakao_account.email;
              const restoken = res.access_token;
              const profile = res.properties.profile_image;
              const nickname = res.properties.nickname;
              const emailChkUrl =
                process.env.REACT_APP_SPRING_URL + 'member/emailcheck?email=' + email;
  
              axios.get(emailChkUrl).then(res => {
                if (res.data === 0) {
                  //IF, 이메일이 USER TABLE에 없으면 회원가입
                  const joinurl = process.env.REACT_APP_SPRING_URL+'auth/kakaojoin';
                  axios
                    .post(joinurl, {
                      id: id,
                      email: email,
                      // profile: profile,
                      name: nickname,
                      type: 2
                    })
                    .then(res => {
                      // 회원가입 후 프로필, 기타 정보를 박아넣음.  여기서 authenticate url 호출하면 될 것 같기는 함..
                      // setToken(restoken);
                      // // setProfile(profile);
                      // setNickname(nickname);
                      // setId(id);
                      // setEmail(email);
                      // goToMain();
                      axios
                    .post(process.env.REACT_APP_SPRING_URL+'auth/kakaologin', {
                      id: id
                    })
                    .then(res => {
                      console.log(res.data);
                      
                      dispatch(login(false, {
                        id: id,
                        email: email,
                        name: nickname,
                        profile: profile,
                        type: 2,
                        num: res.data.num
                      }));

                      navi("/");
                    })
                    .catch(err => console.log(err));

                      // dispatch(login(false, {
                      //   id: id,
                      //   email: email,
                      //   name: nickname,
                      //   profile: profile,
                      //   type: 2
                      // }));

                      // navi("/");
                    })
                    .catch(err => console.log(err));
                } else {
                  // //로컬스토리지에 저장
                  // setToken(restoken);
                  // // setProfile(profile);
                  // setNickname(nickname);
                  // setId(id);
                  // setEmail(email);
                  // goToMain();

                  axios
                    .post(process.env.REACT_APP_SPRING_URL+'auth/kakaologin', {
                      id: id
                    })
                    .then(res => {
                      console.log(res.data);
                      
                      dispatch(login(false, {
                        id: id,
                        email: email,
                        name: nickname,
                        profile: profile,
                        type: 2,
                        num: res.data.num
                      }));

                      navi("/");
                    })
                    .catch(err => console.log(err));

                }
              }
              );
            },
            fail: function (error) {
              console.log(error);
            },
          });
        },
      });
    }
    const goToMain = () => {
      navi('/');
    };
    
    // const onGoogleSignInSuccess = (res) => {
 
    //     const params = new URLSearchParams();
    //     params.append("idToken", res.tokenObj.id_token);
    
    //     const googleLogin = async () => {
    //       const res = await axios.post("요청 주소", params, {
    //         headers: {
    //           "Content-Type": "application/x-www-form-urlencoded",
    //         },
    //       });
    
    //       localStorage.setItem("accessToken", res.data.token.access);
    //       localStorage.setItem("refreshToken", res.data.token.refresh);
    //     };
    
    //     googleLogin();
    //   };

    // //로그인 성공했을 떄 처리 함수 
    // const successGoogle = (response) => {
    //     console.log(response);
    // }
        
    // //로그인 실패했을 때 처리 함수 
    // const failGoogle = (response) => {
    //     console.log(response);
    // }
    // <GoogleLogin
    // clientId="362168925347-7h80oeftm2cub12235gac45dvhjo9fce.apps.googleusercontent.com"
    // buttonText="Login"
    // onSuccess={successGoogle}
    // onFailure={failGoogle}
    // cookiePolicy={'single_host_origin'}
    // />
    // const [id, setId] = useState("");
    // const [isRemember, setIsRemember] = useState(false);
  

    // useEffect(() => {
    // if(cookies.rememberId !==undefined) {
    //         setId(cookies.rememberId);
    //         setIsRemember(true);
    //     }
    // }, []);

    // const handleOnChange = (e) => {
    //     setIsRemember(e.target.check);
    // if(e.target.check){
    //     setCookie('rememberId', id, {maxAge: 2000});
    //     }else {
    //     removeCookie('rememberId');
    //     }
    // }
    const [isChecked, setIsChecked] = useState(saveId);
    const handleChecked = (event) => {
        setIsChecked(event.target.checked);
        if (event.target.checked) {
            localStorage.clear();
            saveUser='';
            saveId=false;
        } else {
            saveId(true);  
            saveUser(inputId);
        }
    //     if(!event.target.checked){
    //    saveId(true);  
    //    saveUser(inputId);
    // } else{
    //     saveId(false);  
    //     setInputId('');
    //    saveUser('');
    // }
     };
     const removeStorage = () => {
        if(!isChecked) {
            localStorage.clear();
            saveUser='';
            saveId=false;
        }
     }

     useEffect(()=>{
        removeStorage();
     },[])

    return (
        
        <div className='container_login'>
      <form onSubmit={onClickLogin}>
        <div className='text'>LOGIN</div>
        <div className='small_text'>나만의 여행 플래너 - TRIP:US</div>
     
      <div className='form_container'>
      <div className='data'>
          <label>아이디</label>
            <input type="text" id="LoginId" value={isChecked ? saveUser : inputId } onChange={handleInputId}
            required></input>
        </div>
        <div className="id_checked">
            <input type="checkbox"  id='id_checkbox'
              checked={isChecked} onChange={handleChecked}/>
            <label className="loginPage_text" >아이디 저장</label>
        </div>
        <br></br>
        <div className='data'>
          <label>비밀번호</label>
          <input type="password" id="LoginPass" value={inputPw} onChange={handleInputPw} required></input>
        </div>
        <div className='forgot_pass'>
          <a href='/find'>비밀번호를 잊으셨나요?</a>
        </div>
        <div className='login_btn'>
          <button type='submit' id='loginBtn'>로그인</button>
        </div>
        <div className='signup_link'>
          회원이 아니세요?
          <a href="join">회원가입하기</a>
        </div>
      </div>
      <div className='divider_container'>
        <div className='divider'></div>
        <span>or</span>
      </div>
      <div className='socialBtn-container'>
        <div className='socialBtn'>
        
        <button type='button' onClick={KakaoLogin} style={{border:'0',backgroundColor:'#fff'}}><img src={kakao_icon}/></button>
       
        </div>
        {/* <div className='socialBtn'>
          <img src={naver_icon} alt='네이버'></img>
        </div>
        <div className='socialBtn'>
          <img src={google_icon} alt='구글'>
          </img>
          <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_API_KEY}
                    buttonText="Login"
                    onSuccess={successGoogle}
                    onFailure={failGoogle}
                    cookiePolicy={'single_host_origin'}
                />

        </div> */}
      </div>
      </form>
    </div>
    );
};

export default LoginForm;


// <div className="section_login">
        //     <form onSubmit={onClickLogin}>
        //         <h3 className="tit_login">로그인</h3>
        //         <div className="write_form">

        //         <input type="text" name="" size="20" placeholder="아이디를 입력해주세요"
        //             value={isChecked ? saveUser : inputId } onChange={handleInputId}/>
        //         <label className="loginPage_text">
        //             <input type="checkbox" 
        //             checked={isChecked} onChange={handleChecked}
        //                 />
        //             ID 저장하기
        //         </label>
        //         <input type="password" name="" size="20" placeholder="비밀번호를 입력해주세요"
        //             value={inputPw} onChange={handleInputPw}/>
        //             <div className="login_search">
        //                 <a className="link"  onclick="" href=''>
        //                 아이디 찾기
        //                 </a>
        //                 <span className="bar"></span>
        //                 <a className="link">
        //                 비밀번호 찾기
        //                 </a>
        //             </div>
        //         </div>
             

        //         <button className="btn_type1" type="submit">
        //             <span className="txt_type">로그인</span>
        //         </button>
            
        //         <button type='button' className="btn_type2 btn_member" onClick={()=>{
        //             console.log("hi");
        //             navi("/join");
        //         }} >
        //             <span className="txt_type">회원가입</span>
        //         </button>
            
        //         <h1>
        //             <a href={KAKAO_AUTH_URL}>Kakao Login</a>
        //         </h1>
                
        //         <div className="grid-naver" id='naverIdLogin'></div>
                
        //         <GoogleLogin
        //             clientId={process.env.REACT_APP_GOOGLE_API_KEY}
        //             buttonText="Login"
        //             onSuccess={successGoogle}
        //             onFailure={failGoogle}
        //             cookiePolicy={'single_host_origin'}
        //         />
        //     </form>
        // </div>