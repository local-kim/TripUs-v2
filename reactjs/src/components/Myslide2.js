import React, {Component, useEffect, useState} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '../App.css';
import './Myslide2.css'
import axios from 'axios';
import { Link } from 'react-router-dom';


import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Select } from '@mui/material';

const Myslide=({row, select, category}) => {

    // const [select, setSelect] = useState(0);
    
    const [togleButton, setTogleButton] = useState([]); // 토글버튼 배열 만들어두고 



        let cityDataUrl = process.env.REACT_APP_SPRING_URL + "cityData/";
    
        const [citydata2,setCityData2] = useState([]); //spl 만든거 다 담는 배열 만들어두고 
        const [citydata3,setCityData3] = useState([]); 
        const [citydata4,setCityData4] = useState([]);
    
        const cityData=()=>{
            axios.get(cityDataUrl)
            .then(res=>{
                // setCityData(res.data);
                console.log(res.data.getData2);
                setTogleButton(res.data.getData2);
                setCityData2(res.data.getData2); //정보 담는거임 여기다 ㅇㅇ 
                setCityData3(res.data.getData3);
                setCityData4(res.data.getData4);
            })
            .catch(err => {
                alert(err);
            })
          }


        useEffect(()=>{
            cityData(); 
        },[]);

        useEffect(()=>{
            // setTogleButton(); 
            if(select == 0){
                setTogleButton(citydata2);
            }
            else if(select == 1){
                setTogleButton(citydata3);
            }
            else if(select == 2){
                setTogleButton(citydata4);
            }
        },[select]);

        
    // const [togleButton, setTogleButton] = useState([]); //담을 배열 

        // 카테고리 필터링
  useEffect(() => {
    if(category === 0){
        if(select== 0){
            setTogleButton(citydata2);
        }
        else if(select == 1){
            setTogleButton(citydata3);
        }
        else if(select == 2){
            setTogleButton(citydata4);
        }
      return;
        //전체 다나오게 
    }
    if(category == 1){ 
        if(select== 0){
            setTogleButton(citydata2.filter((city, index) => city.cat ===  1));
        }
        else if(select == 1){
            setTogleButton(citydata3.filter((city, index) => city.cat ===  1));
        }
        else if(select == 2){
            setTogleButton(citydata4.filter((city, index) => city.cat ===  1));
        }
    //   console.log(togleButton.filter((city, index) => city.cat ===  1));
      
    //     setTogleButton(togleButton.filter((city, index) => city.cat ===  1));
      //도시만 나오게
    }
    else if(category == 2){  
        if(select== 0){
            setTogleButton(citydata2.filter((city, index) => city.cat ===  2));
        }
        else if(select == 1){
            setTogleButton(citydata3.filter((city, index) => city.cat ===  2));
        }
        else if(select == 2){
            setTogleButton(citydata4.filter((city, index) => city.cat ===  2));
        }
    //   console.log(togleButton.filter((city, index) => city.cat ===  2));
    //     setTogleButton(togleButton.filter((city, index) => city.cat === 2));
      //바다만 나오게
    }
    else{
        if(select== 0){
            setTogleButton(citydata2.filter((city, index) => city.cat ===  3));
        }
        else if(select == 1){
            setTogleButton(citydata3.filter((city, index) => city.cat ===  3));
        }
        else if(select == 2){
            setTogleButton(citydata4.filter((city, index) => city.cat ===  3));
        }
        // console.log(togleButton.filter((city, index) => city.cat ===  3));
        // setTogleButton(togleButton.filter((city, index) => city.cat ===  3));
      //테마만 나오게
    }

  }, [category]);
            

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={4}
      navigation
      pagination={{ clickable: true }}
      
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')} >


    {togleButton && togleButton.map((row, index)=>(
       <SwiperSlide key={index}>
        <Link to={`/city/${row.num}`} style={{color:'black', overflow:'hidden', }}>
        <div className="card city-card-style hoverable z-depth-2" id='card2' style={{margin:'0'}}>
            <div className="card-image imgbox">
                <img src={`../city_image/${row.image}`} alt="city" loading="lazy"/>
            </div>
                <div className="city-card-contents-div">
                    <li className="city-card-contents-title">
                        <div className="citynamefont" style={{textAlign:'center'}}>
                            <b> {row.eng_name}</b><br/>
                            <h6 className="city-card-contents-subtitle"> {row.country} {row.name}</h6>
                        </div>
                    </li>
                </div>
            </div>           
        </Link>
        </SwiperSlide>
       ))}
    </Swiper>
  );
};

export default Myslide;



