import React, { useState } from 'react';
import { UpdateDayPlan, UpdatePlan } from '.';
import { usePrompt } from '../../utils/Blocker';

const UpdatePlanMain = () => {
  const [isBlocking, setIsBlocking] = useState(true);

  // prompt
  usePrompt(`현재 페이지에서 나가면 일정이 저장되지 않습니다.\n정말 나가시겠습니까?`, isBlocking);

  const [view, setView] = useState(1);
  const [day, setDay] = useState(1);
  const [focus, setFocus] = useState(0);

  return (
    <div>
      {view == 1 ? <UpdatePlan view={view} setView={setView} day={day} setDay={setDay} setIsBlocking={setIsBlocking} focus={focus} setFocus={setFocus} /> : <UpdateDayPlan view={view} setView={setView} day={day} setDay={setDay} focus={focus} setFocus={setFocus} />}
    </div>
  );
};

export default UpdatePlanMain;