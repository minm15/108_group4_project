// src\Components\Header.js  
import React, { useState } from 'react'
import { useNavigate,BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
    Box, Paper, Grid, useTheme, Typography, MobileStepper, Button,ButtonGroup
} from '@mui/material';
import {
    Person, MarkEmailUnread, ForwardToInbox, Build,  Anchor,Balance,KeyboardArrowLeft,KeyboardArrowRight,KeyboardDoubleArrowRight
,Settings} from "@mui/icons-material";
import LetterGrid from "../Letter/letter_grid";
import LetterReceive from "../Letter/letter_receive";
import LetterWriting from "../Letter/letter_writing";
import Manufactor from "../manufactor/mf_list";

import Container from '@mui/material/Container';
 import './HeaderFooter.css';
//import SwipeableViews from 'react-swipeable-views';
//import { autoPlay } from 'react-swipeable-views-utils';
var co_name = "Wah汽車材料"; //公司名稱
var co_asset = "$25萬元"; //公司資產
var co_type = "供應"; //公司類型

//const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
function Header() {
  const [leftshow, setleftshow] = useState(false);
  const [rightshow, setrightshow] = useState(false);
  const [rightshow2, setrightshow2] = useState(false);
  const handleLinkClick = event => {
    console.log('Link clicked');

    // 👇️ refers to the link element
    console.log(event.currentTarget);
  };
  return (
    <>
      <div className={'header'}>
      <div className='topline'>
                <div className='info'>
                    
                    <p className='fn-clear'>
                
                       <span className='fl'> <Person /> {co_name}</span>
               
                        <span  className='fr1'>{co_type}</span>
                        <span  className='fr2'>&emsp; {co_asset}</span>
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
                      

                                <Button href="letter_list" onClick={()=>{} }style={{color:"white",fontSize: "22px",fontFamily: 'Noto Sans TC'}} 
                               ><MarkEmailUnread/>獲取訂單&emsp;</Button>
                                <KeyboardDoubleArrowRight/>
                                <Button href="letter_list" onClick={()=>{} } style={{color:"white",fontSize: "22px",fontFamily: 'Noto Sans TC'}} ><ForwardToInbox/>下定材料&emsp;</Button>
                                <KeyboardDoubleArrowRight/>
                                <Button href="manufactory" onClick={()=>{} }style={{color:"white",fontSize: "22px",fontFamily: 'Noto Sans TC'}}><Build/>&emsp;&emsp;製造&emsp;&emsp;</Button>
                                <KeyboardDoubleArrowRight/>
                                <Button style={{color:"white",fontSize: "22px",fontFamily: 'Noto Sans TC'}}><Anchor/>交付貨品&emsp;</Button>
                                <KeyboardDoubleArrowRight/>
                                <Button style={{color:"white",fontSize: "22px",fontFamily: 'Noto Sans TC'}}><Balance/>履行契約</Button>
                               
    
                        </div>
                       

                }
              
              </div>
            <div className='set'>
            <Settings/>     

            </div>
           
            {/* <div className='scrollbox'>
                <AutoPlaySwipeableViews
                    interval={5000}
                // autoPlay={true}
                >
                    <div className='txt'>大排長榮!因貨櫃船卡住蘇伊士運河，導致貨品運送時間成本增加，若改其他航道，將花費更多運送成本</div>
                    <div className='txt'>跑馬燈2</div>
                    <div className='txt'>跑馬燈3</div>
                </AutoPlaySwipeableViews>
            </div> */}
            </div>
    </>
  )
}

export default Header

