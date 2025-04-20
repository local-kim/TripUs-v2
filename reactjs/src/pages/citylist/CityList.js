import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CityItem from './CityItem';
import '../../styles/citylist.css';

const CityList = () => {
  const [list, setList] = useState([]);

  let cityListUrl = `${process.env.REACT_APP_SPRING_URL}city/list`;

  useEffect(() => {
    // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`;
    // axios.interceptors.request.use(
    //   config => {
    //       const jwtToken = localStorage.getItem('jwtToken');
    //       if (jwtToken) {
    //           config.headers['Authorization'] = 'Bearer ' + jwtToken;
    //       }
    //       // config.headers['Content-Type'] = 'application/json';
    //       return config;
    //   },
    //   error => {
    //       Promise.reject(error)
    //   }
    // );

    axios.get(cityListUrl
      // ,{headers: {
      //   Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
      // }}
    )
    .then(res => {
      setList(res.data);
      console.log(res.data);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div id='city-list'>
      <div className='title'>어디로 여행을 떠나시나요?</div>

      <div className='city-item-wrap'>
        {
          list && list.map((city, index) => (
            <CityItem city={city} key={index}/>
          ))
        }
      </div>
      
    </div>
  );
};

export default CityList;