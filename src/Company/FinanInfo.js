import * as React from 'react';
import Box from '@mui/material/Box';
import  Grid from '@mui/material/Grid';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CompanyDrawer from './Drawer';


import './css/FinanInfo.css'
function Company_FinanInfo() {



    return (
    <Box sx={{ display: 'flex', my:'25px',}}>
      {/* <CssBaseline /> */}
     <CompanyDrawer/>
     
     <Box sx={{ flexGrow: 1 ,ml:'25px'}}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
        <table  cellspacing="0" cellpadding="0">
            <caption> 簡易資產負債表</caption>
<tbody>
<tr>
<td valign="top" >資產</td>
<td valign="top" >現金 </td>
<td valign="top" > 2500</td>
</tr>
<tr>
<td valign="top" ></td>

<td valign="top" > 應收帳款</td>
<td valign="top" > 2500</td>
</tr>
<tr>
<td valign="top" ></td>

<td valign="top" > 廠房設備</td>
<td valign="top" > 2500</td>
</tr>
<tr>
<td valign="top" ></td>

<td valign="top" >其他 </td>
<td valign="top" > 2500 </td>
</tr>
<hr style={{width:"500%"}}></hr>
<tr>
<td valign="top" >負債</td>
<td valign="top" >應負帳款 </td>
<td valign="top" > 2500</td>
</tr>

<tr>
<td valign="top" ></td>
<td valign="top" >其他 </td>
<td valign="top" > 2500</td>
</tr>
<hr style={{width:"500%"}}></hr>

<tr>
<td rowspan="2" valign="top" ><p>權益</p></td>
<td valign="top" > 普通股股本 </td>
<td valign="top" > 2500</td>
</tr>

<tr>
<td valign="top" > 保留盈餘</td>
<td valign="top" > </td>
</tr>
<hr style={{width:"500%"}}></hr>

</tbody>
</table>
</Grid>
<Grid item xs={4}>
        <table cellspacing="0" cellpadding="0" >
        <caption> 收入相關 </caption>

<tbody>
<tr>
<td valign="top" >營業成本</td>
<td valign="top" > 500</td>
<td valign="top" > </td>
</tr>

<tr>
<td valign="top" >營業費用</td>
<td valign="top" > 250</td>
<td valign="top" > </td>
</tr>

<tr>
<td valign="top" >業外損益</td>
<td valign="top" > 40</td>
<td valign="top" > </td>
</tr>

<tr>
<td  valign="top" >稅前淨利</td>
<td valign="top" >210 </td>
<td valign="top" > </td>
</tr>

<tr>
<td  valign="top" ></td>
<td valign="top" > 稅</td>
<td valign="top" > 30</td>
</tr>

<tr>
<td  valign="top" ></td>

<td valign="top" > 稅後淨利</td>
<td valign="top" >180 </td>
</tr>
<hr style={{width:"300%"}}></hr>

<tr>
<td valign="top" >每股盈餘</td>
<td valign="top" > 50</td>
<td valign="top" > </td>
</tr>

</tbody>
</table>

 
    </Grid>
        <Grid item xs={4}>
       
        <table cellspacing="0" cellpadding="0" >
        <caption> 其他比較比率 </caption>

<tbody>
<tr>
<td valign="top" ><b>數值名稱</b></td>
<td valign="top" > <b>本公司</b></td>
<td valign="top" > <b>同產業平均</b></td>
</tr>
<hr style={{width:"300%"}}></hr>

<tr>
<td valign="top" >本益比</td>
<td valign="top" > 0</td>
<td valign="top" >0 </td>
</tr>
<hr style={{width:"300%"}}></hr>

<tr>
<td valign="top" >毛利率</td>
<td valign="top" > 0</td>
<td valign="top" >0 </td>
</tr>
<hr style={{width:"300%"}}></hr>

<tr>
<td valign="top" >ROE</td>
<td valign="top" > 0</td>
<td valign="top" >0 </td>
</tr>
<hr style={{width:"300%"}}></hr>

<tr>
<td valign="top" >存貨周轉率</td>
<td valign="top" > 0</td>
<td valign="top" >0 </td>
</tr>
<hr style={{width:"300%"}}></hr>

</tbody>
</table>
        </Grid>
    
      </Grid>
    </Box>
    </Box>

  );
}
export default Company_FinanInfo;