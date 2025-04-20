import React,{useRef, useCallback, useEffect} from 'react';
import Slick from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/cityinfo.css';
import styled, { css } from 'styled-components';

const Wrap = styled.div`
    position: relative;
    overflow: hidden;
   
    // 1. Global style 추가했던 것을 슬라이드 상단에 Wrap을 만들어 여기서 선언했습니다.
    .slick-slide {
        display: inline-block;
    }
   
    // 2. 제가 추가한 커스텀 클래스입니다.
    // pagination 부분입니다.
    .slick-dots.slick-thumb {
        position: absolute;
        bottom: 0;
        left: 50%;
        padding: 0;
        margin: 0;
        list-style: none;
        transform: translate(-50%);

        li {
            position: relative;
            display: inline-block;
         
            &.slick-active {
                span {
                    filter: none;
                }
            }
        }
    }  
`;

const SlickItems = styled.div`
    width: 550px;    
    height: 360px;
    text-align: center;

    img {
        width: 100%;
        height: 100%;
        vertical-align: top;
    }
`;

const defaultButtonStyle = css`
    position: absolute;
    top: calc(50% - 50px);
    padding: 0;
    width: 30px;
    height: 110px;
    line-height: 1;
    border: none;
    border-radius: 50%;
    background: none;
    outline: none;
    cursor: pointer;
`;

const PrevButton = styled.button`
    ${defaultButtonStyle}
    left: 0;
`;

const NextButton = styled.button`
    ${defaultButtonStyle}
    right: 0;
`;



// const PrevIcon = styled(<button type='button'>아</button>)`
//     ${defaultIconStyle}
// `;

// const NextIcon = styled(<button type='button'>아</button>)`
//     ${defaultIconStyle}
// `;

const PagingAnchor = styled.a`
    display: block;
    width: 50px;
    height: 50px;
    

    img {
        width: 100%;
        height: 100%;
    }
`;

// 3. custom pagination을 만듭니다.
// background를 통해 이미지를 넣어줍니다.
// filter를 통해 흑백으로 보이게 하고 active가 되면 흑백을 제거합니다. (31라인참고)
const Paging = styled.span`
    display: inline-block;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    background: url(${props => props.src})no-repeat;
    background-size: 100% 100%;
    filter: grayscale(1);
`;

