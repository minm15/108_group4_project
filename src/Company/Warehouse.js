import * as React from 'react';
import Box from '@mui/material/Box';
import  Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import {
    BarChart,
    Bar,

    Label,
    LabelList
  } from "recharts";
  
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import CompanyDrawer from './Drawer';

import { warehouseSpace,good,ingredient } from './data/warehouseData.js';

function Company_Warehouse() {
 

    const renderCustomizedLabel = (props) => {
        const { content, value,...rest } = props;
      
        return <Label {...rest} fontSize="16" fill="#black" fontWeight="bold" textAnchor="middle">{value}</Label>;
      };
   
    return (
    <Box sx={{ display: 'flex', my:'25px',}}>
     <CompanyDrawer/>
    
     <Box sx={{ flexGrow: 1 ,ml:'25px'}}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
        <BarChart width={300} height={500} data={warehouseSpace}   stackOffset="expand">
    
        <Bar dataKey="ingredient" fill="#E4513D" stackId="a"  >
        <LabelList position="insideLeft" fontWeight="bold" offset={70} >材料：&emsp;&emsp;%</LabelList>

            <LabelList
                dataKey="ingredient"
                position="insideRight"
                offset={90}
                content={renderCustomizedLabel}

              />

            </Bar>
            <Bar dataKey="good" fill="#F0A196" stackId="a"  >
            <LabelList position="insideLeft" fontWeight="bold" offset={70}>成品：&emsp;&emsp;%</LabelList>

            <LabelList
                dataKey="good"
                position="insideRight"
                offset={90}
                content={renderCustomizedLabel}
              />

            </Bar>
         
            
        <Bar dataKey="empty" fill="#F6C9C3" stackId="a">
            <LabelList position="insideLeft" fontWeight="bold" offset={50}>空間位置：&emsp;&emsp;%</LabelList>
            
            <LabelList
                dataKey="empty"
                position="insideRight"
                offset={80}
                content={renderCustomizedLabel}
              ></LabelList> 

            </Bar>
        </BarChart>
</Grid>
<Grid item xs={4}>
<Typography
          sx={{ flex: '1 1 100%' }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          商品( {warehouseSpace[0].good} %)
        </Typography>
<Table>
          <TableHead>
            <TableRow>
              <TableCell  align="center">商品名稱</TableCell>
              <TableCell align="center">等級</TableCell>
              <TableCell align="center">數量</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {good.map((row, index) => (
              <TableRow >
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center" >{row.rank}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
             
              </TableRow>
            ))}
          </TableBody>
        </Table>
 
    </Grid>
        <Grid item xs={4}>
       
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          材料( {warehouseSpace[0].ingredient} %)
        </Typography>
<Table>
          <TableHead>
            <TableRow>
              <TableCell  align="center">材料名稱</TableCell>
              <TableCell align="center">等級</TableCell>
              <TableCell align="center">數量</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredient.map((row, index) => (
              <TableRow >
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center" >{row.rank}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
             
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Grid>
    
      </Grid>
    </Box>
    </Box>

  );
}
export default Company_Warehouse;