import React from 'react';
import foot from '../styles/foot.css';

const Foot = () => {
    return (
        <div id='main-footer'>
            <div className='foot-box-wrap'>
                <div className='foot-icons'>
                    <img src='' alt='' />
                    <img src='' alt='' />
                    <img src='' alt='' />
                    <img src='' alt='' />
                </div>
                <div className='foot-text-1'>
                    <h7 className='text-1-1'>
                        이용약관
                    </h7>
                    <h7 className='text-1-2'>
                        개인정보처리방침
                    </h7>
                </div>
                <div className='foot-text-2'>
                    2
                </div>
                <div className='foot-text-3'>
                    3
                </div>
            </div>
        </div>
    );
};

export default Foot;