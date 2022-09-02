import React from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails,
    Grid,
    Typography,
    LinearProgress,
    Button,
    Box
} from '@mui/material';
import get_deliver_list from '../data/deliver_list';

const date = '2022-04-07';

// 港口中正在往自己方向寄、由自己寄出的清單
const HarborList = ({ user }) => {
    const [deliver_list, setDeliver] = React.useState(get_deliver_list());

    // 驗貨取貨
    const inspectCollect = (event) => {
        handleCollect(event);
    }

    // 不驗貨取貨
    const handleCollect = (event) => {
        setDeliver(
            deliver_list.filter(
                (deliver) => deliver.id !== event.currentTarget.id
            )
        )
        // 除此之外，還要回後端改資料
    }

    return (
        <div className='harbor_list'>
            {
                deliver_list.map(
                    (deliver) => {
                        const progress = Number(deliver.id) % 10;
                        return (
                            <Accordion key={deliver.id}>
                                {/* 收合狀態看見的內容／展開之後的上半部內容 */}
                                <AccordionSummary>
                                    {/* 現在進度條跟最後的日期是沒有放進去Grid的，因為進度條放Grid會無法顯示。 */}
                                    <Grid container>
                                        <Grid item>
                                            {
                                                deliver.receiver === user.name ?
                                                    <Typography>From:{deliver.sender}</Typography> :
                                                    <Typography>To:{deliver.receiver}</Typography>
                                            }
                                        </Grid>
                                        <Grid item>
                                            {deliver.package[0].name}{deliver.package[0].type}{deliver.package[0].amount}
                                            {deliver.package.length > 1 ? <Typography>...</Typography> : null}
                                        </Grid>
                                    </Grid>
                                    {
                                        progress === 0 ?
                                            <div key={deliver.id}>
                                                <Button id={deliver.id} onClick={inspectCollect}>驗貨取貨</Button>
                                                <Button id={deliver.id} onClick={handleCollect}>取貨不驗貨</Button>
                                            </div> :
                                            <Box sx={{ width: '50%' }}>
                                                <LinearProgress variant="determinate" value={progress} />
                                            </Box>
                                    }
                                    {deliver.arrive_date}
                                </AccordionSummary>
                                {/* 展開之後的詳細內容（下半部內容） */}
                                <AccordionDetails>
                                    <Grid container>
                                        <Grid item>
                                            運送內容：
                                        </Grid>
                                        {
                                            deliver.package.map(
                                                (product) => {
                                                    return (
                                                        <Grid container key={product.id}>
                                                            <Grid item>
                                                                {product.name}
                                                            </Grid>
                                                            <Grid item>
                                                                {product.amount}
                                                            </Grid>
                                                            <Grid item>
                                                                {product.price}
                                                            </Grid>
                                                        </Grid>
                                                    )
                                                }
                                            )
                                        }
                                        {/* 應該還要有受影響的事件的詳細情形，但我們先跳過 */}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        )
                    }
                )
            }
        </div>
    )
}

export default HarborList;