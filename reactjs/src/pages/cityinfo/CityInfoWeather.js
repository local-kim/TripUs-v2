// import React, { useState } from 'react';

// const CityInfoWeather = () => {

//     // const [list,setList]=useState('');

//     // const dispatch = useDispatch();
//     // const num = useSelector(state => state.weatherdata.num);
//     // const member_num = useSelector(state => state.weatherdata.member_num);
//     // const city_num = useSelector(state => state.weatherdata.city_num);


//     // const wwww = async () => {
//     //     await dispatch(qweqwe(zzz))
//     //     .then(res=>{
//     //         setList(res.payload);
//     //         console.log(res.payload);
//     //         console.dir(res.payload);
//     //     })
//     // }

//     // let trip_url=`${process.env.REACT_APP_SPRING_URL}city/tripdata?city_num=${city_num}&member_num=3`;     




//     // 주석처리 코드 모음

//     /////////////////////////////////////////////// 1
//     // [obdject Object] 데이터 값 콘솔에 출력
//     // for ( var key in cityPlan) {
//     //     // console.log("key : "+cityPlan[key]);
//     //     Object.keys(cityPlan);
//     //     console.log(cityPlan);
//     // }
//     // console.log("cityPlan:"+JSON.Stringify(cityPlan));          // [object Object]로 콘솔에 나올 때 JSON 방식으로 데이타 보여주는 코드



//     ////////////////////////////////////////////// 2
//     //날씨 데이타 가져오기
//     // 배웠던 방식
//     // const Weather_Data = () => {
//     //     // weather_url=`https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${API_KEY}&numOfRows=6&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=${start_date}&endDt=${end_date}&stnIds=${num}`;
//     //     console.log("are_wurl : "+weather_url);
//     //     axios.get('http://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=hG2QkKkmuiN38w%2BeGu53VbRK%2BBNzKRpnjbLE%2BHDXZ0dHzgbBQ67K67NsuR5xOAs%2BErSqbSpOpk1UKBnj4dvlnA%3D%3D&numOfRows=3&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=20220704&endDt=20220706&stnIds=159')
//     //     .then(response=>{
//     //         console.log("suse"+response);
//     //         // console.log("dd"+res.data)
//     //         // setResult(res.data);
//     //     })
//     //     .catch(
//     //         error=>console.log(error)
//     //     );
//     // }
//     // useEffect(() => {
//     //     Weather_Data();
//     // },[result,weather_url])
    
//     // async,await 방식
//     // const Weather_Data = async ()=>{
//     //         // weather_url=`https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${API_KEY}&numOfRows=6&dataType=xml&dataCd=ASOS&dateCd=DAY&startDt=${start_date}&endDt=${end_date}&stnIds=${num}`
//     //     try {
//     //         console.log("are_wurl : "+weather_url)
//     //         const res = await axios.get(weather_url)
//     //         console.log("res"+res.data);
//     //         setResult(res.response.body.items.item);
//     //     }catch(err) {
//     //         console.log(err);
//     //     }
//     // }
//     // console.log("re:"+result);
//     //////이미지로 변환하는 방법
//     // if (result.data.weather[0].main === "Clouds"){
//     //     setImg('../public/WeatherImage/비.png');
//     // console.log(img);
//     // }



//     ////////////////////////////////////////////// 3
//     // 날씨 url
//     // let weather_url=`https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=${API_KEY}&numOfRows=6&dataType=xml&dataCd=ASOS&dateCd=DAY&startDt=${cityPlan.data[0].start_date}&endDt=20210803&stnIds=${cityData.num}`       // 기상청 과거데이터 다됨
//     //const weather_url=`https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&cnt=3&appid=${API_KEY}`         // 최대예측 16일까지 일일데이터 (유료)
//     //const weather_url=`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`             // 5일간 3시간 간격
//     //const weather_url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`            // 현재 날씨
//     //const weather_url=`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${location}&appid=${API_KEY}`    // 4일간 예측 (유료)
//     //const weather_url=`https://api.aerisapi.com/conditions/summary/${location}?format=json&from=&to=&client_id=${API_ID}&client_secret=${API_KEY}`

