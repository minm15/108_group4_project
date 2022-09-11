import * as React from 'react';
import Box from '@mui/material/Box';

import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Collapse } from '@mui/material';

import { Link } from "react-router-dom";
import Company_LinkToHome from './LInkToHome';

import {
 
  ExpandLess, ExpandMore,WorkOutline,PermContactCalendar,Sell,
 KeyboardCapslock, DashboardCustomize,Rocket,WorkspacePremium,Lightbulb,Gite,
 WorkRounded,CottageOutlined,KeyboardDoubleArrowRight
 
} from "@mui/icons-material";

function Company_Drawer() {

 
  /*for drawer*/
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);


  const handleClick = () => {
      setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
};


    return (
      <>
   
    <Box sx={{ my:'25px'}}>
      {/* <CssBaseline /> */}
      <Company_LinkToHome/>

      <Drawer
        variant="permanent"
        sx={{
          width: '180px',
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: 
          { width: '180px', boxSizing: 'border-box' ,position:'absolute',
          zIndex:'20'
        },
          
         
        }}
      >
        <Toolbar />
        <Box sx={{ my:'-50px',  }} >
        <List component="nav" >
       
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <WorkRounded />
                </ListItemIcon>
                <ListItemText primary="公司資訊" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open}>
                <List component="div" disablePadding>
                <ListItemButton onClick={handleClick} component={Link} to="/Company_Warehouse">
                    &emsp;&emsp; &emsp;&ensp;  <ListItemText primary="倉庫" />
                    </ListItemButton>
                    <ListItemButton onClick={handleClick} component={Link} to="/Company_Service">
                    &emsp;&emsp; &emsp;&ensp;  <ListItemText primary="設施" />
                    </ListItemButton>
                    <ListItemButton onClick={handleClick} component={Link} to="/Company_FinanInfo">
                    &emsp;&emsp; &emsp;&ensp;  <ListItemText primary="財務資訊" />
                    </ListItemButton>
                  
                </List>
            </Collapse>
            <ListItemButton onClick={handleClick} component={Link} to="/Company_Other">
                <ListItemIcon>
                    <PermContactCalendar />
                </ListItemIcon>
                <ListItemText primary="其他公司" />
            </ListItemButton>
            {/* <ListItemButton  onClick={handleClick} component={Link} to="/Company_Catalog"> 
                <ListItemIcon>
                    <Sell />
                </ListItemIcon>
                <ListItemText primary="商品目錄" />
            </ListItemButton> */}
            </List>
         
            <ListItemButton onClick={handleClick2}>
                <ListItemIcon>
                    <Sell />
                </ListItemIcon>
                <ListItemText primary="商品目錄" />
                {open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open2}>
                <List component="div" disablePadding>
                <ListItemButton onClick={handleClick2} component={Link} to="/Company_Catalog_Add">
                    &emsp;&emsp; &emsp;&ensp;  <ListItemText primary="新增目錄" />
                    </ListItemButton>
                    <ListItemButton onClick={handleClick2} component={Link} to="/Company_Catalog">
                    &emsp;&emsp; &emsp;&ensp;  <ListItemText primary="查看目錄" />
                    </ListItemButton>
                  
                  
                </List>
            </Collapse>

    
        </Box>
      </Drawer>
  
    </Box>

    {/* <div className='company'>
            <Button href="/Company_Info" onClick={()=>{} }sx={{color:"black",fontWeight:"bold",fontSize:"20px"}}  >
              <WorkOutline style={{fontSize:"36px"}}/>公司<KeyboardDoubleArrowRight  /></Button>
    
            </div> */}



          
    </>
  
  );
}
export default Company_Drawer;