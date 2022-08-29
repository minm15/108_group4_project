import React from 'react';
import { Link, Outlet } from "react-router-dom";
import { Box, Chip,Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// import { get_letter_list } from '../test/mail.js';
import get_letter_list from '../data/letter_list';
import MenuList from './menu';
import LetterList from './letter_gridList';


const LetterGrid = () => {
    
   
    const columns = [
        {
            field: 'sender',
            headerName: '寄件人',
            width: 270,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.sender}
                        <Chip
                            label={params.row.sender_type}
                            size="small"
                            sx={{ bgcolor: "#757575", color: "#F5F5F5" }}
                        />
                    </div>
                )
            }
        },
        {
            field: 'title',
            headerName: '主旨標題',
            width: 700,
            renderCell: (params) => {
                return (
                    <div>
                        <Link disableTypography underline="none" to={`/letter_list/${params.row.id}`} key={params.row.id}>
                            【{params.row.letter_type}】{params.row.title}
                            
                        </Link>
                        <div>
                            {params.row.expired}
                        </div>
                    </div>
                )
            }
        },
        {
            field: 'time',
            headerName: '日期',
            width: 100
        }
    ];
  
    // Fake data
    const rows = get_letter_list();

    return (
        <div className='main_frame'>
       <Box sx={{height: 700,bgcolor:"#FDF1EF"}}>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing='5'
                padding='5'
                >
               <div className="menu">
               <Grid item xs={12}>
                <MenuList />
                </Grid>
                </div>
                
          
            {/* <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    componentsProps={{
                        columnMenu: { background: 'red', counter: rows.length },
                    }}
                />
            </Box> */}
            
             <Grid item xs={8}>
                <Box sx={{  width: '100%' ,padding:3,bgcolor: '#FDF1EF' }}>
                    <LetterList />
                </Box>
            </Grid>

            </Grid>
            
            <Outlet />
         </Box>
        </div>
    )
}

export default LetterGrid;