import * as React from 'react';
import {
  Button
} from '@mui/material';


import './css/LinkToHome.css';

import {
 WorkOutline,KeyboardDoubleArrowRight
 } from "@mui/icons-material";

function Company_LinkToHome() {

 
 

    return (
      <>
 
  

    <div className='company'>
            <Button href="/Company_Info" onClick={()=>{} }sx={{color:"black",fontWeight:"bold",fontSize:"20px",width:'120px'}}  >
              <WorkOutline style={{fontSize:"36px"}}/>公司<KeyboardDoubleArrowRight  /></Button>
    
            </div>


          
    </>
  
  );
}
export default Company_LinkToHome;