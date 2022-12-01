import React from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails,
    Grid,
    Typography,
    LinearProgress,
    Button,
    Box,
    Backdrop,
    CircularProgress
} from '@mui/material';
// import get_deliver_list from '../data/deliver_list';
import { calculate_time, cal_input_date, diff_time } from '../time';
import { ChangeCircle } from '@mui/icons-material';

// const date = '2022-04-07';

function get_deliver_list() {
    // let deliver_list = require('../data/deliver_list.json');
    return JSON.parse(localStorage.getItem('deliver_list'));
}

// 港口中正在往自己方向寄、由自己寄出的清單
const HarborList = ({ user }) => {
    const [deliver_list, setDeliver] = React.useState(
        get_deliver_list().filter(
            (deliver) => deliver.receiver === user.name | deliver.sender === user.name
        )
    );
    const [date, setDate] = React.useState(calculate_time().game_day);
    // refresh the page each 10 seconds
    const time_change = () => {
        setDate(calculate_time().game_day);
        setDeliver(get_deliver_list().filter(
            (deliver) => deliver.receiver === user.name | deliver.sender === user.name
        ));
    }
    setInterval(time_change, 10000);

    // note: 還沒弄完驗貨loading
    const [loadingShow, setLoading] = React.useState(false);
    const [loadingTime, setLoadingTime] = React.useState(0);
    // 驗貨取貨
    const inspectCollect = (event) => {
        // console.log('here');
        setLoading(true);
        const timer = setInterval(() => {
            // console.log(loadingTime);
            setLoadingTime((prev) => (prev >= 100 ? 0 : prev + 10));
        }, 1000);
        clearInterval(timer);
        setLoading(false);
        handleCollect(event);
    }

    // 不驗貨取貨
    const handleCollect = (event) => {
        let change = get_deliver_list().find(
            (deliver) => deliver.id === event.currentTarget.id
        ).package;
        let result = get_deliver_list().filter(
            (deliver) => deliver.id !== event.currentTarget.id
        );
        setDeliver(result);
        // 除此之外，還要回後端改資料
        localStorage.setItem('deliver_list', JSON.stringify(result));
        let storage = JSON.parse(localStorage.getItem('storage'))
        storage = storage.map(
            (company) => {
                if (company.company === user.name) {
                    let companyStorage = company;
                    companyStorage.storage = companyStorage.storage.map(
                        (cate) => {
                            if (cate.category === '材料') {
                                let cateStorage = cate;
                                change.map(
                                    (item) => {
                                        let changed = false;
                                        console.log(cateStorage.item);
                                        cateStorage.item = cateStorage.item.map(
                                            (product) => {
                                                console.log(product.name, '-', product.type);
                                                console.log(item.name, '-', item.type);
                                                if (product.name === item.name & product.type === item.type) {
                                                    let productChange = product;
                                                    console.log('update', product.name, 'to', product.amount + item.amount);
                                                    changed = true;
                                                    productChange.amount = product.amount + item.amount;
                                                    console.log(productChange);
                                                    return productChange;
                                                } else {
                                                    return product;
                                                }
                                            }
                                        );
                                        console.log('cateStorage now:', cateStorage);
                                        if (!changed) {
                                            console.log('add', item.name, 'into list');
                                            cateStorage.item.push(item.type === undefined ?
                                                {
                                                    name: item.name,
                                                    amount: item.amount
                                                } :
                                                {
                                                    name: item.name,
                                                    amount: item.amount,
                                                    type: item.type
                                                }
                                            )
                                        }
                                    }
                                );
                                return cateStorage;
                            } else {
                                return cate;
                            }
                        }
                    )
                    return companyStorage;
                } else {
                    return company;
                }
            }
        );
        console.log(storage);
    }

    return (
        <Box sx={{width: 1280}} margin='auto'>
            {
                deliver_list.map(
                    (deliver) => {
                        const progress = diff_time(date, cal_input_date(deliver.send_date, deliver.actual_time));
                        // console.log(progress);
                        return (
                            <Accordion key={deliver.id} >
                                {/* 收合狀態看見的內容／展開之後的上半部內容 */}
                                <AccordionSummary>
                                    {/* 現在進度條跟最後的日期是沒有放進去Grid的，因為進度條放Grid會無法顯示。 */}
                                    <Grid container>
                                        <Grid item xs={3} >
                                            {
                                                deliver.receiver === user.name ?
                                                    <Typography disableTypography sx={{ color: '#350D08', fontFamily: 'Noto Sans TC', fontSize: '24px', fontWeight: '400', lineHeight: '35px' }}>From:{deliver.sender}</Typography> :
                                                    <Typography disableTypography sx={{ color: '#350D08', fontFamily: 'Noto Sans TC', fontSize: '24px', fontWeight: '400', lineHeight: '35px' }}>To:{deliver.receiver}</Typography>
                                            }
                                        </Grid>
                                        <Grid item xs={1}>
                                            {deliver.package[0].name}{deliver.package[0].type}{deliver.package[0].amount}
                                            {deliver.package.length > 1 ? <Typography disableTypography sx={{
                                                color: '#350D08', fontFamily: 'Noto Sans TC',
                                                fontSize: '16px', fontWeight: '400', lineHeight: '23px'
                                            }}>...</Typography> : null}
                                        </Grid>
                                        <Grid item xs={7}>
                                            {
                                                progress > 0 ?
                                                    deliver.receiver === user.name ?
                                                        <div key={deliver.id}>
                                                            <Button sx={{ "&:hover": { backgroundColor: "#E4513D", color: "#FFFFFF", mr: 3 }, backgroundColor: "#FFFFFF", color: "#350D08", border: 2, mr: 3 }} id={deliver.id} onClick={inspectCollect}>驗貨取貨</Button>
                                                            <Button sx={{ borderBottom: 1, borderRadius: '0em', color: '#350D08' }} size="small" id={deliver.id} onClick={handleCollect}>取貨不驗貨</Button>
                                                        </div> :
                                                        <Typography
                                                            sx={{
                                                                color: '#350D08', fontFamily: 'Noto Sans TC',
                                                                fontSize: '16px', fontWeight: '400', lineHeight: '23px'
                                                            }}>
                                                            已寄達
                                                        </Typography> :
                                                    <Box sx={{ width: '50%' }}>
                                                        <LinearProgress variant="determinate" value={(progress / deliver.arrange_time) * (-1)} />
                                                        {Math.round((progress / deliver.arrange_time) * (-1))}%
                                                    </Box>
                                            }
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Typography disableTypography sx={{ color: '#BE0000', fontFamily: 'Noto Sans TC', fontSize: '16px', fontWeight: '400', lineHeight: '23px' }}>
                                                {deliver.actual_time>deliver.arrange_time ? "延遲" : ""}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Typography disableTypography sx={{ color: '#350D08', fontFamily: 'Noto Sans TC', fontSize: '16px', fontWeight: '400', lineHeight: '23px' }}>
                                                {cal_input_date(deliver.send_date, deliver.arrange_time)}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </AccordionSummary>
                                {/* 展開之後的詳細內容（下半部內容） */}
                                <AccordionDetails>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography disableTypography sx={{ color: '#350D08', fontFamily: 'Noto Sans TC', fontSize: '16px', fontWeight: '400', lineHeight: '23px' }}>
                                                運送內容：
                                            </Typography>
                                        </Grid>
                                        {
                                            deliver.package.map(
                                                (product) => {
                                                    return (

                                                        <Grid container key={product.id}>

                                                            <Grid item xs={2}>
                                                                <Typography disableTypography sx={{ color: '#350D08', fontFamily: 'Noto Sans TC', fontSize: '16px', fontWeight: '400', lineHeight: '23px' }}>
                                                                    {product.name}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={1}>
                                                                <Typography disableTypography sx={{ color: '#350D08', fontFamily: 'Noto Sans TC', fontSize: '16px', fontWeight: '400', lineHeight: '23px' }}>
                                                                    {product.amount}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={1}>
                                                                <Typography disableTypography sx={{ color: '#350D08', fontFamily: 'Noto Sans TC', fontSize: '16px', fontWeight: '400', lineHeight: '23px' }}>
                                                                    {product.price}
                                                                </Typography>
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
            <Backdrop
                open={loadingShow}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress progress={loadingTime} color="inherit" />
            </Backdrop>
        </Box>
    )
}

export default HarborList;