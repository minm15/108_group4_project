import * as React from 'react';
import Box from '@mui/material/Box';
import  Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CompanyDrawer from './Drawer';
// import {income,expense,revenue} from './data/finanData'
import myCompany from './data/myCompany';
import {

  LineChart,

  ResponsiveContainer,

  Legend, Tooltip,

  Line,

  XAxis,

  YAxis,

  CartesianGrid,
  CartesianAxis


} from 'recharts';

import './css/FinanInfo.css'
function Company_FinanInfo() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

    return (
    <Box sx={{ display: 'flex', my:'25px',}}>
      {/* <CssBaseline /> */}
     <CompanyDrawer/>
     
     <Box sx={{ flexGrow: 1 ,ml:'25px'}}>
     <Stack spacing={2}>
  <Item>
     <Grid container spacing={1}>
      <Grid item xs={1.5}>
        <Typography variant="h5" ><b>收入</b></Typography>
       <br/>
      單位(百萬元)</Grid>
     <Grid item xs={10}>

{/* aspect:長寬比 */}
<ResponsiveContainer     height={160} > 

<LineChart data={myCompany[0].income} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>

    <CartesianGrid/>
<CartesianAxis ></CartesianAxis>
    <XAxis dataKey="month" interval={0} tick={{ fontSize: 15 }}
    //  tickFormatter={formatXAxis}
    />
    <YAxis  tick={{ fontSize: 15 }}></YAxis>
    <Tooltip />
    <Line dataKey="amount"  stroke="black" activeDot={{ r: 8 }} />
</LineChart>
</ResponsiveContainer>
</Grid>
</Grid>
</Item>
<Item>
<Grid container spacing={1}>
      <Grid item xs={1.5}>
        <Typography variant="h5" ><b>支出</b></Typography>
       <br/>
      單位(百萬元)</Grid>
     <Grid item xs={10}>

{/* aspect:長寬比 */}
<ResponsiveContainer     height={160} > 

<LineChart data={myCompany[0].expense} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>

    <CartesianGrid/>
<CartesianAxis ></CartesianAxis>
    <XAxis dataKey="month" interval={0} tick={{ fontSize: 15 }}
    //  tickFormatter={formatXAxis}
    />
    <YAxis  tick={{ fontSize: 15 }}></YAxis>
    <Tooltip />
    <Line dataKey="amount"  stroke="black" activeDot={{ r: 8 }} />
</LineChart>
</ResponsiveContainer>
</Grid>
</Grid>
</Item>
<Item>
<Grid container spacing={1}>
      <Grid item xs={1.5}>
        <Typography variant="h5" ><b>利潤</b></Typography>
       <br/>
      單位(百萬元)</Grid>
     <Grid item xs={10}>

{/* aspect:長寬比 */}
<ResponsiveContainer     height={160} > 

<LineChart data={myCompany[0].revenue} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>

    <CartesianGrid/>
<CartesianAxis ></CartesianAxis>
    <XAxis dataKey="month" interval={0} tick={{ fontSize: 15 }}
    //  tickFormatter={formatXAxis}
    />
    <YAxis  tick={{ fontSize: 15 }}></YAxis>
    <Tooltip />
    <Line dataKey="amount"  stroke="black" activeDot={{ r: 8 }} />
</LineChart>
</ResponsiveContainer>
</Grid>
</Grid>
</Item>
</Stack>
    </Box>
    </Box>

  );
}
export default Company_FinanInfo;

function formatXAxis(value) {
  return value.substr(3,)
}