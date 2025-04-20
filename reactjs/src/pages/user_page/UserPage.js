import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Avatar from "react-avatar";
import axios from "axios";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../../styles/user_page.css';
import TripList from './TripList';
import ReviewList from './ReviewList';
import PersonIcon from '@mui/icons-material/Person';

const UserPage = () => {
  const {memberNum} = useParams();
  const navi = useNavigate();

  const [user, setUser] = useState({});
  const [tripCount, setTripCount] = useState('');
  const [reviewCount, setReviewCount] = useState('');
  const [tripList, setTripList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [image, setImage] = useState('');

  let userInfoUrl = `${process.env.REACT_APP_SPRING_URL}user/info?memberNum=${memberNum}`;

  useEffect(() => {
    axios.get(userInfoUrl)
    .then(res => {
      console.log(res.data);
      setUser(res.data.user);
      setTripCount(res.data.tripCount);
      setReviewCount(res.data.reviewCount);
      setTripList(res.data.tripList);
      setReviewList(res.data.reviewList);
      
      if(res.data.user.profile){
        setImage(`${process.env.REACT_APP_SPRING_URL}save/${res.data.user.profile}`);
      }
    })
    .catch(err => console.log(err));
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id='user-page'>
      <div className='profile'>
        {
          image ? (
            <div className='photo' style={{backgroundImage: `url(${image})`}}></div>
          ) : (
            <div className='photo'>
              <span className="material-icons">
                person
              </span>
            </div>
          )
        }
        <div className="name">{user.name}</div>
      </div>

      <Tabs value={value} onChange={handleChange} centered>
        <Tab label={`일정 ${tripCount}`} />
        <Tab label={`리뷰 ${reviewCount}`} />
      </Tabs>

      { value === 0 ? <TripList tripList={tripList} /> : <ReviewList reviewList={reviewList} /> }
    </div>
  );
};

export default UserPage;