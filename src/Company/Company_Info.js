import * as React from 'react';
import Box from '@mui/material/Box';
import  Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {
    BarChart,
    Bar,
    Label,
    LabelList
  } from "recharts";
  import {
    Button,Chip
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CompanyDrawer from './Drawer';
import cooperateList from  './data/cooperateList'
import {levelList,list1,list2,list3,list4,list5} from './data/serviceList.js'; 
import {warehouseSpace,good,ingredient} from './data/warehouseData.js';
import myCompany from './data/myCompany.js'

import './css/Company_Info.css';

import {
  KeyboardCapslock, DashboardCustomize,Rocket,WorkspacePremium,Lightbulb,Gite
 ,KeyboardDoubleArrowRight} from "@mui/icons-material";
function Company_Info() {
  
    const renderCustomizedLabel = (props) => {
        const { content, value,...rest } = props;
      
        return <Label {...rest} fontSize="16" fill="#black" fontWeight="bold" textAnchor="middle">{value}</Label>;
      };
  
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(0),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    
      }));
      
    return (
 
    <Box sx={{ display: 'flex', my:'25px',}}>
     <CompanyDrawer/>
     <Box sx={{ flexGrow: 1 ,ml:'25px'}}>
        <div className="companyName">  &ensp;{myCompany[0].name}</div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
        <Stack spacing={2} >
  <Item sx={{        maxHeight:'200px',  overflowY: "scroll",
}}>
  <Cooperate/>   {/* 上次合作 */}


  </Item>
  <Item>

  <Grid container spacing={0}>
        <Grid item xs={2}>
        <DashboardCustomize style={{fontSize:"40px"}}/><br/>
        </Grid>
        <Grid item xs={8}>
            <big><b>倉儲容量</b></big>  <br/>
           {list1[levelList[0]-1].effect}<KeyboardDoubleArrowRight />     {list1[levelList[0]].effect}<br/>
            <b>   <KeyboardCapslock/>升級 </b>            ({list1[levelList[0]].cost})
        </Grid>
        <Grid item xs={2}>
            lv{levelList[0]}
        </Grid>
 </Grid>
   <hr style={{width:"100%"}}></hr>
   <Grid container spacing={0}>
        <Grid item xs={2}>
        <Rocket style={{fontSize:"40px"}}/><br/>
        </Grid>
        <Grid item xs={8}>
            <big><b>生產效率</b></big>  <br/>
            {list2[levelList[1]-1].effect}<KeyboardDoubleArrowRight />     {list2[levelList[1]].effect}<br/>
            <b>   <KeyboardCapslock/>升級 </b>            ({list2[levelList[1]].cost})
        </Grid>
        <Grid item xs={2}>
        lv{levelList[1]}
        </Grid>
 </Grid>
  </Item>
</Stack>
        </Grid>
        <Grid item xs={4}>
        <Stack spacing={8}>
  <Item>
  <FinanState/>  {/* 財務報表 */}

  </Item>
  <Item>

  <Grid container spacing={0}>
        <Grid item xs={2}>
        <WorkspacePremium style={{fontSize:"40px"}}/><br/>

             </Grid>
            <Grid item xs={8}>
            <big><b>品質控管</b></big>  <br/>
            {list3[levelList[2]-1].effect}<KeyboardDoubleArrowRight />     {list3[levelList[2]].effect}<br/>
            <b>   <KeyboardCapslock/>升級 </b>            ({list3[levelList[2]].cost})
            </Grid>
            <Grid item xs={2}>
            lv{levelList[2]}
            </Grid>
            </Grid>
            <hr style={{width:"100%"}}></hr>

            <Grid container spacing={0}>
        <Grid item xs={2}>
        <Lightbulb style={{fontSize:"40px"}}/><br/>

             </Grid>
            <Grid item xs={8}>
            <big><b>商品研發</b></big>  <br/>
            {list4[levelList[3]-1].effect}<KeyboardDoubleArrowRight />     {list4[levelList[3]].effect}<br/>
            <b>   <KeyboardCapslock/>升級 </b>            ({list4[levelList[3]].cost})
            </Grid>
            <Grid item xs={2}>
            lv{levelList[3]}
            </Grid>
            </Grid>
            <hr style={{width:"100%"}}></hr>

            <Grid container spacing={0}>
        <Grid item xs={2}>
        <Gite style={{fontSize:"40px"}}/><br/>

             </Grid>
            <Grid item xs={8}>
            <big><b>工廠規模</b></big>  <br/>
            {list5[levelList[4]-1].effect}<KeyboardDoubleArrowRight />     {list5[levelList[4]].effect}<br/>
            <b>   <KeyboardCapslock/>升級 </b>            ({list5[levelList[4]].cost})
            </Grid>
            <Grid item xs={2}>
            lv{levelList[4]}
            </Grid>
            </Grid>

  </Item>
</Stack>
        </Grid>
        <Grid item xs={4}>
          {/* 倉庫的空間 */}
        <BarChart width={250} height={500} data={warehouseSpace}   stackOffset="expand">
    
    <Bar dataKey="ingredient" fill="#E4513D" stackId="a"  >
    <LabelList position="insideLeft" fontWeight="bold" offset={70} >材料：&emsp;&emsp;%</LabelList>

        <LabelList
            dataKey="ingredient"
            position="insideRight"
            offset={55}
            content={renderCustomizedLabel}

          />

        </Bar>
        <Bar dataKey="good" fill="#F0A196" stackId="a"  >
        <LabelList position="insideLeft" fontWeight="bold" offset={70}>成品：&emsp;&emsp;%</LabelList>

        <LabelList
            dataKey="good"
            position="insideRight"
            offset={55}
            content={renderCustomizedLabel}
          />

        </Bar>
     
        
    <Bar dataKey="empty" fill="#F6C9C3" stackId="a">
        <LabelList position="insideLeft" fontWeight="bold" offset={50}>空間位置：&emsp;&emsp;%</LabelList>
        
        <LabelList
            dataKey="empty"
            position="insideRight"
            offset={45}
            content={renderCustomizedLabel}
          ></LabelList> 

        </Bar>
    </BarChart>        </Grid>
        </Grid>
    </Box>
    </Box>

  );
}
export default Company_Info;


