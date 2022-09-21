import React from "react";
import { useParams } from "react-router-dom";
import get_contract_list from "../data/contract_list";
import {
    Box, Typography,
    Stepper, Step, StepContent, StepButton, Button,
    Dialog, Slider,
    Alert, Snackbar,Grid
} from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";

const HarborSend = ({ user }) => {
    // 從網址獲得訂單編號
    const [id, setId] = React.useState(useParams().contractId);
    // 依照訂單編號獲得訂單內容
    const target = get_contract_list().find(
        contract => contract.id === id
    );
    // 獲得訂單內容，若是換貨訂單，則獲得原始訂單內容
    const [send, setSend] = React.useState(
        target.status === '換貨' ?
            get_contract_list().find(
                contract => contract.id === target.origin
            ) : target
    );
    // 獲得換貨的訂單
    const [change, setChange] = React.useState(
        target.status === '換貨' ? target : null
    );
    // 目前的時間軸顯示到第幾個
    const [activeStep, setActive] = React.useState(send.status === '換貨' ? 2 : 0);
    // 買賣雙方的地址
    const buyer_address = {
        name: target.buyer,
        address: '歐洲'
    };
    const saler_address = {
        name: user.name,
        address: '美國'
    };
    // 點不同階段可以看到詳細內容
    const handleClick = (event) => {
        setActive(Number(event.currentTarget.id));
        // console.log(Number(event.currentTarget.id));
    }

    // 跳窗相關參數
    // 開啟跳窗
    const [openWind, setWinOpen] = React.useState(false);
    // 品質比例
    const [ratioList, setRatioList] = React.useState(
        [
            {
                name: '輪胎',
                type: [
                    {
                        name: 'A',
                        amount: 0
                    },
                    {
                        name: 'B',
                        amount: 0
                    }
                ]
            },
            {
                name: '車身',
                type: [
                    {
                        name: 'C',
                        amount: 0
                    },
                    {
                        name: 'D',
                        amount: 0
                    }
                ]
            }
        ]
    );
    // 滑軸調整品質比例
    const handleSlide = (event) => {
        setRatioList(
            ratioList.map(
                (ratio) => {
                    return (
                        {
                            name: ratio.name,
                            type: ratio.type.map(
                                (everyType) => {
                                    return (
                                        {
                                            name: everyType.name,
                                            amount: (
                                                everyType.name === event.target.name ?
                                                    event.target.value :
                                                    everyType.amount
                                            )
                                        }
                                    )
                                }
                            )
                        }
                    )
                }
            )
        )
    }

    // 開始配送的按鈕功能
    const handleSend = (event) => {
        console.log('ratio');
        console.log(ratioList);
    }
    // 警告框
    const [alertOpen, setAlertOpen] = React.useState(false);
    // 數量應為多少，實則多少
    const [alertNum, setAlertNum] = React.useState({
        should: 0,
        now: 0
    });
    // 判斷按鈕要不要鎖
    const handleClose = (name) => {
        const should = target.package.find(
            product => product.name === name
        ).amount;
        const now = ratioList.find(ratio => ratio.name === name).type.map(
            ele => ele.amount
        ).reduce(
            (prev, curr) => prev + curr, 0
        )
        if (should === now) {
            setWinOpen(false);
        } else {
            setAlertNum({
                should: should,
                now: now
            });
            setAlertOpen(true);
        }
    }

    // 左datagrid的標題
    const columns = [
        {
            field: 'name',
            headerName: '商品品項',
            width: 120,
            height: 40
        },
        {
            field: 'type',
            headerName: '商品分級',
            width: 120,
            height: 40
        },
        {
            field: 'amount',
            headerName: '數量',
            width: 120,
            height: 40
        }
    ]
    // 右datagrid的標題
    const r_columns = [
        {
            field: 'name',
            headerName: '商品品項',
            width: 120,
            height: 40
        },
        {
            field: 'type',
            headerName: '商品分級',
            width: 120,
            height: 40
        },
        {
            field: 'amount',
            headerName: '數量',
            width: 120,
            height: 40
        },
        {
            field: 'ratio',
            headerName: '',
            width: 120,
            height: 40,
            renderCell: (params) => {
                return (
                    <Button sx={{"&:hover": { backgroundColor:"#350D08",color:"#FDF1EF"},backgroundColor: "#FFFFFF" ,color:"#E4513D",borderRadius:3,fontFamily: 'Noto Sans TC',fontSize: '16px',fontWeight: '400',lineHeight: '23px'}}id={params.row.id} onClick={() => setWinOpen(true)}>
                        品質比例
                    </Button>
                )
            }
        }
    ]

    return (
        <div className="harbor-send">
            <Box sx={{height: 700,bgcolor:"#FDF1EF"}}>
           
            <Grid container>

            <Grid Item xs={6}>
            <Box className="contract-detail" sx={{height:600,padding:2,bgcolor:"#FFFFFF",mb:'16px',ml:'16px',mt:'16px',borderRadius:5}}>
                <Typography disableTypography sx={{color:'#350D08', fontFamily: 'Noto Sans TC',fontSize: '36px',fontWeight: '700',lineHeight: '52px'}}>
                    {send.buyer}
                </Typography>
                <Stepper orientation="vertical" nonLinear activeStep={activeStep}>
                    <Step key={'order'} completed={target.status === '換貨'}>
                        <Grid container>
                        {/* 點點不要有數字的部分先跳過 */}
                        <Grid Item xs={12}>
                        <StepButton onClick={handleClick} id={0}>
                            <Grid container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start">
                            <Grid Item xs={12}>
                                <Typography disableTypography sx={{color:'#350D08', fontFamily: 'Noto Sans TC',fontSize: '24px',fontWeight: '400',lineHeight: '35px'}}className="status-line-topic">
                                    下訂內容
                                </Typography>
                            </Grid>
                            <Grid Item xs={12}>
                                <Typography disableTypography sx={{color:'#350D08', fontFamily: 'Noto Sans TC',fontSize: '16px',fontWeight: '400',lineHeight: '23px'}}className="status-due">
                                    {send.arrive}
                                </Typography>
                            </Grid>
                            </Grid>
                        </StepButton>
                        </Grid>
                        <Grid Item xs={12}>
                        <StepContent>
                            <Box className="product-list" sx={{ height: 400, width: '100%' }}>
                                {/* 要改用Grid再跟我說 */}
                                <DataGrid
                                    rows={send.package}
                                    columns={columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                />
                            </Box>
                        </StepContent>
                        </Grid>
                        </Grid>
                    </Step>
                    {
                        target.status === '換貨' ?
                            <Step key={'change'}>
                                {/* 點點不要有數字的部分先跳過 */}
                                <StepButton onClick={handleClick} id={1}>
                                    <Typography className="status-line-topic">換貨內容</Typography>
                                    <Typography className="status-due">{send.flawDate}</Typography>
                                </StepButton>
                                <StepContent>
                                    <Box className="product-list" sx={{ height: 400, width: '100%' }}>
                                        {/* 要改用Grid再跟我說 */}
                                        <DataGrid
                                            rows={change.package}
                                            columns={columns}
                                            pageSize={10}
                                            rowsPerPageOptions={[10]}
                                        />
                                    </Box>
                                </StepContent>
                            </Step> : null
                    }
                </Stepper>
            </Box>
            </Grid>
            
            <Grid Item xs={6}>
            <Box className="send-detail"  sx={{height:600,padding:2,bgcolor:'#E4513D',mb:'16px',mt:'16px',mr:'16px',borderRadius:5}}>
                <Typography disableTypography sx={{color:'#FDF1EF', fontFamily: 'Noto Sans TC',fontSize: '36px',fontWeight: '700',lineHeight: '52px'}}>
                    {saler_address.address}－{buyer_address.address}
                </Typography>
                <Box className="product-list" sx={{ height: 400, width: '100%' }}>
                    {/* 要改用Grid再跟我說 */}
                    <DataGrid sx={{mt:'10px',color:'#FDF1EF',fontFamily: 'Noto Sans TC',fontSize: '16px',fontWeight:'700px',lineHeight: '23px',}}
                        rows={target.package}
                        columns={r_columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Box>
                {
                    target.package.map(
                        (product) => {
                            const ratio = ratioList.find(ele => ele.name === product.name);
                            return (
                                ratio === undefined ? null :
                                    <Dialog  fullWidth maxWidth="xs"key={product.name} open={openWind} onClose={() => handleClose(product.name)}>
                                        <Grid container
                                         direction="row"
                                         justifyContent="center"
                                         alignItems="flex-start"
                                         spacing='5'
                                         padding='5'
                                        >
                                        <Grid item xs={12}>
                                            <Typography sx={{fontSize:18,textAlign:'center'}}>
                                                {ratio.name}
                                            </Typography></Grid>
                                        <Grid item xs={10}>
                                        {
                                            ratio.type.map(
                                                (everyType) => {
                                                    return (
                                                        <Slider 
                                                        size="small"
                                                            name={everyType.name}
                                                            onChange={handleSlide}
                                                            step={1}
                                                            valueLabelDisplay="auto"
                                                            min={0}
                                                            max={product.amount}
                                                        />
                                                    )
                                                }
                                            )
                                        }
                                        </Grid>
                                        </Grid>
                                    </Dialog>
                            )
                        }
                    )
                }
                <Snackbar open={alertOpen} onClose={() => setAlertOpen(false)}>
                    <Alert severity="error">數量不正確，應為{alertNum.should}，現在是{alertNum.now}</Alert>
                </Snackbar>
                <Grid container justifyContent="flex-end">
                <Button sx={{"&:hover": { backgroundColor:"#350D08",color:"#FDF1EF"},backgroundColor: "#FFFFFF" ,color:"#E4513D",borderRadius:3,fontFamily: 'Noto Sans TC',fontSize: '24px',fontWeight: '400',lineHeight: '35px',mt:'30px'}}onClick={handleSend} href='/harbor'>
                    開始配送
                </Button>
                </Grid>
            </Box>
            </Grid>
            </Grid>
            </Box>
        </div>
    )
}

export default HarborSend;