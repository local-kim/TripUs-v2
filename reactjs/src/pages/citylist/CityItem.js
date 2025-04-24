import React from 'react';
import {Link} from 'react-router-dom';
import '../../styles/citylist.css';

const CityItem = ({city}) => {
  return (
    <div className='city-item'>
      <Link to={`/city/${city.id}`}>
        <div className='city-image'
             style={{backgroundImage: `url(../../city_image/${city.fileName})`}}>{city.engName.toUpperCase()}</div>
      </Link>
      <Link to={`/plan/calendar/${city.id}`}>
        <div className='city-name'>{city.country} {city.name}</div>
      </Link>
    </div>
  );
};

export default CityItem;