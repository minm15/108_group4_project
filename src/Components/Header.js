import React, { useState } from 'react'
import {
     Button,Chip
} from '@mui/material';

import {
    Person, MarkEmailUnread, ForwardToInbox, Build,  Anchor,Balance,KeyboardArrowLeft,KeyboardArrowRight,KeyboardDoubleArrowRight
,Settings,Campaign} from "@mui/icons-material";

// import LetterGrid from "../Letter/letter_grid";
// import LetterReceive from "../Letter/letter_receive";
// import LetterWriting from "../Letter/letter_writing";
// import Manufactor from "../manufactor/mf_list";
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Autoplay } from 'swiper';
import 'swiper/css';
import './HeaderFooter.css';


// import SwipeableViews from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';
// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
var name = "Wah汽車材料"; //公司名稱
var company_asset = "$25萬元"; //公司資產
var company_type = "供應"; //公司類型
const homeLink="http://localhost:3000"
function Header() {
  const [rightshow2, setrightshow2] = useState(false);

  return (
    <>
      <div className={'header'}>
      <div className='topline'>
                <div className='info'>
                    
                    <p className='fn-clear'>
                
                       <span className='fl'> <Person /> {name}</span>
               
                        <span  className='fr1'><Chip label={company_type} sx={{ bgcolor: "#E4513D", color: "white" }} /></span>
                        <span  className='fr2'>&emsp; {company_asset}</span> 
                    </p>
                   
                </div>
                
            </div>
   
      <div className='right'>
                {
                    rightshow2 === true ?
                    
                        <KeyboardArrowLeft onClick={
                            () => {
                                setrightshow2(false)
                            }
                        } />
                        
                        :
                        <div>
                             <KeyboardArrowRight onClick={
                                () => { 
                                    setrightshow2(true)
                                }
                            } />

                               
                                <Button href={homeLink+"/letter_list"} onClick={()=>{} }style={{color:"white",fontSize: "22px",fontFamily: 'Noto Sans TC'}} 
                               ><MarkEmailUnread/>獲取訂單&emsp;</Button>
                                <KeyboardDoubleArrowRight/>
                                <Button href={homeLink+"/letter_list"} onClick={()=>{} } style={{color:"white",fontSize: "22px",fontFamily: 'Noto Sans TC'}} ><ForwardToInbox/>下定材料&emsp;</Button>
                                <KeyboardDoubleArrowRight/>
                                <Button href={homeLink+"/manufactory"} onClick={()=>{} }style={{color:"white",fontSize: "22px",fontFamily: 'Noto Sans TC'}}><Build/>&emsp;&emsp;製造&emsp;&emsp;</Button>
                                <KeyboardDoubleArrowRight/>
                                <Button href={homeLink+"/harbor"} style={{color:"white",fontSize: "22px",fontFamily: 'Noto Sans TC'}}><Anchor/>交付貨品&emsp;</Button>
                                <KeyboardDoubleArrowRight/>
                                <Button href={homeLink+"/harbor"} style={{color:"white",fontSize: "22px",fontFamily: 'Noto Sans TC'}}><Balance/>履行契約</Button>
                               
    
                        </div>
                       

                }
              
              </div>
            <div className='set'>
            <Button href={homeLink} onClick={()=>{} }style={{color:"white",fontSize: "22px"}}><Settings/></Button>


            </div>
           
            <div className='scrollbox'>
                {/* <AutoPlaySwipeableViews
                    interval={5000}
                // autoPlay={true}
                >
                    <div className='txt'><Campaign style={{ fontSize: 13 }} />大排長榮!因貨櫃船卡住蘇伊士運河，導致貨品運送時間成本增加，若改其他航道，將花費更多運送成本</div>
                    <div className='txt'><Campaign style={{ fontSize: 13 }} />跑馬燈2 目前是設置5000毫秒(5秒)換一次</div>
                    <div className='txt'><Campaign style={{ fontSize: 13 }} />跑馬燈3</div>
                </AutoPlaySwipeableViews> */}

                <Swiper
        modules={[ Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
    >
      <SwiperSlide><Campaign style={{ fontSize: 13 }} />大排長榮!因貨櫃船卡住蘇伊士運河，導致貨品運送時間成本增加，若改其他航道，將花費更多運送成本</SwiperSlide>
      <SwiperSlide><Campaign style={{ fontSize: 13 }} />跑馬燈2 目前是設置5000毫秒(5秒)換一次</SwiperSlide>
      <SwiperSlide><Campaign style={{ fontSize: 13 }} />跑馬燈3</SwiperSlide>
      <SwiperSlide><Campaign style={{ fontSize: 13 }} />跑馬燈4</SwiperSlide>
    </Swiper>
            </div>
            </div>
    </>
  )
}

export default Header

