import React, { useState,useRef, useEffect, useCallback } from 'react';
import { useNavigate ,useParams} from "react-router-dom";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import './profile.css';
import Avatar from 'react-avatar';
import { set } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { changePhoto } from '../../modules/auth';





const Profile = () => {
    
    const dispatch = useDispatch();
    const loginNum = useSelector(state => state.auth.user.num);
    const loginId = useSelector(state => state.auth.user.id);
    const {num,Currentpage}=useParams();
    const [dto,setDto] =useState('');
    //url
    let deleteUrl = process.env.REACT_APP_SPRING_URL + "mypage/delete?loginNum="+loginNum;
    let profileUrl = process.env.REACT_APP_SPRING_URL + "mypage/profile?loginNum="+loginNum;
    let photonameUrl =  process.env.REACT_APP_SPRING_URL + "mypage/photo?loginNum="+loginNum;
    const navi=useNavigate();
    const [data, setData] = useState({}); //데이터 한번에 받을때 쓰는법 
    const [photo,setPhoto] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    const [Image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const fileInput = useRef(null)

    
    
    let pagelistUrl = process.env.REACT_APP_SPRING_URL + "mypage/pagelist?loginNum="+loginNum; //?currentPage=" + currentPage;
    let photoUrl = process.env.REACT_APP_SPRING_URL + "save/";
    let uploadUrl=process.env.REACT_APP_SPRING_URL+"mypage/upload?loginNum="+loginNum;

    const getData=useCallback(()=>{
        axios.get(profileUrl)
        .then(res=>{
            setDto(res.data.member);
            setImage(photoUrl + res.data.photo);
            setPhoto(res.data.photo);
            console.log(res.data.member);
        })
        .catch(err => {
            alert(err);
        })

        // axios.get(photonameUrl).then(res=>{
        //     setImage(photoUrl + res.data);
        // })
 
    }, [profileUrl, photoUrl])

    useEffect(()=>{
        getData();
    },[getData]);




  

        const deleteUser=()=>{
            if (window.confirm("정말 삭제합니까?")) {
                axios.get(deleteUrl)
                .then(res=>{
                    
                    // setDto(res.data);
                    alert("삭제되었습니다.");
                
                    window.location.replace("/");
                    
                })
                .catch(err => {
                    console.log(err);
                })
            } else {
          
                alert("취소합니다.");
          
              }
            
        }

        
       
        
    
        //file change 시 호출 이벤트
        const uploadImage=(e)=>{
            const uploadFile=e.target.files[0];
            const imageFile=new FormData();
            //spring 에서 multipartfile로 받는 이름 
            imageFile.append("uploadFile",uploadFile);
    
            axios({
                method:'post',
                url:uploadUrl, //백앤드 url
                data:imageFile,
                headers:{'Content-Type':'multipart/form-data'}
            }).then(response=>{
                setPhoto(response.data); //백엔드에서 보내는 변경된 이미지명을 photo변수에 넣는다
                // console.log()
            }).catch(err=>{
                alert(err);
            })
    
        }

        const onChange = (e) => {
            if(e.target.files[0]){
                    setPhoto(e.target.files[0])

                    const uploadFile=e.target.files[0];
                    const imageFile=new FormData();
                    //spring 에서 multipartfile로 받는 이름 
                    imageFile.append("uploadFile",uploadFile); 
            
                    axios({
                        method:'post',
                        url:uploadUrl, //백앤드 url
                        data:imageFile,
                        headers:{'Content-Type':'multipart/form-data'}
                    }).then(response=>{
                        setPhoto(response.data); //백엔드에서 보내는 변경된 이미지명을 photo변수에 넣는다
                    }).catch(err=>{
                        alert(err);
                    })
                }else{ 
                    //업로드 취소할 시
                    setImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
                    return
                }
            //화면에 프로필 사진 표시
                const reader = new FileReader();
                reader.onload = () => {
                    if(reader.readyState === 2){
                        setImage(reader.result)
                    }
                }
                reader.readAsDataURL(e.target.files[0])
            }


    
     let updateUrl = process.env.REACT_APP_SPRING_URL + "mypage/update?loginNum="+loginNum + "&id=" + loginId;
     let updateUrl2 = process.env.REACT_APP_SPRING_URL + "mypage/update2?loginNum="+loginNum + "&id=" + loginId;
     const save=()=>{
        console.log(photo);
        // setDto({
        //     ...dto,
        //     file_name: photo
        // });
        axios.post(updateUrl,{photo}).then(res=>{})
        .catch(err => console.log(err));

        // axios.post(updateUrl2,{tel:dto.tel, email:dto.email, address1:dto.address1, address2:dto.address2}).then(res=>{window.location.reload();});
        axios.post(updateUrl2,{
            ...dto,
            registered_at: null
        }).then(res=>{
            console.log(res.data);
            dispatch(changePhoto(res.data)); // redux에 로그인 유저 정보 저장
            window.location.reload();
        })
        .catch(err => console.log(err));
        
    }

   

    
    return (
        <div>
            <div className="wrapper2">
            <div className="container2">
                <div className="top-background-div"></div>
                <div className="top-container">
                    <div className="profilePhotoContainer">
                        <div className="profilePhoto-text" id="profilePhote">

                        <Avatar 
                        src={Image} 
                        style={{marginTop:'150px',borderRadius:'10px'}} 
                        size={200} 
                        onClick={()=>{fileInput.current.click()}}>


                    </Avatar>


                    <input 
                        type='file' 
                        style={{display:'none'}}
                        accept='image/jpg,image/png,image/jpeg' 
                        name='profile_img'
                        onChange={onChange}
                        ref={fileInput}/>
                    
                        
                        </div>
                    </div>
                    <div className="text" style={{marginTop:'150px'}}><span id="userNickNameTop">{dto.id}</span></div>
                    <div className="small-text">님의 프로필</div>
                </div>
                <div className="flex-container">
                    <div className="form-container">
                        <div className="py-4">
                            <div className="section-title-container">
                                <h5 style={{marginBottom: "8px"}}><b>기본정보</b></h5>
                            </div>
                            <div className="data">
                                <label>이름</label>
                                <input type="text" id="userName" readonly="" placeholder={dto.name}/>
                            </div>

                            <div className="data">
                                <label>생년월일</label>
                                <input type="text" id="userEmailArea" readonly="" placeholder={dto.birthday}/>
                                     <b id="userEmailArea"></b>
                            </div>


                            <div className="data">
                                <label>전화번호</label>
                                <input type="text" id="userEmailArea" value={dto.tel} onChange={(e) => {
                                    setDto({
                                        ...dto,
                                        tel: e.target.value
                                    })
                                }}/>
                                     <b id="userEmailArea"></b>
                            </div>

                            <div className="data">
                                <label>이메일</label>
                                <input type="text" id="userEmailArea" value={dto.email} onChange={(e) => {
                                    setDto({
                                        ...dto,
                                        email: e.target.value
                                    })
                                }}/>
                            </div>
                            <div className="data">
                                <label>주소</label>
                                <input type="text" id="userEmailArea"  value={dto.address1} onChange={(e) => {
                                    setDto({
                                        ...dto,
                                        address1: e.target.value
                                    })
                                }}/>
                                     <b id="userEmailArea"></b>
                            </div>

                            <div className="data">
                                <label>상세주소</label>
                                <input type="text" id="userEmailArea"  value={dto.address2} onChange={(e) => {
                                    setDto({
                                        ...dto,
                                        address2: e.target.value
                                    })
                                }}/>
                                     <b id="userEmailArea"></b>
                            </div>

                        </div>
                        <span id="resultAreaForPwd"><div className="flex-container">
                        <div className="form-container">
                        {/* <div className="section-title-container">
                            <h5 style={{marginBottom: "8px"}}><b>비밀번호</b></h5>
                        </div>
                        <div className="data">
                            <label>비밀번호</label>
                            <input type="password" id="userPwd" required=""/>
                        </div>
                        <div className="data">
                            <label>새 비밀번호</label>
                            <input type="password" id="newPassword" required=""/>
                        </div>
                        <div className="data">
                            <label>새 비밀번호 확인</label>
                            <input type="password" id="newPasswordConfirm" required=""/>
                        </div> */}
                        <span id="differentPassMsg"></span>
                        </div>
                    </div></span>
                   
                    </div> 
                    </div>
                </div>

                    {/* <div className="divider-container">
                    <div className="divider"></div>
                </div>  */}
                <div className="flex-container p-2">
                    <button className="btn-quit" id="deleteUserBtn" onClick={deleteUser}>회원탈퇴</button>
                </div>
                <div className="flex-container p-5" style={{padding:'1px', paddingBottom:'15px'}}>
                    <button className="btn-normal" onClick={()=>{navi("/mypage/1")}}>취소하기</button>
                    <button className="btn-normal" id="saveUserInfo" onClick={save}>저장하기</button>
                    {/* <button className="btn-normal" id="saveUserInfo">비밀번호 변경</button> */}
                </div>
            </div>
        </div>
            
    
    );
};

export default Profile;