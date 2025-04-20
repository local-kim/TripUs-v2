import React, { useEffect, useState, useRef, useCallback } from "react";
import "./Mypage2.css";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Avatar from "react-avatar";
import "moment/locale/ko";
import { useBoolean, useInterval } from "react-use";
import { useSelector } from "react-redux";
import MyReviews from "./MyReviews";
import MyTrips from "./MyTrips";


const Mypage = () => {
  // 강제 렌더링
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const navi = useNavigate();
  const [photo, setPhoto] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  const [dto, setDto] = useState("");
  const [memberList, setMemberList] = useState([]);
  const [data2, setCityTrip] = useState({});
  const [count, setCount] = React.useState(0);
  const [delay, setDelay] = React.useState(1000);
  const [isRunning, toggleIsRunning] = useBoolean(true);
  const fileInput = useRef(null);
  const { currentPage } = useParams();
  const [data, setData] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [passOk, setPassOk] = useState(false);
  const [btnOk, setBtnOk] = useState(false);
  const [open, setOpen] = React.useState(false);
  const loginNum = useSelector((state) => state.auth.user.num);

  const [value, setValue] = useState(0);
  const loginProfile = useSelector(state => state.auth.user.profile);
  const loginType = useSelector(state => state.auth.user.type);
  const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  

  // url
  let pagelistUrl = process.env.REACT_APP_SPRING_URL + "mypage/pagelist?loginNum=" + loginNum; //?currentPage=" + currentPage;
  let photoUrl = process.env.REACT_APP_SPRING_URL + "save/";
  let uploadUrl = process.env.REACT_APP_SPRING_URL + "mypage/upload";
  let insertUrl = process.env.REACT_APP_SPRING_URL + "mypage/insert";
  let updateUrl = "http://localhost:9001/shop/update";
  let detailUrl = "http://localhost:9001/shop/detail";
  let mypageUrl = process.env.REACT_APP_SPRING_URL + "mypage/profile?loginNum=" + loginNum;
  let photonameUrl = process.env.REACT_APP_SPRING_URL + "mypage/photo";
  let citytripUrl = `${process.env.REACT_APP_SPRING_URL}mypage/citytrip?currentPage=${currentPage}&loginNum=${loginNum}`;
  let profileUrl = process.env.REACT_APP_SPRING_URL + "mypage/profile?loginNum="+loginNum;
  
  // let myPlaceUrl = `${process.env.REACT_APP_SPRING_URL}plan/my-place-list?cityNum=${trip.cityNum}?loginNum=${loginNum}`;

  const getData=useCallback(()=>{
    axios.get(profileUrl)
    .then(res=>{
        setDto(res.data.member);
        setImage(photoUrl + res.data.photo);
        setPhoto(res.data.photo);
        console.log(res.data.member);
    })
    .catch(err => {
        alert(err);
    })

    // axios.get(photonameUrl).then(res=>{
    //     setImage(photoUrl + res.data);
    // })

}, [profileUrl, photoUrl])

useEffect(()=>{
    getData();
},[getData]);

  const [reviewList, setReviewList] = useState([]);

  let reviewUrl = `${process.env.REACT_APP_SPRING_URL}mypage/myreview?loginNum=${loginNum}`;

  useEffect(() => {
    axios.get(reviewUrl)
    .then(res => {
      console.log(res.data);
      setReviewList(res.data);
    })
    .catch(err => console.log(err));
  }, []);

  const citytriplist = () => {
    axios
      .get(citytripUrl)
      .then((res) => {
        setCityTrip(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.data);
      });
  };

  useEffect(() => {
    getData();
    citytriplist();
    pageList();
  }, [currentPage]); //currentPage가 변경될때마다 다시 호출



  // 시작시 호출되는 함수
  const pageList = () => {
    axios
      .get(pagelistUrl)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        alert("pagelist");
      });
  };





  return (
    <div id="mypage">
      <div style={{ margin: "0", padding: "0", outline: "0", boxSizing: "border-box" }}>
        <div className="wrapper">
          <div className="container">
            {/* <div className="top-background-div"></div> */}
            <div className="top-container" >
              {
                  loginType == 2 && <Avatar  src={loginProfile}  size={200}/>
                }
                {
                  loginType == 1 && <Avatar  src={`${process.env.REACT_APP_SPRING_URL}save/${loginProfile}`} size={200} />
                }
       

              {/* <div className="profilePhoto-text" id="profilePhote">a</div> */}
              
              <div className="id-wrap">
                <div className="text">{dto.id}</div>
                {/* <button
                  className="btn-normal"
                  onClick={() => {
                    navi("/mypage/profile");
                  }}
                > */}
                  {/* 프로필 수정 */}
                  <span class="material-icons" onClick={() => {
                    navi("/mypage/profile");
                  }}>
                    edit
                  </span>
                {/* </button> */}
              </div>
              
            </div>

            <div>
              <div className="row">
                <div className="index-section">
                  <div className="index-circle" onClick={() => setValue(0)}>
                    <h5>
                      <b>나의 일정</b>
                    </h5>
                    <div>
                      <h2 style={{ lineHeight: "1", fontWeight: "700" }} id="myPlan">
                        {data.totalCount}
                      </h2>
                    </div>
                  </div>
                  <div className="index-circle" onClick={() => setValue(1)}>
                    <h5>
                      <b>나의 리뷰</b>
                    </h5>
                    <div>
                      <h2 style={{ lineHeight: "1", fontWeight: "700" }} id="myReview">
                        {data.totalCount2}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {
            value === 0 ? (
              <MyTrips data2={data2} setCityTrip={setCityTrip} loginNum={loginNum} currentPage={currentPage} />
            ) : <MyReviews reviewList={reviewList} />
          }
          
          <div class="info-container p-5">
            <button
              class="btn-normal"
              onClick={() => {
                navi("/");
              }}
            >
              홈으로 가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
