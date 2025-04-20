import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/plan_list.css';
import { Link, useNavigate } from 'react-router-dom';
import { getMonth } from 'date-fns'
import { SeasonButton, CitySelect } from '.';

const PlanList = () => {
  const navigate = useNavigate();

  const [season, setSeason] = useState(() => []);

  const handleSeason = (event, newSeason) => {
    setSeason(newSeason);
  };

  useEffect(() => {
    if(!season){ // 전체
      setFilteredList(tripList);
      return;
    }
    
    switch(season){
      case 'spring':
        setFilteredList([
          ...tripList.filter((trip, idx) => getMonth(new Date(trip.start_date)) == 2 || getMonth(new Date(trip.start_date)) == 3 || getMonth(new Date(trip.start_date)) == 4)
        ]);
        break;
      case 'summer':
        setFilteredList([
          ...tripList.filter((trip, idx) => getMonth(new Date(trip.start_date)) == 5 || getMonth(new Date(trip.start_date)) == 6 || getMonth(new Date(trip.start_date)) == 7)
        ]);
        break;
      case 'autumn':
        setFilteredList([
          ...tripList.filter((trip, idx) => getMonth(new Date(trip.start_date)) == 8 || getMonth(new Date(trip.start_date)) == 9 || getMonth(new Date(trip.start_date)) == 10)
        ]);
        break;
      case 'winter':
        setFilteredList([
          ...tripList.filter((trip, idx) => getMonth(new Date(trip.start_date)) == 11 || getMonth(new Date(trip.start_date)) == 0 || getMonth(new Date(trip.start_date)) == 1)
        ]);
        break;
      default:
    }
  }, [season]);

  const [city, setCity] = React.useState('');

  const handleCity = (event) => {
    setCity(event.target.value);
  };

  useEffect(() => {
    setFilteredList([
      ...tripList.filter((trip, idx) => trip.cityNum == city)
    ]);
    setSeason('');
  }, [city]);

  let planUrl = `${process.env.REACT_APP_SPRING_URL}plan/rank`;

  const [tripList, setTripList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    axios.get(planUrl)
    .then(res => {
      // console.log(res.data);
      setTripList(res.data);
      setFilteredList(res.data);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div id='plan-list'>
      <div className='title'>인기 여행 일정</div>
      <div className='sub-title'>다른 여행자들의 일정을 참고해 나만의 여행을 계획해보세요!</div>

      <SeasonButton season={season} setSeason={setSeason} handleSeason={handleSeason}/>
      {/* <CitySelect city={city} setCity={setCity} handleCity={handleCity}/> */}
      
        <div className='trip-wrap'>
          {
            filteredList && filteredList.map((trip, idx) => (
              // <Link to={`/plan/detail/${trip.tripNum}`}>
                <div className='plan-item' key={idx}>
                  <div className='city-img' style={{backgroundImage:`url(../../city_image/${trip.image})`}} onClick={() => navigate(`/plan/detail/${trip.tripNum}`)}></div>
                  <div className='info-wrap'>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                      <div className='trip-name' onClick={() => navigate(`/plan/detail/${trip.tripNum}`)}>{trip.tripName}</div>
                      
                      <div className='likes'>
                        <i className="fa-solid fa-heart"></i>
                        &nbsp;{trip.count}
                      </div>
                    </div>
                    <div className='date'>{trip.start_date} ~ {trip.end_date} ({trip.days}일)</div>
                    {/* <div>{getMonth(new Date(trip.start_date))}</div> */}
                    <div className='member-name' onClick={() => navigate(`/user/${trip.memberNum}`)}>by {trip.memberName}</div>
                  </div>
                </div>
              // </Link>
            ))
          }
        </div>
    </div>
  );
};

export default PlanList;