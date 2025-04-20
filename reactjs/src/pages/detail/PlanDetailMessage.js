import React, { useState, useRef, useEffect, state } from 'react';
import '../../styles/plandetail.css';
import '../../styles/planmessage.css';
// import ScrollButton from 'react-scroll-button';
import { useNavigate,useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { daysToWeeks, format } from 'date-fns';
import { da } from 'date-fns/locale';
import { differenceInDays } from 'date-fns';
import { addDays } from 'date-fns';
import { useDispatch } from 'react-redux';
import { setPlanInfo } from '../../modules/planner';
import Rating from '@mui/material/Rating';



const PlanDetailMessage = () => {
    
  useEffect(() => {
    window.scrollTo(0,400)
  },[])
  
    
    return (
        <div className='wrap-list'>
            <div className='content-left'>
                <div className='content-left-box'>
                    <div className='ms-top-title'>
                        댓글
                    </div>
                    <div className='ms-list'>
                        <div className='ms-input'>
                            <div className='ms-input-area'>
                                <div className='input-image'>
                                    <img src='' alt='my' />
                                </div>
                                <div className='input-text'>
                                    <textarea name cols='30' rows='10' className='text-input' maxLength='300'>

                                    </textarea>
                                    <div className='text-count'>
                                        0/300
                                    </div>
                                </div>
                                <div className='input-btn'>
                                    등록
                                </div>
                            </div>
                            <div className='clear' />
                        </div>

                        {/* 댓글 샘플 반복 예정 */}
                        <div className='ms-content'>
                            <div className='ms-content-area'>
                                <div className='content-image'>
                                    <img src='' alt='user' />
                                    <div className='clear' />
                                </div>
                                <div className='content-box'>
                                    <div className='content-info'>
                                        <div className='content-user-name'>
                                            u-name1
                                        </div>
                                        <div className='content-date'>
                                            create_at
                                        </div>
                                        <div className='content-del-btn'>
                                            삭제
                                        </div>
                                    </div>
                                    <div className='clear' />
                                    <div className='content-value'>
                                        댓글 내용
                                    </div>
                                </div>
                                <div className='clear' />
                            </div>
                    </div>
                    

                        {/* 댓글 샘플 반복 예정 */}
                        <div className='ms-content'>
                            <div className='ms-content-area'>
                                <div className='content-image'>
                                    <img src='' alt='user' />
                                    <div className='clear' />
                                </div>
                                <div className='content-box'>
                                    <div className='content-info'>
                                        <div className='content-user-name'>
                                            u-name2
                                        </div>
                                        <div className='content-date'>
                                            create_at
                                        </div>
                                        <div className='content-del-btn'>
                                            삭제
                                        </div>
                                    </div>
                                    <div className='clear' />
                                    <div className='content-value'>
                                        댓글 내용
                                    </div>
                                </div>
                                <div className='clear' />
                            </div>
                    </div>

                    </div>
                </div>
            </div>
            <div className='list-right'>
                
            </div>
        </div>
    );
};

export default PlanDetailMessage;