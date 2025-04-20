import React from "react";
import '../styles/final.css';

function FinalHead(){

    return (
        <div className="header_all">
            <div className="header_list fl">

                <a href="" className="fl">
                    <img alt="logo" src='' />
                </a>
                
                <ul className="hlist fl">
                    <a href="" className="fl">
                        <li>여행지</li>
                    </a>
                    <a href="" className="fl">
                        <li>일정만들기</li>
                    </a>
                    <a href="" className="fl">
                        <li>호텔</li>
                    </a>
                    <a href="" className="fl">
                        <li>이용방법</li>
                    </a>
                </ul>

                <div className="hlist_box fr">
                    <div className="fl hr hlist_search_box">
                        <input type="text" id="hlist_search" placeholder="도시/장소를 찾아보세요." />
                    </div>
                    <div className="fl hr hlist_login">
                        로그인
                    </div>
                    <div className="fl hr hlist_new">
                        회원가입
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FinalHead;