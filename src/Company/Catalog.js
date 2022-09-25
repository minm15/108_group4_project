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

function Catalog() {
  const [list, setList] = useState(catalogList);


   
    return (
    <Box sx={{ display: 'flex', my:'25px',}}>
     <CompanyDrawer/>

     <Box sx={{ flexGrow: 1 ,ml:'25px'}}>
    

   <Grid container spacing={1}>

   {list.map((row, index) => (
              <Grid item xs={4}>

      <ListItem key={row.id} item={row} />
      </Grid>
    ))}
 </Grid>
    </Box>
</Box>
  );
}
export default Catalog;

const ListItem = ({
  item: {id,product_name, product_price,product_type,product_level,product_desc },
}) => (
     <Card variant="outlined" sx={{width:250,height:200}}>
        <CardHeader
        action={
          <>
     
         </>
            } 
            title={product_name} />
                <div align="center">價錢 {product_price}</div>
                <div align="center" >{product_type}</div>
                <div align="center" >{product_level}</div>
                <div align="center" >{product_desc}</div>



              </Card>
  
);