// 4. 샘플이미지
const images_andong = [
    {
        src: '../../../panorama_image/Andong2.jpg',
        title: "1"
    },
    {
        src: '../../../panorama_image/Andong1.jpg',
        title: "2"
    },
    {
        src: '../../../panorama_image/Andong3.jpg',
        title: "3"
    },
    {
        src: '../../../panorama_image/Andong4.jpg',
        title: "4"
    },
];
const images_busan = [
    {
        src: '../../../panorama_image/Busan4.jpg',
        title: "1"
    },
    {
        src: '../../../panorama_image/Busan2.jpg',
        title: "2"
    },
    {
        src: '../../../panorama_image/Busan3.jpg',
        title: "3"
    },
    {
        src: '../../../panorama_image/Busan1.jpg',
        title: "4"
    },
];
const images_chuncheon = [
    {
        src: '../../../panorama_image/Chuncheon3.jpg',
        title: "1"
    },
    {
        src: '../../../panorama_image/Chuncheon2.jpg',
        title: "2"
    },
    {
        src: '../../../panorama_image/Chuncheon1.jpg',
        title: "3"
    },
    {
        src: '../../../panorama_image/Chuncheon4.jpg',
        title: "4"
    },
];
const images_daejeon = [
    {
        src: '../../../panorama_image/Daejeon2.jpg',
        title: "1"
    },
    {
        src: '../../../panorama_image/Daejeon1.jpg',
        title: "2"
    },
    {
        src: '../../../panorama_image/Daejeon3.jpg',
        title: "3"
    },
    {
        src: '../../../panorama_image/Daejeon4.jpg',
        title: "4"
    },
];
const images_gangneung = [
    {
        src: '../../../panorama_image/Gangneung3.jpg',
        title: "1"
    },
    {
        src: '../../../panorama_image/Gangneung2.jpg',
        title: "2"
    },
    {
        src: '../../../panorama_image/Gangneung1.jpg',
        title: "3"
    },
    {
        src: '../../../panorama_image/Gangneung4.jpg',
        title: "4"
    },
];
const images_gunsan = [
    {
        src: '../../../panorama_image/Gunsan1.jpg',
        title: "1"
    },
    {
        src: '../../../panorama_image/Gunsan2.jpg',
        title: "2"
    },
    {
        src: '../../../panorama_image/Gunsan4.jpg',
        title: "3"
    },
    {
        src: '../../../panorama_image/Gunsan3.jpg',
        title: "4"
    },
];
const images_gyeongju = [
    {
        src: '../../../panorama_image/Gyeongju4.jpg',
        title: "1"
    },
    {
        src: '../../../panorama_image/Gyeongju2.jpg',
        title: "2"
    },
    {
        src: '../../../panorama_image/Gyeongju3.jpg',
        title: "3"
    },
    {
        src: '../../../panorama_image/Gyeongju1.jpg',
        title: "4"
    },
];
const images_incheon = [
    {
        src: '../../../panorama_image/Incheon2.jpg',
        title: "1"
    },
    {
        src: '../../../panorama_image/Incheon1.jpg',
        title: "2"
    },
    {
        src: '../../../panorama_image/Incheon3.jpg',
        title: "3"
    },
    {
        src: '../../../panorama_image/Incheon4.jpg',
        title: "4"
    },
];
const images_jecheon = [
    {
        src: '../../../panorama_image/Jecheon1.jpg',
        title: "1"
    },
    {
        src: '../../../panorama_image/Jecheon2.jpg',
        title: "2"
    },
    {
        src: '../../../panorama_image/Jecheon3.jpg',
        title: "3"
    },
    {
        src: '../../../city_image/.jpg',
        title: "4"
    },
];
const images_jeju = [
    {
        src: '../../../panorama_image/Jeju2.jpg',
        title: "1"
    },
    {
        src: '../../../panorama_image/Jeju1.jpg',
        title: "2"
    },
    {
        src: '../../../panorama_image/Jeju3.jpg',
        title: "3"
    },
    {
        src: '../../../panorama_image/Jeju4.jpg',
        title: "4"
    },
];
const images_jeonju = [
    {
        src: '../../../panorama_image/Jeonju2.jpg',
        title: "1"
    },
    {
        src: '../../../panorama_image/Jeonju1.jpg',
        title: "2"
    },
    {
        src: '../../../panorama_image/Jeonju3.jpg',
        title: "3"
    },
    {
        src: '../../../panorama_image/Jeonju4.jpg',
        title: "4"
    },
];
const images_namwon = [
    {
        src: '../../../panorama_image/Namwon4.jpg',
        title: "1"
    },
    {
        src: '../../../panorama_image/Namwon3.jpg',
        title: "2"
    },
    {
        src: '../../../panorama_image/Namwon2.jpg',
        title: "3"
    },
    {
        src: '../../../panorama_image/Namwon1.jpg',
        title: "4"
    },
];
const images_seoul = [
    {
        src: '../../../panorama_image/Seoul1.jpg',
        title: "1"
    },
    {
        src: '../../../panorama_image/Seoul2.jpg',
        title: "2"
    },
    {
        src: '../../../panorama_image/Seoul3.jpg',
        title: "3"
    },
    {
        src: '../../../panorama_image/Seoul4.jpg',
        title: "4"
    },
];
const images_suwon = [
    {
        src: '../../../panorama_image/Suwon1.jpg',
        title: "1"
    },
    {
        src: '../../../panorama_image/Suwon2.jpg',
        title: "2"
    },
    {
        src: '../../../panorama_image/Suwon3.jpg',
        title: "3"
    },
    {
        src: '../../../panorama_image/suwon5.jpg',
        title: "4"
    },
];
const images_ulleung = [
    {
        src: '../../../panorama_image/Ulleung2.jpg',
        title: "1"
    },
    {
        src: '../../../panorama_image/Ulleung1.jpg',
        title: "2"
    },
    {
        src: '../../../panorama_image/Ulleung3.jpg',
        title: "3"
    },
    {
        src: '../../../panorama_image/Ulleung4.jpg',
        title: "4"
    },
];
const images_yeosu = [
    {
        src: '../../../panorama_image/Yeosu3.jpg',
        title: "1"
    },
    {
        src: '../../../panorama_image/Yeosu2.jpg',
        title: "2"
    },
    {
        src: '../../../panorama_image/Yeosu1.jpg',
        title: "3"
    },
    {
        src: '../../../city_image/.jpg',
        title: "4"
    },
];


