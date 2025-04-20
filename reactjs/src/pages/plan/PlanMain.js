import React, { useState } from 'react';
import { Calendar, Plan, DayPlan } from '.';
import { usePrompt } from '../../utils/Blocker';

const PlannerMain = () => {
  const [isBlocking, setIsBlocking] = useState(true);

  // prompt
  usePrompt(`현재 페이지에서 나가면 일정이 저장되지 않습니다.\n정말 나가시겠습니까?`, isBlocking);

  const [view, setView] = useState(0);
  const [day, setDay] = useState(1);
  const [focus, setFocus] = useState(0);

  return (
    <div>
      {view == 0 ? <Calendar view={view} setView={setView} /> : view == 1 ? <Plan view={view} setView={setView} day={day} setDay={setDay} setIsBlocking={setIsBlocking} focus={focus} setFocus={setFocus} /> : <DayPlan view={view} setView={setView} day={day} setDay={setDay} focus={focus} setFocus={setFocus} />}
    </div>
  );
};

export default PlannerMain;