//     // 날씨 api
//     // const API_ID="pN8sverBEceulMUULSyvZ";
//     // const API_KEY="QWZmBxA43k5EL7jQRyF5gMWtHEXBAgmpBjVXmgfh";
//     //const API_KEY="eeb9140b1a18675f963cf17ab2081baf";     //openweathermap 사이트 APIKEY
//     //const API_KEY="YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D"; // 누군가꺼



//     ////////////////////////////////////////////// 4

//     // 일정 수동 데이타
//     // const [data2,setData2]=useState([
//     //     {
//     //         subject: "냥이로 떠나는 여행",
//     //         D_day: 1,
//     //         day: "2022-06-30" 
//     //     },{
//     //         subject: "멍이로 떠나는 여행",
//     //         D_day: 20,
//     //         day: "2022-07-19" 
//     //     },{
//     //         subject: "그냥 떠나는 여행",
//     //         D_day: 120,
//     //         day: "2022-10-29" 
//     //     }
//     // ])



//     ////////////////////////////////////////////// 5
//     // // scroll paging 무한 스크롤 실패작
//     // const [page, setPage] = useState(1);
//     // const [loading,setLoading] = useState(false);
//     // const [ref, inView] = useInView();

//     // const aaaa = useCallback(async () => {
//     //     setLoading(true)
//     //     await axios.get(`${areaUrl}&page=${page}`).then((res) => {
//     //         setCategoryPlace1(prevState => [...prevState, ...res.data.response.body.items.item])
//     //     })
//     //     setLoading(false)
//     // },[page])
//     // useEffect(() => {
//     //     aaaa()
//     // },[aaaa])
//     // useEffect(()=>{
//     //     if (inView && !loading) {
//     //         setPage(prevState => prevState + 1)
//     //     }
//     // },[inView, loading])

//     ////////////////////////////////////////////// 6
//     // {/* <div style={{display:'flex'}} className='row'>
//     //         <div className='col-sm-11 qqq'>
//     //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>건축물 갯수</b>
//     //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>공원/정원/광장 갯수</b>
//     //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>관공서/학교 갯수</b>
//     //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>교통 갯수</b>
//     //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>기념관/기념비 갯수</b>
//     //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>데이투어/액티비티 갯수</b>
//     //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>랜드마크 갯수</b>
//     //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>바 갯수</b>
//     //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>박물관/미술관 갯수</b>                    
//     //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>스포츠 갯수</b>                    
//     //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>역사/종교 갯수</b>                    
//     //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>오락/이벤트 갯수</b>                    
//     //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>유명거리/이색장소 갯수</b>                    
//     //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>자연 갯수</b>                    
//     //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>전경/전망대 갯수</b>                    
//     //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>전시/공연/관람 갯수</b>                    
//     //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>클럽 갯수</b>                    
//     //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>테마파크/동물원 갯수</b>                    
//     //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>트레킹/하이킹 갯수</b>                    
//     //             <input type="checkbox" className='more-input'></input><b className='more-input-b'>펍/선술집 갯수</b>                    


//     //         </div>    
//     //         <div>다운드롭? 카테고리 더보기</div> */}

//     // {/* <div style={{display:'flex'}} className='row'>
//     //                                     <div className='col-sm-31 qqq'>
//     //                                         <input type="checkbox" className='more-input'></input><b className='more-input-b'>1111</b>
//     //                                         <input type="checkbox" className='more-input'></input><b className='more-input-b'>2222</b>
//     //                                         <input type="checkbox" className='more-input'></input><b className='more-input-b'>3333</b>
//     //                                         <input type="checkbox" className='more-input'></input><b className='more-input-b'>4444</b>
//     //                                         <input type="checkbox" className='more-input'></input><b className='more-input-b'>5555</b>
//     //                                         <input type="checkbox" className='more-input'></input><b className='more-input-b'>6666</b>
//     //                                         <input type="checkbox" className='more-input'></input><b className='more-input-b'>7777</b>
//     //                                     </div>    
//     //                                     <div>다운드롭? 카테고리 더보기</div> */}


    
//     ////////////////////////////////////////////// 7

