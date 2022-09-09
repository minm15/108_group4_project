import React from 'react';
import HarborList from './harbor_list';
import HarborSendable from './harbor_sendable';
import { Button,Box } from '@mui/material';

// 港口的主要介面
const HarborMain = ({ user }) => {
    const [status, setStatus] = React.useState(true);

    // 寄送清單與可配送清單的切換
    const handleStatus = (event) => {
        setStatus(!status);
    }

    return (
        <div className='harbar_main'>
            <Box sx={{height: 700,bgcolor:"#FDF1EF",padding:'5'}}>
            <Button sx={{"&:hover": { backgroundColor:"#FDF1EF",color:"#E4513D",border:5},height: '80px',width:'1265px',fontFamily: 'Noto Sans TC',fontSize: '36px',fontWeight: '400',lineHeight: '52px',backgroundColor: "#E4513D" ,color:"#FDF1EF"}}onClick={handleStatus}>{status ? "開始配送" : '貨運狀況'}</Button>
            {status ? <HarborList user={user} /> : <HarborSendable user={user} />}
            </Box>
        </div>
    )
}

export default HarborMain;