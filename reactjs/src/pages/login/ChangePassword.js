import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;

  const [password, setPassword] = useState('');

  let changeUrl = `${process.env.REACT_APP_SPRING_URL}auth/changePw`;

  const submit = () => {
    console.log(password);

    axios.post(changeUrl, {id, password})
    .then(res => {
      alert("비밀번호 변경이 완료되었습니다.");
      navigate(`/login`);
    })
    .catch(err => console.log(err));
  }

  return (
    <div id='change-pw'>
      <div class="title">비밀번호 변경</div>

      <div>
          <label class="label-text" for="findUserPwdEmail">새로운 비밀번호</label>
          <div class="uk-form-controls">
            <input class="uk-input" type="password" id="findUserPwdEmail" placeholder="" onChange={(e) => setPassword(e.target.value)}/>
          </div>
      </div>

      <div class="small-text">변경하실 비밀번호를 입력해주세요.</div>

      <button class="btn btn-ok" type="submit" onClick={submit}>비밀번호 변경하기</button>
    </div>
  );
};

export default ChangePassword;