const Cooperate = ({  }) => {
  return (
   <>
 <h2>&emsp;上次合作</h2>

      <Table size="small">
  
          <TableBody>
            {cooperateList.map((row, index) => (
              <TableRow >
                <TableCell >{row.name}</TableCell>
                <TableCell >

                <Chip label={row.company_type} sx={{ bgcolor: "#1976D2", color: "white",fontSize:10,height:'18px' }} />
                </TableCell>
             
              </TableRow>
            ))}
          </TableBody>
        </Table>
   </>

  );
};

const FinanState= ({  }) => {
  return (
   <>
  <table cellspacing="0" cellpadding="0" >
        <caption> 財務報表 </caption>

<tbody>
<tr>
<td valign="top" ><b>數值名稱</b></td>
<td valign="top" > <b>本公司</b></td>
<td valign="top" > <b>同產業平均</b></td>
</tr>

<tr>
<td valign="top" >本益比</td>
<td valign="top" > 0</td>
<td valign="top" >0 </td>
</tr>

<tr>
<td valign="top" >毛利率</td>
<td valign="top" > 0</td>
<td valign="top" >0 </td>
</tr>

<tr>
<td valign="top" >ROE</td>
<td valign="top" > 0</td>
<td valign="top" >0 </td>
</tr>

<tr>
<td valign="top" >存貨周轉率</td>
<td valign="top" > 0</td>
<td valign="top" >0 </td>
</tr>

</tbody>
</table>

   </>

  );
};

