import React, { useState } from 'react';
import Box from '@mui/material/Box';
import  Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import CardHeader from '@mui/material/CardHeader';
import catalogList from "./data/catalogList.js"
import CompanyDrawer from './Drawer';

import {
 
  ExpandLess, ExpandMore,WorkOutline,PermContactCalendar,Sell,
 KeyboardCapslock, DashboardCustomize,Rocket,WorkspacePremium,Lightbulb,Gite
} from "@mui/icons-material";
import { Divider } from '@mui/material';

export default function Modal_Product({ company_ID,name }) { //姑且先傳了ID跟名字過來
  

    return (

      <Box sx={{ display: 'flex'}}>
     
     <Box sx={{ flexGrow: 1 }}>
     <Typography sx={{ fontSize: 24 ,fontWeight:"bold"}}  >
     公司名稱:{name} 
        </Typography>
   {/* <Catalog/> */}
   等目錄頁完成再補上
   </Box>
  
   </Box>
  
  
  );
}
function Catalog() {
  const [list, setList] = useState(catalogList);


   
    return (

    <Box sx={{overflowY: "scroll", maxHeight: "90%"}}>

   <Grid container spacing={1}>

   {list.map((row, index) => (
              <Grid item xs={4}>

      <ListItem key={row.id} item={row} />
      </Grid>
    ))}
 </Grid>
 </Box>
  );
}

const ListItem = ({
  item: {id,product_name, product_price,product_type,product_level,product_desc },
}) => (
     <Card variant="outlined" sx={{width:200,height:200}}>
        <CardHeader
        action={
          <>
     
         </>
            } 
            title={product_name} />
                <div align="center">id: {product_price}</div>
                <div align="center" >{product_type}</div>
                <div align="center" >{product_level}</div>
                <div align="center" >{product_desc}</div>



              </Card>
  
);

