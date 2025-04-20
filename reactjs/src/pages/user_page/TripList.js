import React from 'react';
import { useNavigate } from 'react-router-dom';

const TripList = ({tripList}) => {
  const navi = useNavigate();

  return (
    <div className='trip-list'>
      {
        tripList.length === 0 ? (
          <div style={{textAlign:'center', color: 'gray', marginTop:'100px'}}>여행 일정이 없습니다.</div>
        ) : ""
      }
      {
        tripList && tripList.map((trip, index) => (
          <div className="trip" key={index}>
            <div className="trip-wrap-1">
              <div style={{overflow:'hidden'}}>
                <img className="trip-img" src={`../city_image/${trip.image}` } alt={trip.image} 
                 onClick={() => {
                  navi(`/plan/detail/${trip.tripNum}`);
                }}/>
              </div>
              <div className="trip-info-wrap">
                <div className="city-eng-name">{trip.eng_name}</div>
                <div className="city-name">
                  {trip.country} {trip.cityName}
                </div>
                <div className="info-container" style={{ marginTop: "20px", backgroundColor: "white" }}>
                  <div className='days'>
                    {trip.days} days
                  </div>
                </div>
              </div>

              <div className="trip-wrap-2">
                <div className="trip-name"
                 onClick={() => {
                  navi(`/plan/detail/${trip.tripNum}`);
                }}
                >
                  {/* <span class="material-symbols-outlined">label</span> */}
                  {/* <span class="material-icons">label</span> */}
                  {trip.tripName}

                  
                </div>

                <div className='trip-date'>{trip.startDate} ~ {trip.endDate}</div>
              </div>
            </div>
            
          </div>
        ))
      }
    </div>
  );
};

export default TripList;