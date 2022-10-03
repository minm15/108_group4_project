import * as React from 'react';
import Box from '@mui/material/Box';
import  Grid from '@mui/material/Grid';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import {
  Button,Chip
} from '@mui/material';

import {
 
  ExpandLess, ExpandMore,WorkOutline,PermContactCalendar,Sell,
 KeyboardCapslock, DashboardCustomize,Rocket,WorkspacePremium,Lightbulb,Gite
} from "@mui/icons-material";
import { Divider } from '@mui/material';

export default function Modal_Info({ company_ID,name,company_type,productList,finanData,cooperateList,}) { 



    return (
      <Box sx={{ display: 'flex'}}>
     
     <Box sx={{ flexGrow: 1 }}>
     <Typography sx={{ fontSize: 24 ,fontWeight:"bold"}}  >
     {company_ID}-{name} 
     <Chip label={company_type} sx={{ bgcolor: "#1976D2", color: "white",fontSize:10,height:'18px' }} />

        </Typography>

     <Grid container spacing={2}>
       <Grid item xs={6} > 
       <h3>&emsp;公司資訊</h3>
      <b>產品列表：{productList} (此行只是放來測試篩選功能用的)　</b> <br></br>
       <br></br>
       不知道這個欄位要放什麼
       這裡是Other_Modal_Info.js的44行<br></br>    
        <br></br>

  
       <FinanState finanData={finanData}/>
       </Grid>
       <Grid item xs={6} > 
      
      <Cooperate cooperateList={cooperateList}/>  
       </Grid>
 
         
     </Grid>
   </Box>
   </Box>
  );
}

const Cooperate = ({ cooperateList }) => {
  return (
   <Box sx={{overflowY: "scroll"}}>
 <h3>&emsp;上次合作對象</h3>

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
   </Box>

  );
};


const FinanState= ({finanData }) => {
  function transfer(name) {
    var chinese="";
    if(name=="income"){chinese="收入"}
    if(name=="expense"){chinese="支出"}
    if(name=="revenue"){chinese="利潤"}

    return chinese;
  }  return (
    <>
<h3>&emsp;本月財務狀況</h3>  


      <Table size="small">
  
          <TableBody>
          {finanData.map((row, index) => (
              <TableRow >
                <TableCell >{transfer(row.name)}</TableCell>
                <TableCell >
                {row.amount}
                </TableCell>
             
              </TableRow>
            ))}
          </TableBody>
        <small> &emsp; 單位:100萬</small>
        </Table>
   </>
     );
    };
    