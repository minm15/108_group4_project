import React, { useState } from 'react';
import Box from '@mui/material/Box';
import  Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';

import CompanyDrawer from './Drawer';
import Catalog_Modal from './Catalog_Modal'
// import catalogList from './data/catalogList'
import myCompany from './data/myCompany';


function Catalog2() {
  let nameList=[];

  let priceList=[];
  let typeList=[];
  let descList=[];
  let levelList=[];
  const N=12;
  for( let j=0;j<N+1;j++){
    nameList.push("product_name"+j);
    priceList.push("product_price"+j);
    typeList.push("product_tag"+j);
    descList.push("product_desc"+j);
    levelList.push("product_level"+j);

  }
const arr = Array.from({length:N}, (_, index) => index + 1);


    return (
    <Box sx={{ display: 'flex', my:'25px',}}>
     <CompanyDrawer/>

     <Box sx={{ flexGrow: 1 ,ml:'25px'}}>
      
      <Grid container spacing={1}>
      <Grid item xs={2}>
      <Typography variant="h5" sx={{color:'black',fontWeight: 'bold'}}>
目錄列表
</Typography>      
</Grid>
<Grid item xs={8}>
<Grid container spacing={1}>

{myCompany[0].catalogList.map((row, index) => (
      <Grid item xs={4}>

     <Card variant="outlined" sx={{height:60}}>
     {row.title}
     <Catalog_Modal title={row.title} content={row.content} catalog_id={row.catalog_id}/>
     </Card>
     </Grid>

            ))}   
                   </Grid>

       </Grid>
    
    </Grid>

    </Box>
</Box>
  );
}
export default Catalog2;

