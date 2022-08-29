import React from "react";
import { Box } from '@mui/material';

// CustomFooter: DataGrid要用的總和
const CustomFooter = (props) => {
    return (
        <Box sx={{ padding: "10px", display: "flex",color:"red" }}>
            總價：{props.total}
        </Box>
    )
}

export default CustomFooter;