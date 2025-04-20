
import { useState,useEffect } from 'react';
import 'swiper/css';
import '../App.css';
import axios from 'axios';
import './Myslide.css'
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import rankLogo from '../assets/images/rank.png';

const Heemin1 = styled.div`




.trip-name {
    
  font-size: ${props=>(props.idx==1?'20px':props.idx==0?'15px':'15px')};
  font-weight : ${props=>(props.idx==1?'500':'')};

}

.plan-item

{
  
  margin-Top: ${props=>(props.idx==1?'10px':props.idx==0?'40px':'40px')};
 
  height: ${props=>(props.idx==1?'430px':props.idx==0?'370px':'370px')};
  width: ${props=>(props.idx==1?'350px':props.idx==0?'300px':'300px')};
  
  

}

  .city-img
 {

         height: ${props=>(props.idx==1?'260px':props.idx==0?'220px':'220px')};
        //  marginTop: ${props=>(props.idx==1?'5px':props.idx==0?'30px':'30px')};
  }

  .rankCircle{
  margin-Left: ${props=>(props.idx==1?'115px':props.idx==0?'90px':'90px')};
   font-size: ${props=>(props.idx==1?'20px':props.idx==0?'14px':'14px')};
   font-weight:  ${props=>(props.idx==1?'bold':props.idx==0?'normal':'normal')};
   margin-bottom: ${props=>(props.idx==1?'90px':'0px')};
   margin-Top: ${props=>(props.idx==1?'15px':'0px')};
   
  }


  .date{
    font-size: ${props=>(props.idx==1?'15px':props.idx==0?'13px':'13px')};
  }


  .member-name{
  
    font-size: ${props=>(props.idx==1?'15px':props.idx==0?'13px':'13px')};
  }
`


  




const Myslide = () => {
  let planUrl = `${process.env.REACT_APP_SPRING_URL}plan/rank3`;

  const [tripList, setTripList] = useState([]);
  const [rank, setRank] = useState(['2등','1등','3등']);

  useEffect(() => {
    axios.get(planUrl)
    .then(res => {
      console.log(res.data);
      setTripList([res.data[1], res.data[0], res.data[2]]);

    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div id='plan-list2'>
        <div className='trip-wrap'>
          {
            tripList && tripList.map((trip, idx) => (
              <Link to={`/plan/detail/${trip.tripNum}`}>
                <Heemin1 idx={idx}>
      
                {/* <img src={rankLogo} alt='' style={{width:'60px'}}/> */}
                <div className='plan-item'>

                  <div className='city-img' style={{backgroundImage:`url(../../city_image/${trip.image})`}}>
                  </div>
                  <div className='info-wrap'>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                      <div className='trip-name'>{trip.tripName}</div>
                      
                      <div className='likes'>
                        <i className="fa-solid fa-heart"></i>
                        &nbsp;{trip.count}
                      </div>
                    </div>
                    <div className='date'>{trip.start_date} ~ {trip.end_date} ({trip.days}일)</div>
                    <div className='member-name'>{trip.memberName}님</div>

                    <div className='rankCircle' style={{
                                
                                display: "flex",
                                justifyContent: "center",
                                alignItems:"center",
                                width:"70px",
                                height:"70px",
                                borderRadius:"50%",
                                backgroundColor: "#f6f6f6",
                                color: "black",
                                fontWeight: "700",
                              
                              }}
  
                                 
                                >
  
                          {rank[idx]}
                                   
                      
                             
                        </div>
                  
                  </div>
                </div>

                </Heemin1>

              </Link>
            ))
          }
        </div>
    </div>
  );
};

export default Myslide;