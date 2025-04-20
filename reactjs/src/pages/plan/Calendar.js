import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveTrip, savePlan } from '../../modules/planner';
import { DateRangePicker } from 'react-date-range';
import { differenceInDays, format } from 'date-fns';
import ko from 'date-fns/locale/ko';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../../styles/plan.css';
import { usePrompt } from '../../utils/Blocker';

const Calendar = ({view, setView}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 도시 페이지로부터 cityNum 넘겨받기
  const {cityNum} = useParams();
  const [cityInfo, setCityInfo] = useState({});

  let cityUrl = process.env.REACT_APP_SPRING_URL + `plan/city-code?cityNum=${cityNum}`;

  useEffect(() => {
    // axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`}
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`;
    axios.get(cityUrl)
    .then(res => {
      // console.log(res.data);
      setCityInfo({...res.data, cityName: res.data.name, cityNum: res.data.num});
    })
    .catch(err => console.log(err));
  }, []);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  return (
    <div id='plan-calendar'>
      <div className='calendar-wrap'>
        <div className='title'>여행 일정을 선택하세요</div>
        <DateRangePicker
          locale={ko}
          onChange={item => setState([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          direction="horizontal"
          dateDisplayFormat={'yyyy-MM-dd'}
          monthDisplayFormat={'yyyy년 M월'}
          rangeColors={['#98dde3', '#ffffff']}
          color={'#98dde3'}
          preventSnapRefocus={true}
        />

        <div>
          <button type='button' className='btn-ok btn btn-primary' onClick={() => {
            // 시작 날짜 : state[0].startDate
            // 끝 날짜 : state[0].endDate
            const start = state[0].startDate;
            const end = state[0].endDate;
            const days = differenceInDays(state[0].endDate, state[0].startDate) + 1;
            // console.log({start, end, days, cityNum, areaCode, sigunguCode});
            dispatch(saveTrip({...cityInfo, startDate: start, endDate: end, days}));
            dispatch(savePlan(Array.from(Array(days), () => new Array()))); // redux plan에 초기값 2차원 배열을 넣어줌

            // navigate("/plan");
            setView(1);
          }}>일정 만들기</button>
        </div>
      </div>
      
    </div>
  );
};

export default Calendar;