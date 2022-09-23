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
import CompanyDrawer from './Drawer';
import Other_Modal_Catalog_Detail from './Other_Modal_Catalog_Detail'

import {
 
  ExpandLess, ExpandMore,WorkOutline,PermContactCalendar,Sell,
 KeyboardCapslock, DashboardCustomize,Rocket,WorkspacePremium,Lightbulb,Gite
} from "@mui/icons-material";
import { Divider } from '@mui/material';

export default function Modal_Product({ company_ID,name,catalogList}) { //姑且先傳了ID跟名字過來
  

    return (

      <Box sx={{ display: 'flex'}}>
     
     <Box sx={{ flexGrow: 1 }}>
     <Typography sx={{ fontSize: 24 ,fontWeight:"bold"}}  >
     公司名稱:{name} 
        </Typography>
        <Grid container spacing={1}>

        {catalogList.map((row, index) => (
      <Grid item xs={4}>

     <Card variant="outlined" sx={{height:60}}>
     {row.title}
     <Other_Modal_Catalog_Detail title={row.title} content={row.content} catalog_id={row.catalog_id}/>
     </Card>
     </Grid>

            ))}   
            </Grid>      

   </Box>
  
   </Box>

  
  
  );
}
