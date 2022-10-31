// src\Components\Header.js  
import React, { useState } from 'react'
import {
    Button
} from '@mui/material';
import {
    Build, Anchor, WorkOutline, Email, Campaign, Link, SouthEast, Apps, ChatBubbleOutline, Clear
} from "@mui/icons-material";
import './HeaderFooter.css';
import GameTimer from './timer';
const homeLink = "http://localhost:3000"


function Footer() {
    const [leftshow, setleftshow] = useState(false);
    const [rightshow, setrightshow] = useState(false);
    return (
        <>
            <div className={'footer'}>
                <div className='leftbox'>
                    <GameTimer />
                    {/* {
                        leftshow === false ?
                            <ChatBubbleOutline onClick={
                                () => {
                                    setleftshow(true)
                                }
                            } />
                            :
                            <div className='chatbox' >
                                <Clear onClick={
                                    () => {
                                        setleftshow(false)
                                    }
                                } sx={{ float: 'right' }} />
                                <img alt='' src='https://picsum.photos/id/870/200/350'></img>
                            </div>
                    } */}
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
                                <Button href={homeLink + "/Company_Info"} onClick={() => { }} style={{ color: "black", fontSize: "14px", fontFamily: 'Noto Sans TC' }}><WorkOutline />公司</Button>
                                <Button href={homeLink + "/letter_list"} onClick={() => { }} style={{ color: "black", fontSize: "14px", fontFamily: 'Noto Sans TC' }}><Email />信箱</Button>
                                <Button href={homeLink + "/manufactory"} onClick={() => { }} style={{ color: "black", fontSize: "14px", fontFamily: 'Noto Sans TC' }}><Build />工廠</Button>
                                <Button href={homeLink + "/harbor"} style={{ color: "black", fontSize: "14px", fontFamily: 'Noto Sans TC' }}><Anchor />港口</Button>
                                <Button style={{ color: "black", fontSize: "14px", fontFamily: 'Noto Sans TC' }}><Campaign />新聞</Button>
                                <Button style={{ color: "black", fontSize: "14px", fontFamily: 'Noto Sans TC' }}><Link />區塊鏈</Button>

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

