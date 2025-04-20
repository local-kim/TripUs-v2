// import axios from "axios";

// // Actions
// const SAVE_WEATHER = 'cityinfo/SAVE_WEATHER';


// // Action Creators
// // 날씨 해당기간 데이터 받는 변수
// // export const getWeather_data = (cityData) => ({
    
// //     type : SAVE_WEATHER,
// //     cityData : cityData
// // })


// // 내가 사용할 변수 초기 상태
// // 날씨
// const weather_initialState = {
//     num : 159,
//     member_num : null,
//     city_num : null,
//     weaData : [qweqwe.wData]
// }


// // export const getdata = () => ({
    
// // })

// export function qweqwe(props){
//     const zzz = props;
//     const num = weather_initialState.num;
//     const wData = axios.get(`https://apis.data.go.kr/1360000/AsosDalyInfoService/getWthrDataList?serviceKey=hG2QkKkmuiN38w%2BeGu53VbRK%2BBNzKRpnjbLE%2BHDXZ0dHzgbBQ67K67NsuR5xOAs%2BErSqbSpOpk1UKBnj4dvlnA%3D%3D&numOfRows=3&dataType=JSON&dataCd=ASOS&dateCd=DAY&startDt=20210101&endDt=20210103&stnIds=${num}`)
//     .then(res=>res.data.response.body.items.item)
//     return {
//         type : SAVE_WEATHER,
//         payload : wData
//     }
// }

// // Reducer
// // 날씨
// export default function W_reducer(state = weather_initialState, action){
//     return state  
// }
