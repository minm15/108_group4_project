import React from 'react';
import { Link, Outlet } from "react-router-dom";
import { Box, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// import { get_letter_list } from '../test/mail.js';
import get_letter_list from '../data/letter_list';
import MenuList from './menu';



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
                        <Link to={`/letter_list/${params.row.id}`} key={params.row.id}>
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
            <div className="menu">
                <MenuList />
            </div>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    componentsProps={{
                        columnMenu: { background: 'red', counter: rows.length },
                    }}
                />
            </Box>
            <Outlet />
        </div>
    )
}

export default LetterGrid;