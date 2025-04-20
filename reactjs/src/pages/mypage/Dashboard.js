import React, {Component, useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './Dashboard.css';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { nextDay } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const[trip,setTrip] = useState('');
    const loginNum = useSelector(state => state.auth.user.num);
    const navi = useNavigate();

    let calendarUrl=process.env.REACT_APP_SPRING_URL + "calendar/?loginNum="+loginNum;
    let dDay; 

    const calendar=()=>{
        axios.get(calendarUrl)
        .then(res=>{
            setTrip(res.data);
            console.log(res.data);
            
        })
        .catch(err => {
            alert(err);
        })
      }


      const calculateDday = (date) => {
            
        const nowTime = moment();
        const lastTime = moment(date);


        dDay = Math.floor((lastTime - nowTime)/86400000)+1;


        return dDay;
        

    }

      useEffect(()=>{
        calendar();
    },[]);
            

    return (
        <div>


            <div className="App">

                    
                    <FullCalendar  defaultView="dayGridMonth" plugins={[ dayGridPlugin ]}

                
                            
                                    
                                    events=
                                        {trip && trip.map((row, index)=>(
                                           
                                            {          

                                     
                                                title : row.name, 
                                                color :calculateDday(row.startDate) < 0 && calculateDday(row.endDate) > 0 ? "#ffd467" : calculateDday(row.startDate) < 0 ? "gray" : "#98ddE3", //기본이 그냥 파랑임
                                                start: row.startDate,
                                                end: new Date(row.endDate).getTime(),
                                                url: `/plan/detail/${row.num}`
                                                
                                                                                      
                                            }
    
                                        ))}
                                        
                                    
                        

                
                />
             
            </div>
            
      </div>
    );
};

export default Dashboard;