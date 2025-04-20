import React, { useState } from 'react';
import { differenceInDays, format } from "date-fns";
import { style } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import KakaoShareButton from "./KakaoShareButton";
import moment from "moment";
import axios from "axios";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const MyTrips = ({data2, setCityTrip, loginNum, currentPage}) => {
  const navi = useNavigate();

  // 지난 일정 체크박스
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  let dDay;

  const calculateDday = (date) => {
    // const nowTime = moment().format('YYYY-MM-DD');
    const nowTime = moment();
    //  console.log("nowTime:"+ nowTime);
    // 출력 결과 : nowTime:2022-07-11

    // const lastTime = moment(citytrip[0].startDate).format('YYYY-MM-DD');
    const lastTime = moment(date);
    //    console.log("lastTime:"+ lastTime);
    // 출력 결과 : nowTime:2022-07-21

    dDay = Math.floor((lastTime - nowTime) / 86400000) + 1;
    // console.log("디데이:" + dDay);
    // if (dDay<0) {
    //     dDay=0;
    // }

    return dDay;
  };

  let tripdeleteUrl = process.env.REACT_APP_SPRING_URL + `mypage/tripdelete?loginNum=${loginNum}&tripNum=`;

  const tripdelete = (num) => {
    if (window.confirm("정말 삭제합니까?")) {
      axios
        .get(tripdeleteUrl + num)
        .then((res) => {
          setCityTrip(res.data);

          alert("삭제되었습니다.");

          window.location.replace("/mypage/1");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("취소합니다.");
      return;
    }
  };

  const tripnamesave = (num, name) => {
    let tripnameupdateUrl = process.env.REACT_APP_SPRING_URL + "mypage/tripnameupdate";

    axios.post(tripnameupdateUrl, { num, name }).then((res) => {
      window.location.reload();
    });
  };

  return (
    <div>
      <div className="uk-container-large" id="mypageData">
        <div className="uk-padding-small">
          <div className="section-title-container">
            <span className="section-title">
              나의 일정
            </span>

            {/* <FormControlLabel control={
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                sx={{
                  color: '#888888',
                  '&.Mui-checked': {
                    color: '#98dde3',
                  },
                }}
              />} 
            label="지난 일정 보기" /> */}
          </div>

          {data2.list &&
            data2.list.map((row, index) => (
              <span id="resultArea">
                <div style={{ margin: "16px 0 " }}>
                  <div className="uk-card uk-card-default uk-grid-collapse uk-grid" style={{ padding: "30px" }} uk-grid="">
                    <div className="uk-width-1-3@m uk-first-column">
                      <div className="uk-grid" uk-grid="" style={{ margin: "0", height: "60%" }}>
                        <div className="uk-width-1-2 info-container uk-first-column">
                          <img
                            className="imgclass"
                            src={`../city_image/${row.image}`}
                            alt={row.image}
                            onClick={() => {
                              navi(`/plan/detail/${row.tripNum}`);
                            }}
                          />
             
                          <div className="share-circle" id="sharedLogo_idx_0" style={{ display: "none" }}>
                            공유
                          </div>                      
                        </div>
                        <div
                            className="d-day-circle"
                            style={{
                              backgroundColor:
                                calculateDday(row.startDate) < 0 && calculateDday(row.endDate) > 0
                                  ? "#ffd467"
                                  : calculateDday(row.startDate) === 0
                                  ? "orange"
                                  : calculateDday(row.startDate) < 0
                                  ? "gray"
                                  : "",
                            }}
                          >
                            {calculateDday(row.startDate) === 0 ? (
                              "디데이"
                            ) : calculateDday(row.startDate) > 0 ? (
                              `D-${calculateDday(row.startDate)}`
                            ) : calculateDday(row.endDate) > 0 ? (
                              <div>여행중</div>
                            ) : (
                              "지난일정"
                            )}
                          </div>
                        <div className="uk-width-1-2 info-container">
                          <div className="travel-title">{row.eng_name}</div>
                          <div className="uk-text-meta">
                            {row.country} {row.cityName}
                          </div>
                          <div className="uk-text-meta" style={{ fontSize: "12px", marginTop: "8px" }}></div>
                          <div className="info-container" style={{ marginTop: "40px", backgroundColor: "white" }}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "70px",
                                height: "70px",
                                borderRadius: "50%",
                                backgroundColor: "#f6f6f6",
                                color: "black",
                                fontWeight: "700",
                              }}
                            >
                              {row.days - 1}박 {row.days}일
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="uk-width-2-3@m">
                      <div className="uk-grid uk-grid-stack" uk-grid="" style={{ margin: "20px", height: "40%" }}>
                        <div className="uk-width-expand@m uk-first-column">
                          <div className="small-title">
                            <label style={{ marginLeft: "35px", marginRight: "20px" }}>여행이름</label>

                            <input
                              className="
                                uk-input123
                                uk-form-blank
                                uk-form-width-medium
                                small-text
                              "
                              type="text"
                              value={row.tripName}
                              id="inputTravelName_idx_0"
                              style={{ width: "150px" }}
                              onChange={(e) => {
                                // setDto({
                                //     ...dto,
                                //     name: e.target.value
                                // })
                                // row.tripName = e.target.value;
                                // console.log(e.target.value);
                                // setChangeTripName(e.target.value);
                                // tripnamesave(row.tripNum, e.target.value);
                                setCityTrip({
                                  ...data2,
                                  list: [
                                    ...data2.list.slice(0, index),
                                    {
                                      ...row,
                                      tripName: e.target.value
                                    },
                                    ...data2.list.slice(index + 1)
                                  ]
                                })
                              }}
                            />

                            <button className="savebutton" onClick={() => tripnamesave(row.tripNum, row.tripName)}>
                              <svg width="40px" height="20" style={{ paddingRight: "20px" }} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  fill="none"
                                  stroke="#000"
                                  d="M18.65,1.68 C18.41,1.45 18.109,1.33 17.81,1.33 C17.499,1.33 17.209,1.45 16.98,1.68 L8.92,9.76 L8,12.33 L10.55,11.41 L18.651,3.34 C19.12,2.87 19.12,2.15 18.65,1.68 L18.65,1.68 L18.65,1.68 Z"
                                ></path>
                                <polyline fill="none" stroke="#000" points="16.5 8.482 16.5 18.5 3.5 18.5 3.5 1.5 14.211 1.5"></polyline>
                              </svg>
                            </button>

                            <span style={{ marginLeft: "30px" }}>여행일자</span>

                            <span className="small-text" style={{ paddingTop: "20px" }}>
                              <span style={{ paddingTop: "10px" }}>
                                {row.startDate} ~ {row.endDate}
                              </span>
                            </span>
                          </div>

                          <div className="uk-grid" uk-grid="" style={{ margin: "0", height: "50%" }}>
                            <div className="uk-width-1-2 info-container-bottom uk-first-column"></div>
                          </div>
                        </div>
                      </div>

                      <div className="uk-grid uk-grid-stack" uk-grid="" style={{ margin: "0", height: "40%", marginLeft: "50px" }}>
                        <div className="uk-width-expand@m info-container uk-first-column">
                          <div
                            className="
                            uk-text-center
                            uk-grid
                            uk-width-1-1
                            uk-padding-small
                        "
                            uk-grid=""
                          >
                            <div className="uk-width-1-4 uk-first-column">
                              <div>
                                <button
                                  className=" 
                                        uk-button
                                        uk-button-large
                                        uk-card-default
                                    "
                                  id="modifySavedRoute_idx_0"
                                  onClick={() => {
                                    navi(`/plan/update/${row.tripNum}`);
                                  }}
                                
                                >
                                  일정 수정
                                </button>
                              </div>
                            </div>

                            <div className="uk-width-1-4">
                              <div>
                                <button
                                  className=" 
                                        uk-button
                                        uk-button-large
                                        uk-card-default
                                    "
                                  uk-toggle="target:#modal-center_idx_0"
                                  aria-expanded="false"
                                >
                                  <KakaoShareButton row={row} key={index}></KakaoShareButton>
                                </button>
                              </div>
                            </div>
                            <div className="uk-width-1-4">
                              <div>
                                <button
                                  onClick={() => tripdelete(row.tripNum)}
                                  className="
                                        uk-button
                                        uk-button-large
                                        uk-card-default
                                    "
                                  id="deleteSavedBtn_0"
                                  style={{ marginRight: "30px" }}
                                >
                                  삭제
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="modal-center_idx_0" className="uk-flex-top uk-modal" uk-modal="">
                    <div
                      className="
                        uk-modal-dialog
                        uk-modal-body
                        uk-margin-auto-vertical
                      "
                    >
                      {/* <button className="uk-modal-close-default uk-icon uk-close" type="button" uk-close=""><svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"></line><line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"></line></svg></button> */}

                      <div className="uk-text-center uk-grid uk-width-1-1 uk-padding-small uk-grid-stack" uk-grid="">
                        <div className="uk-width-1-2">
                          <div>
                            {/* <button id="kakaoLinkBtn_idx_0" className="
                                    uk-button
                                    uk-button-large
                                    uk-card-default
                                    mypage-share-button
                                ">
                                카카오톡 공유
                            </button> */}
                          </div>
                        </div>
                        <div className="uk-width-1-2">
                          <div>
                            {/* <button className="
                                    uk-button
                                    uk-button-large
                                    uk-card-default
                                    mypage-share-button
                                " uk-toggle="target: #modal-send-email_idx_0" aria-expanded="false">
                                이메일 전송 공유
                            </button> */}
                          </div>
                        </div>
                      </div>

                      {/* <table className="uk-table">
                    <caption>
                        공유된 친구
                    </caption>
                    <thead>
                        <tr>
                            <th>닉네임</th>
                            <th>ID or EMAIL</th>
                            
                            <th>관리</th>
                        </tr>
                    </thead>

                    <tbody id="sharedEmailList_idx_0">
                        
                    </tbody>
                </table> */}
                    </div>
                  </div>
                </div>

                <div id="modal-send-email_idx_0" className="uk-flex-top uk-modal" uk-modal="">
                  <div
                    className="
                uk-modal-dialog
                uk-modal-body
                uk-margin-auto-vertical
            "
                  >
                    {/* <button class="uk-modal-close-default uk-icon uk-close" type="button" uk-close=""><svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><line fill="none" stroke="#000" stroke-width="1.1" x1="1" y1="1" x2="13" y2="13"></line><line fill="none" stroke="#000" stroke-width="1.1" x1="13" y1="1" x2="1" y2="13"></line></svg></button> */}
                  </div>
                </div>
              </span>
            ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <ul className="pagination" style={{ textAlign: "center", display: "inline-block" }}>
            {data2.startPage > 1 ? (
              <li>
                <Link to={`/mypage/${data2.startPage - 1}`}>
                  이전
                </Link>
              </li>
            ) : (
              ""
            )}

            {data2.parr &&
              data2.parr.map((n) => {
                const url = "/mypage/" + n;
                return (
                  <li className={n == currentPage ? "active" : ""} style={{ float: "left" }}>
                    <Link to={url}>
                      {n}
                    </Link>
                  </li>
                );
              })}
            {data2.endPage < data2.totalPage ? (
              <li>
                <Link to={`/mypage/${data2.endPage + 1}`}>
                  다음
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyTrips;