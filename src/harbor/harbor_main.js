import React from 'react';
import HarborList from './harbor_list';
import HarborSendable from './harbor_sendable';
import { Button } from '@mui/material';

// 港口的主要介面
const HarborMain = ({ user }) => {
    const [status, setStatus] = React.useState(true);

    // 寄送清單與可配送清單的切換
    const handleStatus = (event) => {
        setStatus(!status);
    }

    return (
        <div className='harbar_main'>
            <Button onClick={handleStatus}>{status ? "開始配送" : '貨運狀況'}</Button>
            {status ? <HarborList user={user} /> : <HarborSendable user={user} />}
        </div>
    )
}

export default HarborMain;