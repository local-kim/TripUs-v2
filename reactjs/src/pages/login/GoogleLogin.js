import React, { useEffect, useState,useRef } from "react";
import { GoogleLogin, GoogleBtn } from 'react-google-login';

function Google() {
  const googleLoginBtn = useRef(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    googleSDK();
  }, []);


//SDK 초기 설정 및 내 API초기화
 const googleSDK = () => {
    window.googleSDKLoaded = () => {
      console.log(window.gapi);
      window.gapi.load("auth2", () => {
        const auth2 = window.gapi.auth2.init({
          client_id:
            "내 클라이언트 ID",
          scope: "profile email",
        });
        //버튼 클릭시 사용자 정보 불러오기
         auth2.attachClickHandler(
          googleLoginBtn.current,
          {},
          (googleUser) => {
            const profile = googleUser.getBasicProfile();
            console.log(profile);
            console.log(`Token || ${googleUser.getAuthResponse().id_token}`);
            setToken(googleUser.getAuthResponse().id_token);
            console.log(`ID: ${profile.getId()}`);
            console.log(`Name: ${profile.getName()}`);
            console.log(`Image URL: ${profile.getImageUrl()}`);
            console.log(`Email: ${profile.getEmail()}`);
          },
          (error) => {
            alert(JSON.stringify(error, undefined, 2));
          }
        );
      });
    };
   //구글 SDK 불러오기
       (function (d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "google-jssdk");
  };
  
   return (
    <GoogleBtn id="gSignInWrapper">
      <span class="label" />
      <div ref={googleLoginBtn} id="customBtn" className="customGPlusSignIn">
        <span className="icon"></span>
        <span className="buttonText">Login with Google</span>
      </div>
    </GoogleBtn>
  );
}
export default GoogleLogin;