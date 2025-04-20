import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/findPassword.css';
import { useNavigate } from 'react-router-dom';

const FindPassword = () => {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [email, setEmail] = useState('');

  let findUrl = `${process.env.REACT_APP_SPRING_URL}auth/findPw`;

  const submit = () => {
    console.log(id, email);

    axios.post(findUrl, {id, email})
    .then(res => {
      // console.log(res.data);
      navigate(`/change`, {
        state: {
          id: id
        }
      });
    })
    .catch(err => {
      console.log(err);
      alert(err.response.data);
    });
  }

  return (
    <div id='find-pw'>
      <div class="title">비밀번호 찾기</div>

      <div>
          <label class="label-text" for="findUserPwdEmail">아이디</label>
          <div class="uk-form-controls">
            <input class="uk-input" type="text" id="findUserPwdEmail" placeholder="" onChange={(e) => setId(e.target.value)}/>
          </div>
      </div>

      <div>
          <label class="label-text" for="findUserPwdEmail">이메일</label>
          <div class="uk-form-controls">
            <input class="uk-input" type="email" id="findUserPwdEmail" placeholder=""  onChange={(e) => setEmail(e.target.value)}/>
          </div>
      </div>

      <div class="small-text">회원가입시 등록하셨던 아이디와 이메일 주소를 입력해주세요.</div>

      <button class="btn btn-ok" type="submit" onClick={submit}>비밀번호 찾기</button>

      {/* <div class="small-text">* 메일이 도착하기까지 몇 분 정도 소요될 수 있습니다.</div>
      <div class="small-text">* 스팸 메일함으로 발송될 수 있으니 체크바랍니다.</div> */}

      <button class="btn btn-back" onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  );
};

export default FindPassword;