import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import '../../styles/join.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const SecurityJoin = (props) => {
  const navi=useNavigate();
  const [data,setData]=useState({
    id:'',
    name:'',
    password:'',
    email:'',
    address1:'',
    address2:'',
    tel:'',
    birthday:'',
    zonecode:''
  });
  
  const [birth,setBirth]=useState({
    year:'',
    month:'',
    day:''
  });

  const [passOk,setPassOk]=useState(false);
  const [btnOk,setBtnOk]=useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  //submit 호출될 함수
  const onSave=(e)=>{
    e.preventDefault(); //기본이벤트(submit이 action으로 넘어가는것)를 무효화


    if(!btnOk){
      alert("아이디 중복체크를 해주세요");
      return;
    }
    if(!passOk){
      alert("비밀번호 확인");
      return;
    }

    const url = process.env.REACT_APP_SPRING_URL + "member/insert";
    axios.post(url, ({
      ...data,
      birthday:birth.year+birth.month+birth.day
    }))
    .then(res => {
      // alert("insert 성공");
      console.log(data);
      navi("/login")
    });
  }

  //data 관련 데이터 입력시 호출
  const onDataChange=(e)=>{
    const {name,value}=e.target;
    //이벤트 발생 name이 pass일 경우 무조건 passok는 false
    if(name==='pass')
      setPassOk(false);
    setData({
      ...data,
      [name]:value
    });
  }
  const onBirthChange=(e)=>{
    const {name,value}=e.target;
    setBirth({
      ...birth,
      [name]:value
    });
  }

  //두번째 pass 입력시 호출
  const onPassChange=(e)=>{
    const {value}=e.target;
    if(value===data.password)
      setPassOk(true);
    else
      setPassOk(false);
  }

  //아이디 중복 체크 버튼 이벤트
  const onIdCheck=()=>{
    const url=process.env.REACT_APP_SPRING_URL+"member/idcheck?id="+data.id;
    axios.get(url)
    .then(res=>{
      if(res.data===0){
        setBtnOk(true);
        alert("가입가능아이디");
      }else{
        setBtnOk(false);
        alert("이미있는 아이디");
      }
    });
  }

  //이메일 중복 체크 버튼 이벤트
  const onEmailCheck=()=>{
    const url=process.env.REACT_APP_SPRING_URL+"member/emailcheck?email="+data.email;
    axios.get(url)
    .then(res=>{
      if(res.data===0){
        setBtnOk(true);
        alert("가입가능 이메일주소")
      }else{
        setBtnOk(false);
        alert("이미있는 이미있는 이메일주소")
      }
    });
  }

  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  const handlePostCode = (kakaoData) => {
    let fullAddress = kakaoData.address;
    let extraAddress = ''; 
    
    if (kakaoData.addressType === 'R') {
      if (kakaoData.bname !== '') {
        extraAddress += kakaoData.bname;
      }
      if (kakaoData.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${kakaoData.buildingName}` : kakaoData.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    console.log(kakaoData)
    console.log(fullAddress)
    console.log(kakaoData.zonecode)
    setData({...data, address1: fullAddress, address2: extraAddress, zonecode: kakaoData.zonecode});
    handleClose();
  }
    
  return (
    <div className='member_join'>
      <div className='member_join'>
        <form className="form-inline" onSubmit={onSave}>
          <caption><h3 className='tit'>회원가입</h3></caption> 
          <p className="page_sub"><span class="ico">*</span>필수입력사항</p>
          <table className="tbl_comm">
            <tbody>
              <tr>
                <th>아이디<span class="ico">*</span></th>
                <td>
                  <input type="text" name="id" value={data.id} maxLength="16" required label="아이디"
                  className="form-control"
                  
                  onChange={onDataChange}
                  placeholder="6자 이상의 영문 혹은 영문과 숫자를 조합"/>
                  <button type='button' className='btn' onClick={onIdCheck} >중복확인</button>
                </td>
              </tr>
              <tr>
                <th>비밀번호<span class="ico">*</span></th>
                <td>
                  <input type="password" name="password"  className="form-control" autoComplete="off" required
                  onChange={onDataChange} label="비밀번호" maxLength="16" placeholder="비밀번호를 입력해주세요"/>
                </td>
              </tr>
              <tr>
                <th>비밀번호확인<span class="ico">*</span></th>
                <td>
                  <input type="password" className="form-control" name="password" required
                  onChange={onPassChange} autoComplete="off"
                  label="비밀번호확인" maxLength="16" placeholder="비밀번호를 한번 더 입력해주세요"/>
                  <span style={{marginLeft:'5px',color:passOk?'':'green'}}>{passOk?'사용가능':'동일한 비밀번호를 입력해주세요'}</span>
                </td>
              </tr>
              <tr>
                <th>이름<span class="ico">*</span></th>
                <td>
                  <input type="text" name="name" className="form-control" value={data.name}
                  label="이름" onChange={onDataChange} placeholder="이름을 입력해주세요" required />
                </td>
              </tr>
              <tr>
                <th>이메일<span class="ico">*</span></th>
                <td>
                  <input type="text" name="email" value={data.email} size="30" onChange={onDataChange}
                  label="이메일" placeholder="예: bitrip@bitrip.com" className="form-control" required/>
                  <button type='button' className='btn'
                    onClick={onEmailCheck}>중복확인</button>
                </td>
              </tr>
              <tr>
                <th>연락처<span class="ico">*</span></th>
                  <td>
                  <input type="text" value={data.tel} pattern="[0-9]*" name="tel" className="form-control" placeholder="숫자만 입력해주세요"
                  onChange={onDataChange}
                  />
                  <button id="" className='btn' type="button">인증번호 받기</button>
                </td>
              </tr>
              <tr>
                <th>주소<span class="ico">*</span></th>
                <td>
                  <input type='text' className="form-control"
                    name="address" value={data.address1}
                  required/>
                  <input type='text' className="form-control"
                    name="address" value={data.address2}
                  required/>
                  <input type='text' className="form-control"
                    name="address" value={data.zonecode}
                  required/>
                
                  <div className="App">
                    <Button onClick={handleOpen} style={{paddingLeft:'30px'}}>
                      <button type='button' className='btn' style={{width:'250px'}}>주소찾기</button>
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                          <DaumPostcode onComplete={handlePostCode} />
                          <button type='button' onClick={handleClose} className='btn'>닫기</button>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          TRIP:US
                        </Typography>
                      </Box>
                    </Modal>
                  </div>
                </td>
              </tr>
              <tr>
                <th>생년월일</th>
                <div className='birth_day'>
                  <td style={{textAlign:'center', margin:'0,auto'}}>
                    <div style={{textAlign:'center'}}>
                      <input type="text" value={birth.year} onChange={onBirthChange} name="year" id="birth_year" pattern="[0-9]*" label="생년월일" size="4" maxLength="4" placeholder="YYYY"/>
                      <span class="bar"></span>
                      <input type="text" value={birth.month} onChange={onBirthChange} name="month" id="birth_month" pattern="[0-9]*" label="생년월일" size="2" maxLength="2" placeholder="MM"/>
                      <span class="bar"></span>
                      <input type="text" value={birth.day} onChange={onBirthChange} name="day" id="birth_day" pattern="[0-9]*" label="생년월일" size="2" maxLength="2" placeholder="DD"/>
                    </div>
                  </td>
                </div>
              </tr>
              <tr>
                <td colSpan={2} style={{textAlign:'center'}}>
                  <button type="submit" className="btn_type1 btn_member">
                    <span className="txt_type">가입하기</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default SecurityJoin;