//     // // axios multiple request   
//     // useEffect(()=>{
//     //     // change_city_info();
//     //     axios
//     //         .all([axios.get(trip_url), axios.get(weather_url) , axios.get(areaUrl)])
//     //         .then(
//     //             axios.spread((res1, res2, res3) => {
//     //                 setCityPlan(res1.data);
//     //                 setCityPlan2(res1.data[0]);
//     //                 setStart_date([res1.data[0].start_date]);  // 잘 들어가짐
//     //                 setEnd_date([res1.data[0].end_date]);  // 잘 들어가짐
//     //                 setDays([res1.data[0].days]);  // 잘 들어가짐

                    
//     //                 setW_data(res2.data.response.body.items.item);
//     //                 setWeatherImg(res2.data.response.body.items.item);


//     //                 console.log("first_areaUrl : "+areaUrl);
//     //                 setPlaces(res3.data.response.body.items.item);
//     //                 setPlaces2(res3.data.response.body.items.item);
//     //                 setCategoryPlace1(res3.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '12' || place.contenttypeid == '14' ))
//     //                 setCategoryPlace2(res3.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '39'))
//     //                 setCategoryPlace3(res3.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '38'))
//     //                 setCategoryPlace4(res3.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '15'))
//     //                 setCategoryPlace5(res3.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '25'))
//     //                 setCategoryPlace6(res3.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '28'))
//     //                 setCategoryPlace7(res3.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '32'))
//     //             })
//     //         )
//     //         .catch((err) => console.log(err));
//     // },[num,areaUrl,weather_url])


//     ////////////////////////////////////////////// 8
//     // 같이 넣으니까 모든 셀렉트의 옵션이 같아짐
//     // useEffect(()=>{
//     //     axios
//     //         .all([axios.get(area_url), axios.get(areaUrl)])
//     //         .then(
//     //             axios.spread((respon1,respon2) => {
//     //                 setPlaces2(respon1.data.response.body.items.item);
//     //                 setCategoryPlace1(respon2.data.response.body.items.item);
//     //                 // console.log("change_city_info : places2 : "+respon1.data.response.body.items.item)
//     //                 // console.log("Third_area_url : "+area_url);
//     //             })
//     //         )
//     //         .catch((err) => console.log(err));
//     //     // console.log("newValue : "+newValue);
//     //     // console.log("second_area_url : "+area_url);
//     //     // axios.get(area_url)
//     //     // .then(res=>{
//     // },[newValue])


//     ////////////////////////////////////////////// 8
//     /* <div>   무한 스크롤 실패작
//                                         <div>
//                                             {
//                                                 categoryPlace1 && categoryPlace1.map((item,index) => (
//                                                     <React.Fragment key={index}>
//                                                         (categoryPlace1.length - 1 == index) ? (
//                                                             <div key={index} ref={ref}>
//                                                                 {item}
//                                                             </div>
//                                                             ) : (
//                                                                 <div key={index}>
//                                                                 {item}
//                                                             </div>
//                                                         )
//                                                     </React.Fragment>
//                                                 ))
//                                             }
//                                         </div>
//                                     </div> */



//     ////////////////////////////////////////////// 9

//     // // axios multiple request    
//     // useEffect(()=>{
        
