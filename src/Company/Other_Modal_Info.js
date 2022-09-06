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

export default function Modal_Info({ company_ID,name }) { //姑且先傳了ID跟名字過來



    return (
      <Box sx={{ display: 'flex'}}>
     
     <Box sx={{ flexGrow: 1 }}>
     <Typography sx={{ fontSize: 24 ,fontWeight:"bold"}}  >
     公司名稱:{name}
        </Typography>
     <Grid container spacing={2}>
       <Grid item xs={6} sx={{height:250}}> 
       <Typography sx={{ fontSize: 24 }}  >公司資訊        </Typography>    

         ID:{company_ID}
          <br/>
        {/* 測試:{name1} */}
        三頁Modal中的內容均未完成
       </Grid>
       <Grid item xs={6} sx={{height:250}}> 
      
       <Typography sx={{ fontSize: 24 }}  >財務報表        </Typography>    
       </Grid>
      <Grid item xs={12}>
      <Typography sx={{ fontSize: 24 }}  >上次合作對象        </Typography>   
      <table cellspacing="0" cellpadding="0" >

<tbody>
<tr>
<td valign="top" >Takodachi汽車</td>
<td valign="top" > <Chip label="製造" sx={{ bgcolor: "#1976D2", color: "white",fontSize:10,height:'18px' }} /></td>
</tr>

<tr>
<td valign="top" >Takodachi汽車</td>
<td valign="top" > <Chip label="製造" sx={{ bgcolor: "#1976D2", color: "white",fontSize:10,height:'18px' }} /></td>
</tr>
</tbody>
</table> 
      </Grid>
         
     </Grid>
   </Box>
   </Box>
  );
}
