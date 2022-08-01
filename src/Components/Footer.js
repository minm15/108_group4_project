// src\Components\Header.js  
import React, { useState } from 'react'
import { useNavigate ,BrowserRouter,Routes} from "react-router-dom";
import {
    Box, Paper, Grid, useTheme, Typography, MobileStepper, Button,ButtonGroup
} from '@mui/material';
import {
    Person, MarkEmailUnread, ForwardToInbox, Build,  Anchor,Balance,KeyboardArrowLeft,KeyboardArrowRight,KeyboardDoubleArrowRight
,Settings,WorkOutline,Email,Campaign,Link,SouthEast,Apps,ChatBubbleOutline,Clear} from "@mui/icons-material";

import Container from '@mui/material/Container';
 import './HeaderFooter.css';
//import { autoPlay } from 'react-swipeable-views-utils';
const homeLink="http://localhost:3000"


function Footer() {
  const [leftshow, setleftshow] = useState(false);
  const [rightshow, setrightshow] = useState(false);
  const [rightshow2, setrightshow2] = useState(false);
  return (
    <>
      <div className={'footer'}>
      <div className='leftbox'>{
                leftshow === false ?
                    <ChatBubbleOutline onClick={
                        () => {
                            setleftshow(true)
                        }
                    } />
                    :
                    <div>
                    
                        <img alt='' src='https://picsum.photos/id/870/200/350'></img>
                             <Clear onClick={
                                () => {
                                    setleftshow(false)
                                }
                            } />
                    </div>
            }

            </div>
            <div className='rightbox'>
                {
                    rightshow === false ?
                        <Apps onClick={
                            () => {
                                setrightshow(true)
                            }
                        } />
                        :
                        <div>
                            

                            {/* <ButtonGroup variant="text" size="large" className='rightline' aria-label="outlined primary button group"> */}
                                <Button style={{color:"black",fontSize: "14px",fontFamily: 'Noto Sans TC'}}><WorkOutline/>公司</Button>
                                <Button href={homeLink+"/letter_list"} onClick={()=>{} } style={{color:"black",fontSize: "14px",fontFamily: 'Noto Sans TC'}}><Email/>信箱</Button>
                                <Button href={homeLink+"/manufactory"} onClick={()=>{} } style={{color:"black",fontSize: "14px",fontFamily: 'Noto Sans TC'}}><Build/>工廠</Button>
                                <Button style={{color:"black",fontSize: "14px",fontFamily: 'Noto Sans TC'}}><Anchor/>港口</Button>
                                <Button style={{color:"black",fontSize: "14px",fontFamily: 'Noto Sans TC'}}><Campaign/>新聞</Button>
                                <Button style={{color:"black",fontSize: "14px",fontFamily: 'Noto Sans TC'}}><Link/>區塊鏈</Button>
                            {/* </ButtonGroup> */}
                          
                            <SouthEast onClick={
                                () => {
                                    setrightshow(false)
                                }
                            } />
                        </div>
                }

            </div>
            </div>
    </>
  )
}

export default Footer

