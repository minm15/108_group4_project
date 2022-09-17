import React, { useState } from 'react'
import {
     Button,Chip,IconButton
} from '@mui/material';

import {
    Person, MarkEmailUnread, ForwardToInbox, Build,  Anchor,Balance,KeyboardArrowLeft,KeyboardArrowRight,KeyboardDoubleArrowRight
,SettingsOutlined,Campaign,CottageOutlined, FlashOffTwoTone} from "@mui/icons-material";


import { Swiper, SwiperSlide } from 'swiper/react';
import {  Autoplay } from 'swiper';
import 'swiper/css';
import './HeaderFooter.css';
import myCompany from './myCompany';



const homeLink="http://localhost:3000"
function Header() {

  const [rightshow2, setrightshow2] = useState(false);

  
  return (
    <>
      <div className={'header'}>
      <div className='topline'>
                <div className='info'>
                    
                    <p className='fn-clear'>
                
                       <span className='fl'> <Person /> {myCompany[0].name}</span>
               
                        <span  className='fr1'><Chip label={myCompany[0].company_type} sx={{ bgcolor: "#E4513D", color: "white" }} /></span>
                        <span  className='fr2'>&emsp; {myCompany[0].company_asset}</span> 
                    </p>
                   
                </div>
                
            </div>
   
      <div className='right'>
                {
                    rightshow2 === false ?
                    <div className="rightBtn1">

                     <Button onClick={()=>{setrightshow2(true)} }style={{color:"white"}} ><KeyboardArrowRight style={{fontSize:"36px"}} /></Button> 
                    </div>
                        
                        :
                        <div>
                             {/* <Button onClick={()=>{setrightshow2(false)} }style={{color:"gray"}} ><SettingsOutlined style={{fontSize:"36px"}} /></Button>  */}

                          
                               
                                <Button href={homeLink+"/letter_list"} onClick={()=>{} }style={{color:"white",fontSize: "22px",fontFamily: 'Noto Sans TC'}} 
                               ><MarkEmailUnread/>獲取訂單</Button>
                                <KeyboardDoubleArrowRight/>
                                <Button href={homeLink+"/letter_list"} onClick={()=>{} } style={{color:"white",fontSize: "22px",fontFamily: 'Noto Sans TC'}} ><ForwardToInbox/>下定材料</Button>
                                <KeyboardDoubleArrowRight/>
                                <Button href={homeLink+"/manufactory"} onClick={()=>{} }style={{color:"white",fontSize: "22px",fontFamily: 'Noto Sans TC'}}><Build/>&emsp;製造&emsp;</Button>
                                <KeyboardDoubleArrowRight/>
                                <Button style={{color:"white",fontSize: "22px",fontFamily: 'Noto Sans TC'}}><Anchor/>交付貨品</Button>
                                <KeyboardDoubleArrowRight/>
                                <Button style={{color:"white",fontSize: "22px",fontFamily: 'Noto Sans TC'}}><Balance/>履行契約</Button>
                                <Button onClick={()=>{setrightshow2(false)} }style={{color:"white"}} ><KeyboardArrowLeft style={{fontSize:"36px",}} /></Button> 

                        </div>
                       

                }
              
              </div>
            <div className='set'>
      <Button  onClick={()=>{} }style={{color:"white"}} ><SettingsOutlined style={{fontSize:"36px"}} /></Button> 


            </div>
            <div className='home'>
            <Button href={homeLink} onClick={()=>{} }style={{color:"black",zIndex:'30'}} ><CottageOutlined style={{fontSize:"36px"}}/></Button>


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
