import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import CompanyDrawer from './Drawer';
import { list1, list2, list3, list4, list5 } from './data/serviceLevelName'
// import {levelList} from './data/serviceList.js'; 
// import myCompany from './data/myCompany';
import Service_Modal from './Service_Modal';
import {
 DashboardCustomize, Rocket, Lightbulb, Gite
} from "@mui/icons-material";

function Company_Service() {
  const [levelList, setLevelList] = React.useState(JSON.parse(localStorage.getItem('user')).levelList);

  // //倉-生-品-商-工(順序) 目前的等級 

  const nowLevel = {
    background: "#FDF1EF", //目前等級的底色
  };

  const otherLevel = {
    background: "white",
  };



  return (
    <Box sx={{ display: 'flex', my: '25px', }}>
      {/* <CssBaseline /> */}
      <CompanyDrawer />
      <Box sx={{ flexGrow: 1, ml: '25px' }}>
        <Grid container rowSpacing={2} columnSpacing={5}  >
          <Grid item xs={4} >
            <Grid container  >
              <Grid item xs={9}>

                <DashboardCustomize /> <big><b> 倉儲容量</b></big>
              </Grid>
              <Grid item xs={3}>
                <Service_Modal nowLevel={levelList[0]} service={'倉儲容量'} levelNo={0} />
              </Grid>
            </Grid >


            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">等級</TableCell>
                    <TableCell align="center">效果</TableCell>
                    <TableCell align="center">至此級成本</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list1.slice(0, 5).map((row, index) => (
                    <TableRow key={row.id} style={levelList[0] === row.id ? nowLevel : otherLevel}>
                      <TableCell align="center">lv{index + 1}</TableCell>
                      <TableCell align="center" >{row.effect}</TableCell>
                      <TableCell align="center">{row.cost}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={4}>
            <Grid container  >
              <Grid item xs={9}>

                <Rocket /> <big><b> 生產效率</b></big>
              </Grid>
              <Grid item xs={3}>
                <Service_Modal nowLevel={levelList[1]} service={'生產效率'} levelNo={1} />
              </Grid>
            </Grid >

            <TableContainer component={Paper} variant="outlined">
              <Table size="small" >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">等級</TableCell>
                    <TableCell align="center">效果</TableCell>
                    <TableCell align="center">至此級成本</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list2.slice(0, 5).map((row, index) => (
                    <TableRow key={row.id} style={levelList[1] === row.id ? nowLevel : otherLevel}>
                      <TableCell align="center">lv{index + 1}</TableCell>
                      <TableCell align="center" >{row.effect}</TableCell>
                      <TableCell align="center">{row.cost}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Grid>
          <Grid item xs={4}>
            <Grid container  >
              <Grid item xs={9}>

                <Rocket /> <big><b> 品質管控</b></big>
              </Grid>
              <Grid item xs={3}>
                <Service_Modal nowLevel={levelList[2]} service={'品質管控'} levelNo={2} />
              </Grid>
            </Grid >
            <TableContainer component={Paper} variant="outlined">
              <Table size="small" >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">等級</TableCell>
                    <TableCell align="center">效果</TableCell>
                    <TableCell align="center">至此級成本</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list3.slice(0, 5).map((row, index) => (
                    <TableRow key={row.id} style={levelList[2] === row.id ? nowLevel : otherLevel}>
                      <TableCell align="center">lv{index + 1}</TableCell>
                      <TableCell align="center" >{row.effect}</TableCell>
                      <TableCell align="center">{row.cost}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Grid>
          <Grid item xs={4}>
            <Grid container  >
              <Grid item xs={9}>

                <Lightbulb /> <big><b> 商品研發</b></big>
              </Grid>
              <Grid item xs={3}>
                <Service_Modal nowLevel={levelList[3]} service={'商品研發'} levelNo={3} />
              </Grid>
            </Grid >

            <TableContainer component={Paper} variant="outlined">
              <Table size="small" >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">等級</TableCell>
                    <TableCell align="center">效果</TableCell>
                    <TableCell align="center">至此級成本</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list4.slice(0, 5).map((row, index) => (
                    <TableRow key={row.id} style={levelList[3] === row.id ? nowLevel : otherLevel}>
                      <TableCell align="center">lv{index + 1}</TableCell>
                      <TableCell align="center" >{row.effect}</TableCell>
                      <TableCell align="center">{row.cost}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={4}>
            <Grid container  >
              <Grid item xs={9}>

                <Gite /> <big><b> 工廠規模</b></big>
              </Grid>
              <Grid item xs={3}>
                <Service_Modal nowLevel={levelList[4]} service={'工廠規模'} levelNo={4} />
              </Grid>
            </Grid >
            <TableContainer component={Paper} variant="outlined">
              <Table size="small" >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">等級</TableCell>
                    <TableCell align="center">效果</TableCell>
                    <TableCell align="center">至此級成本</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list5.slice(0, 5).map((row, index) => (
                    <TableRow key={row.id} style={levelList[4] === row.id ? nowLevel : otherLevel}>
                      <TableCell align="center">lv{index + 1}</TableCell>
                      <TableCell align="center" >{row.effect}</TableCell>
                      <TableCell align="center">{row.cost}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={4}>
          </Grid>
        </Grid>
      </Box>

    </Box>
  );
}
export default Company_Service;