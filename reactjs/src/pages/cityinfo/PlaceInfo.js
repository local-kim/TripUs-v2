import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Box from '@mui/material/Box';
import '../../styles/placeinfo.css';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import {Button, Modal} from '@mui/material';
import {useSelector} from 'react-redux';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Component from './Component';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//kakao map
const { kakao } = window;

//modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height:730,
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PlaceInfo=()=>{
  const {cityNum, contentId}=useParams();
  const loginNum = useSelector(state => state.auth.user.num); //로그인번호 유지
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); //로그인여부 체크
  const userPage = useNavigate();
    //git error catch
       //CityInfoMain에서 Api contentId 받기 (pcontentId)  [126078]
      // const location = useLocation();
      // console.log("location",location.state.place); //contentId 받아온거
      // const CityInfoMainContendId = location.state.state.pcontentId;
      // console.log("CityInfoMainContendId : "+CityInfoMainContendId);
    
      const [anchorEl, setAnchorEl] = React.useState(null); //배열...
      const editopen = Boolean(anchorEl); //배열
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const editeHandleClose = () => {
        setAnchorEl(null);
      };
      
      
    //mui
    const [value, setValue] = React.useState('1');
    const [starsvalue, setStarsValue] = React.useState('0');
    const [isChecked, setIsChecked] = useState(false);
    const [liked,setLiked]=useState(0);

    //tab화면전환시 지도 출력        
    // const handleChange = (event, newValue) => {
    // setValue(newValue);
    // if(newValue==='1'){
    // return kakaomapscript();
    // }
    // };

    //지도api & 관광지 api 
    //const contentId=CityInfoMainContendId; //city페이지에서 contentid받는곳
    // const contentId=126078; //임시 contentid 값 추후 cityInfo에서 contentid 넘겨받기 [ 광안리해수욕장 : 126078] [강화도 : 125502] [강화도 동막해변:127291]
     //const placeApikey="sRb6GSV%2FXAgOAdS%2FpBID9d0lsR8QfJ78C4bJYMZCu2MItPGIbX8JvFumAqXoFD61AoXODAxJdlrUaDwDavWlsg%3D%3D"; //내인증키
     //env opentour api key
  const placeApikey = process.env.REACT_APP_TOUR_API_KEY;
     //const placeApikey="hG2QkKkmuiN38w%2BeGu53VbRK%2BBNzKRpnjbLE%2BHDXZ0dHzgbBQ67K67NsuR5xOAs%2BErSqbSpOpk1UKBnj4dvlnA%3D%3D"; //재호님 인증키
    // const placeApikey="YHbvEJEqXIWLqYGKEDkCqF7V08yazpZHKk3gWVyGKJpuhY5ZowEIwkt9i8nmTs%2F5BMBmSKWuyX349VO5JN6Tsg%3D%3D"; //현지언니 인증키
    //const placeApikey="7Et3sUoEnYoi9UiGk4tJayBnDo4ZMQ%2FM%2FOkEKTJMSjXkoukxdqrTDOu3WAzTgO5QsOTQOBSKfwMMuIbl8LyblA%3D%3D"; // 일웅님 인증키
    const [placeTitle, setPlaceTitle] = useState();
    const [placeAddr, setPlaceAddr] = useState();
    const [placeImg,setPlaceImg]= useState();

    const [cat1name,setCat1name] =useState();
    const [cat2name,setCat2name] = useState();
    const [cat3name,setCat3name] =useState();
    const [cattypename,setCattypename]=useState();

    //console.log("let cat1:",cat1name,"let cat2:",cat2name,"let cat3:",cat3name); 대/중/소 분류

    // 사진이 있는 장소만 받는 url(arrange=P)
     let apiUrl=`http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?ServiceKey=${placeApikey}&contentId=${contentId}&defaultYN=Y&mapinfoYN=Y&addrinfoYN=Y&firstImageYN=Y&catcodeYN=Y&MobileOS=ETC&MobileApp=AppTest&_type=json`;
     let apiUrl2=`http://api.visitkorea.or.kr/openapi/service/rest/KorService/categoryCode?ServiceKey=${placeApikey}&cat1=${cat1name}&cat2=${cat2name}&cat3=${cat3name}&MobileOS=ETC&MobileApp=AppTest&_type=json`;

    //review
    const reviewtxtRef = useRef('');
    const reviewstarsRef = useRef('');

     const [refreshReview,setRefreshReview]=useState();
     const [avgStars,setAvgStars]=useState(0);
     const [sumLikes,setSumLikes]=useState(0);
     const [place_id,setPlace_Id]=useState('');
     const [detailData,setDetailData]=useState([0]);
     const [detailFileData,setDetailFileData]=useState('');
     const [detailData2,setDetailData2]=useState('');
     const [editDetailData,setEditDetailData]=useState([0]);
     //setPlace_Id(contentId);
     const [member_num,setMember_Num]=useState('');
     const [stars,setStars]=useState();
     const [check,setChekced]=useState();
     const [like,setLike]=useState();
     const [content,setContent]=useState();
     const [filename,setFileName]=useState();
     const [updatefilename,setUpdateFileName]=useState();
     const [modalfilename,setModalFileName]=useState();
    // const [sta,setContent]=useState('');
    const [reviewData,setReviewData]=useState([]); //data 받아오기
    //현재 페이지 번호
    const [multijson,setMultiJson]=useState([]);

    //Spring url선언
    let pagelistUrl=process.env.REACT_APP_SPRING_URL+`review/allreview?place_id=${contentId}`;
    //let paginationlistUrl=process.env.REACT_APP_SPRING_URL+`review/pagelist?place_id=${contentId}`;
    let placeStarsAvgUrl=process.env.REACT_APP_SPRING_URL+"review/avgstars?place_id="+contentId;
    let placeLikesSumUrl=process.env.REACT_APP_SPRING_URL+"review/sumlikes?place_id="+contentId;
    let insertUrl=process.env.REACT_APP_SPRING_URL+"review/insert";
    let deleteUrl=process.env.REACT_APP_SPRING_URL+"review/delete?num=";
    let onedeleteUrl=process.env.REACT_APP_SPRING_URL+"review/onedelete?review_photo_num=";
    let detailUrl=process.env.REACT_APP_SPRING_URL+"review/detail?num=";
    let updateUrl=process.env.REACT_APP_SPRING_URL+"review/update";
    let likeUrl=process.env.REACT_APP_SPRING_URL+"review/like?place_id="+contentId+"&loginNum="+loginNum;
    let insertlikeUrl=process.env.REACT_APP_SPRING_URL+"review/insertlike";
    let uploadUrl=process.env.REACT_APP_SPRING_URL+"review/upload";
    let uploadUrl2=process.env.REACT_APP_SPRING_URL+"review/upload";
    let photoUrl=process.env.REACT_APP_SPRING_URL+"review_photo/";
    let photoUrl2=process.env.REACT_APP_SPRING_URL+"review_photo/";
    let profilePhotoUrl=process.env.REACT_APP_SPRING_URL+"save/";
    let deletelikeUrl=process.env.REACT_APP_SPRING_URL+"review/deletelike?place_id="+contentId+"&loginNum="+loginNum;
    

    const [multiUploadFile,setMultiUploadFile]=useState([]);
     //file change 시 호출 이벤트
     const uploadImage=(e)=>{

      console.log("그냥 체인지");
      //const uploadFile=e.target.files[0];
      const uploadFile=e.target.files;
      const imageFile = new FormData();
      //imageFile.append("uploadFile",uploadFile);// spring의 @RequestParam으로 들어감
      for(let i =0; i< uploadFile.length;i++){
         imageFile.append("imagefile",uploadFile[i]);
        //  if(deleteFileImage ===true){
        //   imageFile.deppend("imagefile",uploadFile[i]);
        //  }
        }
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`; 
        axios({
          method: 'POST',
          url: uploadUrl,
          data: imageFile,
          headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {  // json 형식의 response를 받음
           setFileName(res.data); // 백엔드에서 보낸 변경된 이미지명을 photo 변수에 넣는다
           console.log("upload-image:",res.data);
        }).catch(err=>{
            console.log("err",err);
        })
        
      }


      // 파일 삭제
      const deleteFileImage = (idx) => {
        URL.revokeObjectURL(filename);
        // URL.revokeObjectURL(modalfilename);
        setFileName(filename.filter((file, i) => i != idx));
        // setModalFileName(modalfilename.filter((file, i) => i != idx));
  
        axios.get(process.env.REACT_APP_SPRING_URL+"review/deleteUploadPhoto?idx="+idx)
        .then(res => {
          // alert("하나 삭제 성공");
        })
        .catch(err => console.log(err));
      };
  
        // 파일 삭제
        const deleteModalFileImage = (idx) => {
          // URL.revokeObjectURL(filename);
          URL.revokeObjectURL(modalfilename);
          // setFileName(filename.filter((file, i) => i != idx));
          setModalFileName(modalfilename.filter((file, i) => i != idx));
    
          axios.get(process.env.REACT_APP_SPRING_URL+"review/deleteUploadPhoto?idx="+idx)
          .then(res => {
            // alert("하나 삭제 성공");
          })
          .catch(err => console.log(err));
        };

    
      useEffect(() => {
        console.log("filename"+filename);
      }, [filename])

      useEffect(() => {
        console.log("modalfilename"+modalfilename);
      }, [modalfilename])
      
      
      //updatefile change 시 호출 이벤트
      const modaluploadImage=(e)=>{
        console.log("modal change");
        const modaluploadFile=e.target.files;
        const imageFile = new FormData();
        //imageFile.append("uploadFile",uploadFile);// spring의 @RequestParam으로 들어감
        for(let i =0; i< modaluploadFile.length;i++){
          imageFile.append("imagefile",modaluploadFile[i]);
           console.log("modalimageFile[]:",modaluploadFile[i]);
         }
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`; 
        axios({
            method: 'post',
            url: uploadUrl2,
            data: imageFile,
            headers: {'Content-Type': 'multipart/form-data'}
          }).then(res => {  // json 형식의 response를 받음
            setModalFileName(res.data); // 백엔드에서 보낸 변경된 이미지명을 photo 변수에 넣는다
          }).catch(err => {
            // alert("photourl:",err);
            console.log(err);
          });
        }


    //ReviewList 호출
    const pageList=()=>{
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`; 
        axios.get(pagelistUrl).then(res=>{
        if(res.data.length===0){
            // setReviewData("후기가 없습니다 작성해주시길바랍니다.");
            //alert("x");
        }else{
            setReviewData(res.data);
            console.log("pagelist:",res.data);
          }
        //console.log("reviewdatalength:",res.data.length);
        })
        .catch(err => {
            // alert(err);
            console.log(err);
        }) 
    }

  

    //PaginationList 호출
    // const paginationList=()=>{
    //   axios.get(paginationlistUrl).then(res=>{
    //       setReviewData(res.data);
    //         console.log("pagination:",res.data);
    //     })
    //     .catch(err => {
    //         alert(err);
    //     }) 
    //   }


        //Review insert
        const writeReview=(e)=>{
          //e.preventDefault();
          axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`; 
          if(!isLoggedIn){
            alert("먼저 로그인해주세요"); }else{
            axios.post(insertUrl,{place_id:contentId,member_num:loginNum,stars,content}).then(res=>{ 
              // alert("성공");
              pageList();
              setStarsValue("");
              setRefreshReview("");
              setFileName(""); 
            }).catch(err => {
              // alert(err);
              console.log(err);
            })
          }
          
          }


    //ReviewAvgStars 호출
    const AvgStars=()=>{
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`; 
      axios.get(placeStarsAvgUrl).then(res=>{
        if(res.data==null||res.data==0||res.data==undefined){
          // alert(res.data);
          console.log(res.data);
        }else{
        setAvgStars(res.data);
      }
      })
    }

    //getSumLikes 호출
    const GetSumLikes=()=>{
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`; 
      axios.get(placeLikesSumUrl).then(res=>{
        if(res.data.length===0){
          setSumLikes(0);
        }else{
        setSumLikes(res.data);
        //console.log("likes:",res.data);
      }
      })
    }

    const handleChecked = (event) => {
      if(!isLoggedIn){
        alert("먼저 로그인해주세요");
      }else{
        console.log("firtsconsole:",event.target.checked);
        setIsChecked(event.target.checked);
        console.log("number",Number(isChecked));

        if(!isChecked){
          axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`; 
          axios.post(insertlikeUrl,{
            cityNum,
            place_id:String(contentId),
            contentid: String(placeData.contentid),
            contenttypeid: String(placeData.contenttypeid),
            title: placeData.title,
            cat3: placeData.cat3,
            addr1: placeData.addr1,
            addr2: placeData.addr2,
            firstimage: placeData.firstimage,
            mapx: String(placeData.mapx),
            mapy: String(placeData.mapy),
            loginNum,
            check:Number(isChecked)
          }).then(res=>{
          //alert("좋아요 true:",res.data);
          setLike(res.data.check);
        })}
        else{
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`; 
        axios.delete(deletelikeUrl).then(res=>{
         // alert("좋아요-1");
          setLiked(0); 
          setIsChecked(false);
          //console.log("-liked value:",liked);
        })
    }
  }
     };
   
     
      //mylike select 호출
      const myLike=()=>{
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`; 
        axios.get(likeUrl).then(res=>{  
          //console.log("mylikedat:",res.data);
          if(res.data==null||res.data==0){
          setLike(res.data);
          setIsChecked(false);
         // console.log("mylike0:",res.data);
        }else{
          setLike(res.data);
          setIsChecked(true);
         // console.log("mylike1:",res.data);
        }
        }).catch(err => {
          //alert(err);
        })
      }


        //사진 하나 삭제 11
        const onOneDelete=(review_photo_num, idx)=>{
          axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`; 
          axios.delete(onedeleteUrl+review_photo_num).then(res=>{
            console.log("onOneDelete:",res.data);
            alert("정말 삭제하시겠습니까?");
            setDetailFileData(detailFileData.filter((file, i) => i != idx));
          }).catch(err=>{
            console.log(err);
          })
        }

        //삭제시 호출할 함수
        const onDelete=(num)=>{
          if(window.confirm("정말 삭제하시겠습니까?")){
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`; 
          axios.delete(deleteUrl+num).then(res=>{
            // alert("삭제되었습니다.");
            if(open===true){
              handleClose();
              pageList();
            }else{
              pageList();
            }
          })
        }
           }

           //modal mui
           const [open, setOpen] = React.useState(false);
           const [updateModalOpen,setUpdateModalOpen] = React.useState(false);
          const [detailidx,setDetailIdx] =useState('');

          // const handleOpen = () =>
           const handleClose = () =>{ setOpen(false);  }
           const edithandleClose = () =>{setUpdateModalOpen(false);}

         //상세보기 호출할 함수
         const onDetail=(num,idx)=>{
          console.log("detailidx",idx);
          setDetailIdx(idx);
          axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`; 
          axios.get(detailUrl+num).then(res=>{
            if(res.file_name ===null){
              console.log("res.file_name:",res.file_name);
              setDetailData(res.data.dto);
              console.log("detail->",res.data.dto);
              console.log("detailfile",res.data.fname);
              console.log("modalidxidx:",idx);
            }
            else{
              setDetailData(res.data.dto);
              setDetailFileData(res.data.fname);
              console.log("res.file_name:",res.file_name);
              console.log("detail->",res.data.dto);
              console.log("detailfile",res.data.fname);
              console.log("modalidxidx:",idx);
              
            }
              setOpen(true);
          })
         }

         // 이전페이지로 넘어가기
         const onPrevDetail=(num,idx)=>{
          console.log("detailidx",idx);
          axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`; 
          axios.get(detailUrl + reviewData[idx - 1].num).then(res=>{
                if(res.data.file_name ===null){
                setDetailData(res.data.dto);
                setDetailIdx(idx-1);
                console.log("prevdetail->",res.data.dto);
                console.log("prevdetailfile",res.data.fname);
                console.log("modalidxidx:",idx);
              }
              else{
              setDetailData(res.data.dto);
              setDetailIdx(idx-1);
              setDetailFileData(res.data.fname);
              console.log("prevdetail->",res.data.dto);
              console.log("prevdetailfile",res.data.fname);
              console.log("modalidxidx:",idx);
              
            }
              setOpen(true);
          })
         }

           // 다음페이지로 넘어가기
           const onNextDetail=(num,idx)=>{
            console.log("nextdetailidx",idx);
           
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`; 
            axios.get(detailUrl + reviewData[idx + 1].num).then(res=>{
                  if(res.data.file_name ===null){
                  setDetailData(res.data.dto);
                  setDetailIdx(idx+1);
                  console.log("nextdetail->",res.data.dto);
                  console.log("nextdetailfile",res.data.fname);
                  console.log("nextmodalidxidx:",idx);
                }
                else{
                setDetailData(res.data.dto);
                setDetailFileData(res.data.fname);
                setDetailIdx(idx+1);
                console.log("nextdetail->",res.data.dto);
                console.log("nextdetailfile",res.data.fname);
                console.log("nextmodalidxidx:",idx);
                
              }
                setOpen(true);
            })
           }

         //수정상세보기 호출함수
         const onEditReviewDetail=(num)=>{
          axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`; 
          axios.get(detailUrl+num).then(res=>{
            setEditDetailData(res.data.dto);
            setDetailFileData(res.data.fname);
            console.log(res.data.dto[0]);
            console.log(res.data.fname);
            // console.log("editdetail:",res.data); //호출
            // console.log("editdetailnum형태:",res.data.num);
            //이름 , num
            setUpdateModalOpen(true);
           
        })
      }

         //수정하는 함수 이벤트
         const onUpdate=(num)=>{
          axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwtToken')}`; 
          axios.post(updateUrl,{num, stars, content}).then(res=>{
            console.log("update:",res.data);
            setDetailData2(res.data);
            setModalFileName("");
            //alert("수정완료");
            edithandleClose();
            //setUpdateModalOpen(true);
            onDetail(num);
            pageList();
          })
         }

    useEffect(() => {
       kakaomapscript();
      //  myLike();
       GetSumLikes();
       AvgStars();
      //uploadImage();
    });

    useEffect(()=>{
     pageList();
     //onOneDelete();
     myLike();
    },[]);

    useEffect(() => {
      window.scrollTo(0,0)
    },[])

    //modal
    

    // const requiredimgscript = () =>{

    //   var i3 = document.getElementById("uploadimgalt").style.visibility="visible"; 
    // }

    let placeData;

    //kakomap + tourapi3
    const kakaomapscript = () => {
        
        const container = document.getElementById('place_map');
        delete axios.defaults.headers.common['Authorization'];
        axios.get(apiUrl)
        .then((res) => {
          placeData = res.data.response.body.items.item[0];
          console.log("placeData:",placeData);
        const apidata=res.data.response.body.items.item[0];
        const placex=apidata.mapx;  //관광지 위치(x좌표)
        const placey=apidata.mapy;  //관광지 위치(y좌표)
        const placetitle=apidata.title; //관광지명
        const placeaddr1=apidata.addr1; //관광지 주소 
        const placeaddr2=apidata.addr2; //관광지 상세주소
        const placeimg=apidata.firstimage; //관광지 대표 이미지
        
        const cat1 =apidata.cat1; //관광지 대분류
        const cat2=apidata.cat2; //관광지 중분류
        const cat3=apidata.cat3; //관광지 소분류

        setCat1name(cat1);
        setCat2name(cat2);
        setCat3name(cat3);
        // console.log("placeimgurl:",placeimg);
        //console.log("placeaddr2:",placeaddr2);

        setPlaceTitle(placetitle);
            if(placeaddr2===undefined){
                setPlaceAddr(placeaddr1);
            }else{
                setPlaceAddr(placeaddr1+placeaddr2);
            }
        setPlaceImg(placeimg);

        const options = {
            center: new kakao.maps.LatLng(placey, placex),
            //center: new kakao.maps.LatLng(35.1591243474,129.1603078991),
            //new kakao.maps.LatLng(y좌표,x좌표)
            level: 6
        };
        
        const map = new kakao.maps.Map(container, options);
    
        //마커가 표시 될 위치
        let markerPosition = new kakao.maps.LatLng(placey, placex);

        // 마커를 생성
        let marker = new kakao.maps.Marker({position: markerPosition,
        });

        // 마커를 지도 위에 표시
        marker.setMap(map);
        //setPlaces(res.data.response.body.items.item);
        }).catch((err) => {
    
        });
    };

    delete axios.defaults.headers.common['Authorization'];
    axios.get(apiUrl2).then((res) => {

        //console.log("apiUrl2",res.data.response.body.items.item); 대/중/소분류 axios
        const api2data=res.data.response.body.items.item[0];
        const servicetypecodename=api2data.name;
        setCattypename(servicetypecodename);

    }).catch((err) => {
    
    });

    //   // 파일 삭제
    // const deleteFileImage = (idx) => {
    //   URL.revokeObjectURL(filename);
    //   // URL.revokeObjectURL(modalfilename);
    //   setFileName(filename.filter((file, i) => i != idx));
    //   // setModalFileName(modalfilename.filter((file, i) => i != idx));

    //   axios.get(process.env.REACT_APP_SPRING_URL+"review/deleteUploadPhoto?idx="+idx)
    //   .then(res => {
    //     alert("하나 삭제 성공");
    //   })
    //   .catch(err => console.log(err));
    // };

    //   // 파일 삭제
    //   const deleteModalFileImage = (idx) => {
    //     // URL.revokeObjectURL(filename);
    //     URL.revokeObjectURL(modalfilename);
    //     // setFileName(filename.filter((file, i) => i != idx));
    //     setModalFileName(modalfilename.filter((file, i) => i != idx));
  
    //     axios.get(process.env.REACT_APP_SPRING_URL+"review/deleteUploadPhoto?idx="+idx)
    //     .then(res => {
    //       alert("하나 삭제 성공");
    //     })
    //     .catch(err => console.log(err));
    //   };

    return (
        <div id='place'>
        <div className='place_info'>

            {/* <Box sx={{ width: 'inherit', typography: 'body1' }}>
            <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

            <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Map" value="1" />
            <Tab label="Review" value="2" />
            {/* <Tab label="Item Three" value="3" /> */}

           {/*</TabList>
            </Box>
        
            <TabPanel value="1">
               
            </TabPanel> */}
            {/* <TabPanel value="2" sx={{overflow:'scroll',overflowX:'hidden',padding:'0'}}> */}
            {/* </TabPanel>
            </TabContext>
            </Box> */}
        
            <div className='place_all_data'>
            <div className='place_sub_data'>
                {/* <img src={placeImg} alt={placeTitle} className='place_img'/> */}
        
                <div className='place_img_name_type'>

                    <div style={{display:'inline-flex',marginBottom:'5px',marginLeft:'-3px'}}>
                    <span style={{fontSize:'30px',fontWeight:'bold'}}>{placeTitle}</span>
                    
                    <div id="main-content">
                    <input type="checkbox" id="checkbox"  checked={isChecked} onChange={handleChecked} value={liked}/>
                    <label for="checkbox" id="heartlabel">
                    <svg id="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">

                      <g id="Group" fill="none" fill-rule="evenodd" transform="translate(467 392)">
                        <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" id="heart" fill="#AAB8C2"/>
                        <circle id="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5"/>

                          {/* 하트 클릭시 나오는 폭죽 */}
                        <g id="grp7" opacity="0" transform="translate(7 6)">
                          <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2"/>
                          <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2"/>
                        </g>

                        <g id="grp6" opacity="0" transform="translate(0 28)">
                          <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2"/>
                          <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2"/>
                        </g>

                        <g id="grp3" opacity="0" transform="translate(52 28)">
                          <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2"/>
                          <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2"/>
                        </g>

                        <g id="grp2" opacity="0" transform="translate(44 6)">
                          <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2"/>
                          <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2"/>
                        </g>

                        <g id="grp5" opacity="0" transform="translate(14 50)">
                          <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2"/>
                          <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2"/>
                        </g>

                        <g id="grp4" opacity="0" transform="translate(35 50)">
                          <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2"/>
                          <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2"/>
                        </g>

                        <g id="grp1" opacity="0" transform="translate(24)">
                          <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2"/>
                          <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2"/>
                        </g>
                      </g>  
                    </svg>
                  </label>
                  </div>

                  </div>

                    <p style={{fontSize:'14px',margin:'0 auto'}}>{cattypename}</p>
                  <div style={{marginTop: '19px'}}>
                    <i className="fa-solid fa-map-location-dot" style={{color:'#3a6670'}}></i>&nbsp;&nbsp;{placeAddr}<br/>
                    {/*별점 좋아요수 */}
                    {/* <Rating name="half-rating-read" defaultValue={avgStars} precision={0.1} readOnly/>{avgStars} */}
                    <i className="fa-solid fa-star" style={{color:'#faaf00'}}></i>&nbsp;&nbsp;{avgStars===0?0:avgStars}<br/>
                    <i className="fa-solid fa-heart" style={{color:'#E2264D'}}></i>&nbsp;&nbsp;{sumLikes}
                  </div>
                </div>
            </div>

             {/* 상세모달 */}

            <div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                      <div style={{display:'inline-flex',width:'665px'}}>
                        <div onClick={()=>userPage(`/user/${detailData[0].member_num}`)} style={{cursor:'pointer'}}>
                          {
                            detailData[0].file_name==null?
                            <div className='photo1'>
                            <span className="material-icons">
                              person
                            </span>
                          </div>:
                           <img src={profilePhotoUrl+detailData[0].file_name} alt="프로필사진" style={{width:'50px',height:'50px',borderRadius:'25px',objectFit:'cover'}}/>
                          }
                      </div>

                        <div style={{marginLeft:'10px',fontSize:'16px'}}>
                          <div>
                          <label>{detailData[0].name}</label>
                          </div>

                          <div style={{display:'inline-flex'}}>
                        <label>{placeTitle}</label>&nbsp;/&nbsp;
                        <label>{detailData[0].created_at}</label>&nbsp;/&nbsp;
                        <Rating name="read-only" ref={reviewstarsRef} value={detailData[0].stars} readOnly size="small" precision={0.5} style={{marginTop:'5px'}}/>
                        {/* <label>{detailData.created_at}</label>&nbsp;/&nbsp; */}
                        </div>
                        </div>
                      </div>

                      {isLoggedIn&&loginNum==detailData[0].member_num? 
                      <div style={{justifyContent:'right',display:'inline-flex'}}>  
                        <Button
                          id="basic-button"
                          aria-controls={editopen ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={editopen ? 'true' : undefined}
                          onClick={handleClick}
                          sx={{color:'gray'}}
                        >
                          ⋮
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={editopen}
                          onClose={editeHandleClose}
                          MenuListProps={{
                            'aria-labelledby': 'basic-button',
                          }}
                        >
                          <MenuItem onClick={()=>{onEditReviewDetail(detailData[0].num);}}>수정하기</MenuItem>
                          <MenuItem onClick={()=>{onDelete(detailData[0].num);}}>삭제하기</MenuItem>
                          {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                        </Menu>
                         {/* <button type='button' className='btn btn-default' style={{border:'1px solid gray'}} onClick={()=>{onEditReviewDetail(detailData[0].num);}}>수정</button>&nbsp;&nbsp;
                         <button type='button' className='btn btn-default' style={{border:'1px solid gray'}} onClick={()=>{
                        onDelete(detailData[0].num);
                       }}>삭제</button> */}
                      </div>:""}
                      </Typography>

                       <div style={{display:'flex',justifyContent:'space-between',alignItems:'end',height:'250px'}}>
                        {/* <div style={{marginTop:'20px',display:'fixed'}}> */}
                      {detailidx==0?<button className='ReviewPrev btn btn-arrow' style={{opacity:'0%'}}>ᐸ</button>:<button className='ReviewPrev btn btn-arrow' onClick={()=>onPrevDetail(detailData[0].num, detailidx)}>ᐸ</button>} 
                       {/* </div> */}
                       <div style={{display:'flex',flexDirection:'column'}}>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        
                      <div style={{height:'193px',width:'550px',justifyItems:'center'}}>

                      <div>
                         <pre style={{width:'550px',fontFamily:'inherit',fontSize:'17px'}} >{detailData[0].content}</pre>
                      </div>

                      <div className='detailmodal'>
                       <div className='detailmodalimgs' style={{display:'flex',marginBottom:'30px',width:'550px',height:'180px',justifyContent: 'center'}}>
                      {       
                            detailFileData&&detailFileData.map((row,idx)=>(

                              
                            <img src={detailFileData[idx]?photoUrl+detailFileData[idx]:""} alt={detailFileData.row} style={{maxWidth:'400px',maxHeight:'400px',objectFit:'contain',marginRight:'5px'}} className='detailimg'/>
                              
                          
                          
                          
                          
                            ))
                      }
                      </div>
                      </div>
                          
                      </div>
                     
                      </Typography>
                      </div>
                      {/* <div style={{marginTop:'20px',display:'fixed'}}> */}
                        {detailidx>=(reviewData.length-1)?<button className='ReviewNext btn btn-arrow' style={{opacity:'0%'}} onClick={()=>onNextDetail(detailData[0].num, detailidx)}>ᐳ</button>:<button className='ReviewNext btn btn-arrow' onClick={()=>onNextDetail(detailData[0].num, detailidx)}>ᐳ</button>}
                      {/* </div> */}
                        </div>

                    </Box>
                  </Modal>
                </div>
              

                {/*수정모달 */}
                <div>
                
                  <Modal
                    open={updateModalOpen}
                    onClose={edithandleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                      <div style={{display:'inline-flex',width:'665px'}}>
                        <div>
                          {
                            detailData[0].file_name==null?
                            <div className='photo1'>
                            <span className="material-icons">
                              person
                            </span>
                          </div>:
                               <img src={profilePhotoUrl+detailData[0].file_name} alt="프로필사진" style={{width:'50px',height:'50px',borderRadius:'25px',objectFit:'cover'}}/>
                          }
                          {/* <img src={detailData[0].file_name==null?Ayong:profilePhotoUrl+detailData[0].file_name} alt="프로필사진" style={{width:'50px',height:'50px',borderRadius:'25px'}}/> */}
                      </div>

                        <div style={{marginLeft:'10px',fontSize:'16px'}}>
                          <div>
                          <label>{editDetailData[0].name}</label>
                          </div>

                          <div style={{display:'inline-flex'}}>
                        <label>{placeTitle}</label>&nbsp;/&nbsp;
                        <label>{editDetailData[0].created_at}</label>&nbsp;/&nbsp;
                        <Rating name="half-rating" className='updatestar' defaultValue={editDetailData[0].stars} precision={0.5} size="small" style={{marginTop:'5px'}}
                          onChange={(event, newValue) => {
                            setStars(newValue);
                          }}/>
                        </div>

                        </div>
                      </div>
                      </Typography>

                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <div style={{justifyContent:'center',display:'flex'}}>
                      {/* { */}
                      {/* detailFileData&&detailFileData.map((row,idx)=>( */}
                        {/* <div> */}
                      {/* <img src={detailFileData[idx]?photoUrl+detailFileData[idx]:photoUrl+detailFileData[idx]} alt={detailFileData.row} style={{width:'150px',height:'150px',objectFit:'contain'}} /> */}
                           {/* <button type="button" onClick={()=>{onOneDelete(editDetailData[idx].review_photo_num, idx);}}>삭제</button> */}
                           {/* </div> */}
                           {/* ))}   */}

                      {/*기존에 있던 사진*/}
                    <div style={{justifyContent:'center',display:'flex',height:'150px',marginTop:'50px'}}>
                      {
                        detailFileData&&detailFileData.map((row,idx)=>(
                        <div>
                          {/* <img src={detailFileData[idx]?photoUrl+detailFileData[idx]:photoUrl+detailFileData[idx]} alt={detailFileData.row} style={{width:'150px',height:'150px',objectFit:'contain'}} /> */}
                          <div  style={{backgroundImage:`url(${detailFileData[idx]?photoUrl+detailFileData[idx]:photoUrl+detailFileData[idx]})`,width:'100px',height:'100px',backgroundSize:'cover',textAlign:'right',marginLeft:'13px'}}>
                            {/* <button type="button" onClick={()=>{onOneDelete(editDetailData[idx].review_photo_num, idx);}}>삭제</button> */}
                            <div style={{color:'red',fontWeight:'bold',cursor:'pointer'}}   onClick={()=>{onOneDelete(editDetailData[idx].review_photo_num, idx);}}>
                              <i class="fa-solid fa-circle-minus"></i>
                            </div>
                          </div>
                        </div>
// =======
//                       <img src={detailFileData[idx]?photoUrl+detailFileData[idx]:photoUrl+detailFileData[idx]} alt={detailFileData.row} style={{width:'150px',height:'150px',objectFit:'contain'}} />
//                            <button type="button" onClick={()=>{
//                             onOneDelete(editDetailData[idx].review_photo_num, idx);
//                            }}>삭제</button>
//                            </div>
// >>>>>>> branch 'master' of https://github.com/local-kim/FinalProject.git
                           ))}  
                      

                     {/*추가하는 사진->upload image*/}
                    {
                      modalfilename&&modalfilename.map((row,idx)=>(
                    <div>
                      {/* <img src={photoUrl2+row} style={{width:'120px',marginLeft:'130px'}} alt= "1" />
                      <button type="button" onClick={()=>{
                        deleteModalFileImage(idx);
                        console.log(idx+"삭제");
                      }}>삭제</button> */}
                        <div style={{backgroundImage:`url(${photoUrl2+row})`,width:'100px',height:'100px',backgroundSize:'cover',textAlign:'right',marginLeft:'13px'}}>
                          <div style={{color:'red',fontWeight:'bold',cursor:'pointer'}}  onClick={()=>{
                          deleteModalFileImage(idx);
                          // console.log(idx+"삭제");
                          }}>
                            <i class="fa-solid fa-circle-minus"></i>
                          </div>
                        </div>
                     </div>
                      ))}
                      </div>
                      </div>
                      <div style={{justifyContent:'center',display:'flex'}}>
                         <textarea style={{width:'550px',height:'250px',border:'1px solid #aaaaaa'}} defaultValue={editDetailData[0].content} onChange={(e)=>{
                          setContent(e.target.value);
                         }}></textarea>
                      </div>

                      <div style={{justifyContent:'center',display:'flex',marginTop: '10px'}}>
                         <button type='button' className='btn btn-default' style={{border:'1px solid gray', marginRight:'10px'}} onClick={()=>{
                          onUpdate(editDetailData[0].num);
                         }}>수정완료</button>

                  {/*imgfile */}      
                  <label for="file2">
                  <div class="btn-upload">
                  <span class="material-icons-outlined">add_photo_alternate</span>
                    </div>
                  </label>
                  <input type='file' name='modal-upload' accept='image/*' multiple onChange={modaluploadImage} onClick={()=>console.log("modal")} id="file2" />
                    {/*map돌릴예정*/}
                    {/* {
                      modalfilename&&modalfilename.map((row,idx)=>(
                        <div>
                     <img src={photoUrl2+row} style={{width:'120px',marginLeft:'130px'}} alt= "1" />
                     <button type="button" onClick={()=>{
                      // onOneDelete(editDetailData[idx].review_photo_num);
                      deleteModalFileImage(idx);
                     }}>삭제</button>
                     </div>
                      ))} */}
                      </div>
                      </Typography>
                    </Box>
                  </Modal>
                </div>
        </div>
        <div id='place_map'></div>
        </div>
          <div className='place_review_write'>
            <div style={{width: '1090px'}}>

              <div style={{display:'inline-flex'}}>
            {/* <Box sx={{'& > legend': { mt: 2 },}}> */}
              <Typography component="legend">{member_num}</Typography> 
              <Rating
                name="half-rating" className='mystar'
                value={starsvalue} precision={0.5}
                onChange={(event, newValue) => {
                  setStarsValue(newValue);
                  setStars(newValue);
                }}/> 

                     {/* </Box>  */}
                     <div style={{display:'inline-flex',justifyContent:'right',marginLeft:'10px;'}}>

                     <input type='file' name='upload' accept='image/*' multiple onChange={uploadImage} onClick={()=>console.log("그냥")}  id="file" />
                  {/* <i class="fa-solid fa-image"> <input type='file' name='upload' accept='image/*' multiple onChange={uploadImage}/> </i> */}
                  {/* <p>{filename}</p> */}

                    {/*imgfile */}
                    {/* <label for="file">
                    <div class="btn-upload"><i class="fa fa-upload"></i>
                        &nbsp;upload
                    </div>
                   </label> */}

                <button type='button' className='btn_review_write' onClick={writeReview}>Review</button>
                
                </div>

                </div>
                <div style={{display:'inline-flex'}}>
                  <div style={{display:'flex',flexDirection:'column'}}>
                <textarea placeholder='50글자내로 작성해주세요🥕' className='review' value={refreshReview} onChange={(e)=>{setContent(e.target.value);}}></textarea>
                <div style={{display:'flex',justifyContent:'left'}}>
                <label for="file">
                    <div class="btn-upload" style={{marginTop:'13px'}}>
                      <span class="material-icons-outlined">add_photo_alternate</span>
                    </div>
                   </label>
                {
                      filename&&filename.map((row,idx)=>(
                        <div>
                          <div style={{backgroundImage:`url(${photoUrl+row})`,width:'80px',height:'80px',backgroundSize:'contain',textAlign:'right',marginLeft:'13px',marginTop:'5px'}}>
                            <div style={{color:'red',fontWeight:'bold',cursor:'pointer'}}  onClick={()=>{deleteFileImage(idx);}}>
                            <i class="fa-solid fa-circle-minus"></i>
                            </div>
                            </div>
                    </div>
                      ))
                  }
                  </div>
                  </div>
                </div>
                </div>
            </div> 
            
                   {/* 리뷰들*/}
                    <div style={{justifyContent:'center',display:'flex',marginTop:'10px'}}>
                  <div style={{width:'1090px',height:'500px',display:'flex',overflow:'scroll',overflowX:'hidden'}}>
                  <div>
                    {/* <p>{reviewData}</p> */}
                    {reviewData.length == 0 ? <p style={{color:'gray'}}>작성된 후기글이 없습니다</p>: ""}
                    {
                      reviewData&&reviewData.map((row,idx)=>(
                        <div style={{display:'flex',borderBottom:'1px solid #a3a3a3',margin:'10px',width:'1072px'}} >
                        <div style={{flexDirection:'column',justifyContent:'center'}}>
                          <div onClick={()=>userPage(`/user/${row.member_num}`)} style={{cursor:'pointer'}}>
                            {
                              row.file_name==null?
                              <div className='photo1'>
                            <span className="material-icons">
                              person
                            </span>
                          </div>:
                              <img src={profilePhotoUrl+row.file_name} alt='ganzi' style={{width:'50px',height:'50px',borderRadius:'25px'}} />
                            }
                          </div>
                          <div style={{marginTop:'5px',textAlign:'center'}}>
                          {row.name}
                          </div>
                          </div>  
                          <div style={{display:'flex',flexDirection:'column',marginLeft:'15px'}}>
                          <div style={{display:'flex',flexDirection:'row'}}>
                          <div style={{backgroundColor:'white',height:'50px',width:'750px',padding:'5px 0px 0px 5px'}} onClick={()=>{onDetail(row.num,idx);}}>
                          {row.content}
                          </div>
                          {isLoggedIn&&loginNum==row.member_num ? 
                          <div style={{flexGrow:'0'}}>
                            <Component num={row.num} onEditReviewDetail={onEditReviewDetail} onDelete={onDelete}/>
                       </div> : ""
                      }
                          </div>
                       <div style={{display:'inline-flex',height:'30px',marginTop:'5px'}}>
                        <div style={{flexGrow:'3',backgroundColor:'white'}}>
                        {row.created_at}&nbsp;&nbsp;&nbsp;
                       <Rating name="read-only" value={row.stars} readOnly size="small" precision={0.5} />&nbsp;({row.stars}점)
                       </div>
                       </div>
                       </div>
                      </div>
                      ))
                    }
                  </div>
                </div> 
                </div>
        </div>
    );
}

export default PlaceInfo;