const RecommendCorp = ({num}) => {
    console.log("num : "+num);
    // 5. custom arrows를 만들어 ref를 통해 제어합니다.
    const slickRef = useRef(null);

   // 6. slick에 추가할 세팅입니다.
    const settings = {
        dots: true,
        // 5. custom arrows를 만들기 위해 기본 arrows옵션을 false로 합니다.
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        
        // 2. custom pagination을 만듭니다.
        // i(index)를 통해 샘플이미지에서 동일한 이미지를 가져옵니다.
        // customPaging: function(i) {
        //     const imgSrc = images[i].src;
        //     return (
        //         <PagingAnchor className='slick-active'>
        //                 <button type='button'>::before i</button>
        //         </PagingAnchor>
        //     );
        // },
    };
    
   // 5. custom arrows 동작 함수를 만듭니다.
    const previous = useCallback(() => slickRef.current.slickPrev(), []);
    const next = useCallback(() => slickRef.current.slickNext(), []);

    
    
    return (
        <div className='container'>
            <Wrap>
         

         <Slick className='cityinfo-mainimage'
            ref={slickRef} {...settings}>
            

                {
                    num == 136 ? 
                    images_andong.map((v, i) => {
                        return (
                            <SlickItems key={`${v.title}_${i}`} id="slick-box">
                                <img alt='' className='slick-image' src={v.src} />
                            </SlickItems>
                        )
                    })
                    :
                    num == 159 ?
                    images_busan.map((v, i) => {
                        return (
                            <SlickItems key={`${v.title}_${i}`} id="slick-box">
                                <img alt='' className='slick-image' src={v.src} />
                            </SlickItems>
                        )
                    })
                    :
                    num == 101 ?
                    images_chuncheon.map((v, i) => {
                        return (
                            <SlickItems key={`${v.title}_${i}`} id="slick-box">
                                <img alt='' className='slick-image' src={v.src} />
                            </SlickItems>
                        )
                    })
                    :
                    num == 133 ?
                    images_daejeon.map((v, i) => {
                        return (
                            <SlickItems key={`${v.title}_${i}`} id="slick-box">
                                <img alt='' className='slick-image' src={v.src} />
                            </SlickItems>
                        )
                    })
                    :
                    num == 105 ?
                    images_gangneung.map((v, i) => {
                        return (
                            <SlickItems key={`${v.title}_${i}`} id="slick-box">
                                <img alt='' className='slick-image' src={v.src} />
                            </SlickItems>
                        )
                    })
                    :
                    num == 140 ?
                    images_gunsan.map((v, i) => {
                        return (
                            <SlickItems key={`${v.title}_${i}`} id="slick-box">
                                <img alt='' className='slick-image' src={v.src} />
                            </SlickItems>
                        )
                    })
                    :
                    num == 283 ?
                    images_gyeongju.map((v, i) => {
                        return (
                            <SlickItems key={`${v.title}_${i}`} id="slick-box">
                                <img alt='' className='slick-image' src={v.src} />
                            </SlickItems>
                        )
                    })
                    :
                    num == 201 ?
                    images_incheon.map((v, i) => {
                        return (
                            <SlickItems key={`${v.title}_${i}`} id="slick-box">
                                <img alt='' className='slick-image' src={v.src} />
                            </SlickItems>
                        )
                    })
                    :
                    num == 221 ?
                    images_jecheon.map((v, i) => {
                        return (
                            <SlickItems key={`${v.title}_${i}`} id="slick-box">
                                <img alt='' className='slick-image' src={v.src} />
                            </SlickItems>
                        )
                    })
                    :
                    num == 184 ?
                    images_jeju.map((v, i) => {
                        return (
                            <SlickItems key={`${v.title}_${i}`} id="slick-box">
                                <img alt='' className='slick-image' src={v.src} />
                            </SlickItems>
                        )
                    })
                    :
                    num == 146 ?
                    images_jeonju.map((v, i) => {
                        return (
                            <SlickItems key={`${v.title}_${i}`} id="slick-box">
                                <img alt='' className='slick-image' src={v.src} />
                            </SlickItems>
                        )
                    })
                    :
                    num == 247 ?
                    images_namwon.map((v, i) => {
                        return (
                            <SlickItems key={`${v.title}_${i}`} id="slick-box">
                                <img alt='' className='slick-image' src={v.src} />
                            </SlickItems>
                        )
                    })
                    :
                    num == 108 ?
                    images_seoul.map((v, i) => {
                        return (
                            <SlickItems key={`${v.title}_${i}`} id="slick-box">
                                <img alt='' className='slick-image' src={v.src} />
                            </SlickItems>
                        )
                    })
                    :
                    num == 119 ?
                    images_suwon.map((v, i) => {
                        return (
                            <SlickItems key={`${v.title}_${i}`} id="slick-box">
                                <img alt='' className='slick-image' src={v.src} />
                            </SlickItems>
                        )
                    })
                    :
                    num == 115 ?
                    images_ulleung.map((v, i) => {
                        return (
                            <SlickItems key={`${v.title}_${i}`} id="slick-box">
                                <img alt='' className='slick-image' src={v.src} />
                            </SlickItems>
                        )
                    })
                    :
                    images_yeosu.map((v, i) => {
                        return (
                            <SlickItems key={`${v.title}_${i}`} id="slick-box">
                                <img alt='' className='slick-image' src={v.src} />
                            </SlickItems>
                        )
                    })
                }
            </Slick>
            <>
                <PrevButton onClick={previous}>
                    <span className="hidden" class="material-symbols-outlined">arrow_back_ios</span>
                </PrevButton>

                <NextButton onClick={next}>
                    <span className="hidden" class="material-symbols-outlined">arrow_forward_ios</span>            
                </NextButton>
            </>
        </Wrap>

        </div>
    );
};

export default RecommendCorp;