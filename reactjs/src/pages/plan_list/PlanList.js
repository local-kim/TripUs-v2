import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../../styles/plan_list.css';
import {useNavigate} from 'react-router-dom';
import {getMonth} from 'date-fns'
import {SeasonButton} from '.';

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
          ...tripList.filter(
              (item, idx) => getMonth(new Date(item.trip.startDate)) == 2
                  || getMonth(new Date(item.trip.startDate)) == 3 || getMonth(
                      new Date(item.trip.startDate)) == 4)
        ]);
        break;
      case 'summer':
        setFilteredList([
          ...tripList.filter(
              (item, idx) => getMonth(new Date(item.trip.startDate)) == 5
                  || getMonth(new Date(item.trip.startDate)) == 6 || getMonth(
                      new Date(item.trip.startDate)) == 7)
        ]);
        break;
      case 'autumn':
        setFilteredList([
          ...tripList.filter(
              (item, idx) => getMonth(new Date(item.trip.startDate)) == 8
                  || getMonth(new Date(item.trip.startDate)) == 9 || getMonth(
                      new Date(item.trip.startDate)) == 10)
        ]);
        break;
      case 'winter':
        setFilteredList([
          ...tripList.filter(
              (item, idx) => getMonth(new Date(item.trip.startDate)) == 11
                  || getMonth(new Date(item.trip.startDate)) == 0 || getMonth(
                      new Date(item.trip.startDate)) == 1)
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

  let planUrl = `${process.env.REACT_APP_SPRING_URL}trip`;

  const [tripList, setTripList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    axios.get(planUrl)
    .then(res => {
      // console.log(res.data);
      setTripList(res.data.data.list);
      setFilteredList(res.data.data.list);
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
              filteredList && filteredList.map((item, idx) => (
                  // <Link to={`/plan/detail/${item.tripNum}`}>
                <div className='plan-item' key={idx}>
                  <div className='city-img'
                       style={{backgroundImage: `url(../../city_image/${item.city.image})`}}
                       onClick={() => navigate(
                           `/plan/detail/${item.tripNum}`)}></div>
                  <div className='info-wrap'>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                      <div className='trip-name' onClick={() => navigate(
                          `/plan/detail/${item.trip.id}`)}>{item.trip.title}</div>
                      
                      <div className='likes'>
                        <i className="fa-solid fa-heart"></i>
                        &nbsp;{item.trip.likes}
                      </div>
                    </div>
                    <div
                        className='date'>{item.trip.startDate} ~ {item.trip.endDate} ({item.trip.days}일)
                    </div>
                    {/* <div>{getMonth(new Date(item.start_date))}</div> */}
                    <div className='member-name' onClick={() => navigate(
                        `/user/${item.user.id}`)}>by {item.user.username}</div>
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