//     //         console.log("trip_url :: " + trip_url);
//     //         console.log("weather_url :: " + weather_url);
//     //         console.log("areaUrl :: " + areaUrl);
//     //         console.log("area_content_type_12_url :: " + area_content_type_12_url);
//     //         console.log("area_content_type_39_url :: " + area_content_type_39_url);
//     //         console.log("area_content_type_38_url :: " + area_content_type_38_url);
//     //         console.log("area_content_type_14_url :: " + area_content_type_14_url);
//     //         console.log("area_content_type_28_url :: " + area_content_type_28_url);
//     //         console.log("area_content_type_15_url :: " + area_content_type_15_url);
//     //     axios
//     //         .all([axios.get(weather_url)])
//     //         .then(
//     //             axios.spread((res2) => {
//     //                 // setCityPlan(res1.data);
//     //                 // setCityPlan2(res1.data[0]);
//     //                 // setStart_date([res1.data[0].start_date]);  // 잘 들어가짐
//     //                 // setEnd_date([res1.data[0].end_date]);  // 잘 들어가짐
//     //                 // setDays([res1.data[0].days]);  // 잘 들어가짐


                    
//     //                 // setW_data(res2.data.response.body.items.item);
//     //                 // setWeatherImg(res2.data.response.body.items.item);
//     //                 // console.log("w_data : " + w_data);
//     //                 // console.log("weatherImg : " + weatherImg);


//     //                 // console.log("multiple_areaUrl : "+areaUrl);
//     //                 // setPlaces(res3.data.response.body.items.item);
//     //                 // setPlaces2(res3.data.response.body.items.item);
//     //                 // console.log("multiple_areaUrl_data : "+res3.data.response.body.items.item);
//     //                 // // setCategoryPlace1(res3.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '12' || place.contenttypeid == '14' ))
//     //                 // // setCategoryPlace2(res3.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '39'))
//     //                 // // setCategoryPlace3(res3.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '38'))
//     //                 // // setCategoryPlace4(res3.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '15'))
//     //                 // // setCategoryPlace5(res3.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '25'))
//     //                 // // setCategoryPlace6(res3.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '28'))
//     //                 // // setCategoryPlace7(res3.data.response.body.items.item.filter((place, idx) => place.contenttypeid == '32'))


//     //                 // setCategoryPlace1(res4.data.response.body.items.item);
//     //                 // setCategoryPlace2(res5.data.response.body.items.item);
//     //                 // setCategoryPlace3(res6.data.response.body.items.item);
//     //                 // setCategoryPlace4(res7.data.response.body.items.item);
//     //                 // setCategoryPlace5(res8.data.response.body.items.item);
//     //                 // setCategoryPlace6(res9.data.response.body.items.item);
//     //                 // // console.log(res4.data.response.body.items.item);
//     //                 // // console.log(res5.data.response.body.items.item);
//     //                 // // console.log(res6.data.response.body.items.item);
//     //                 // // console.log(res7.data.response.body.items.item);
//     //                 // // console.log(res8.data.response.body.items.item);
//     //                 // // console.log(res9.data.response.body.items.item);
//     //             })
//     //         )
//     //         .catch((err) => console.log(err));
//     // },[num,areaUrl,weather_url])  



//     ////////////////////////////////////////////// 9
//     // 인기순 제목순 등등
//     // const [newValue,setNewValue]=useState('R');

//     /* <div className='more-select' >
//                                         <select onChange={(e)=>{setNewValue(e.target.value)}} defaultValue={value}>
//                                             <option value="R">생성일순</option>
//                                             <option value="D">최신순</option>
//                                             <option value="B">인기순</option>
//                                             <option value="A">이름순</option>
//                                         </select>
//                                     </div> */

//                                     // useEffect(()=>{
//     //     delete axios.defaults.headers.common['Authorization'];
//     //     axios.get(areaUrl)
//     //     .then(res=>{
//     //         setCategoryPlace0(res.data.response.body.items.item);
//     //     })
//     // },[newValue])



    

//         ////////////////////////////////////////////// 10

//     return (
//         <div>
//             {/* <h3>member_num : {member_num}</h3>
//             <h3>city_num : {city_num}</h3>
//             <h3>num : {num}</h3> */}
//             {/* {list && list.map((item,index) => (
                
//             ))} */}
//         </div>
//     );
// };

// export default CityInfoWeather;