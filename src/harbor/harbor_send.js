import React from "react";
import { useParams } from "react-router-dom";
// import get_contract_list from "../data/contract_list";
import { count_container, get_component_list, shipping_fee, shipping_time } from "../data/game_rule";
import {
    Box, Typography,
    Stepper, Step, StepContent, StepButton, Button,
    Dialog, Slider,
    Alert, Snackbar, Grid, FormControl, Select, MenuItem
} from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";

function get_contract_list() {
    let contract_list = JSON.parse(localStorage.getItem('contract_list'));
    return contract_list;
}

function get_company_list() {
    let company_list = JSON.parse(localStorage.getItem('company_list'));
    return company_list;
}

const HarborSend = ({ user }) => {
    // 從網址獲得訂單編號
    const [id, setId] = React.useState(useParams().contractId);
    // 訂單結果
    const [arrange_time, setArrange] = React.useState();
    const [fee, setFee] = React.useState();
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
    const buyer_address = get_company_list().find(
        (company) => company.name === target.buyer
    );
    const saler_address = get_company_list().find(
        (company) => company.name === user.name
    );
    const shippingTime = shipping_time(
        saler_address.address.continent,
        saler_address.address.num,
        buyer_address.address.continent,
        buyer_address.address.num
    );
    const shippingFee = shipping_fee(
        saler_address.address.continent,
        saler_address.address.num,
        buyer_address.address.continent,
        buyer_address.address.num,
        count_container(send.package)
    )
    const handleArrange = (event) => {
        setArrange(event.value);
        setFee(
            event.value === shippingTime ?
                shippingFee : shippingFee + 3000
        )
    }
    // 品質比例
    const [ratioList, setRatioList] = React.useState(
        get_component_list().map(
            (product) => {
                // console.log(product.detail);
                if (product.detail !== undefined) {
                    return {
                        name: product.name,
                        type: product.detail.map(
                            (eachType) => {
                                return {
                                    name: eachType.type,
                                    amount: 0
                                }
                            }
                        ),
                        window: false
                    }
                }
            }
        ).filter((item) => item !== undefined)
    );
    // 點不同階段可以看到詳細內容
    const handleClick = (event) => {
        setActive(Number(event.currentTarget.id));
        // console.log(Number(event.currentTarget.id));
    }
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
    // 警告框
    const [alertOpen, setAlertOpen] = React.useState(false);
    // 數量應為多少，實則多少
    const [alertNum, setAlertNum] = React.useState({
        should: 0,
        now: 0
    });
    const [submitErr, setSubmitErr] = React.useState(false);

    // 彈出視窗內容
    const [popContent, setPopContent] = React.useState(
        {
            name: 'None',
            amount: 0
        }
    );
    const [openWind, setWinOpen] = React.useState(false);

    // 判斷視窗可否關掉
    const handleClose = (name) => {
        const should = target.package.find(
            product => product.name === name
        ).amount;
        const now = ratioList.find(ratio => ratio.name === name).type.map(
            ele => ele.amount
        ).reduce(
            (prev, curr) => prev + curr, 0
        );
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

    // 開始配送的按鈕功能
    const handleSend = (event) => {
        let flag = true;
        if (change != null) {
            change.package.map(
                (product) => {
                    flag = ratioList.find(
                        (item) => item.name === product.name
                    ).type.map(
                        (eachType) => { return eachType.amount; }
                    ).reduce(
                        (prev, curr) => prev + curr, 0
                    ) === product.amount;
                }
            );
        } else {
            send.package.map(
                (product) => {
                    flag = ratioList.find(
                        (item) => item.name === product.name
                    ).type.map(
                        (eachType) => { return eachType.amount; }
                    ).reduce(
                        (prev, curr) => prev + curr, 0
                    ) === product.amount;
                }
            );
        }
        if (flag) {
            let storage = JSON.parse(localStorage.getItem('storage')).map(
                (company) => {
                    if (company.company === user.name) {
                        // console.log(
                        //     company.storage.find(
                        //         (cate) => cate.category === '成品'
                        //     ).item);
                        let total = company.total;
                        let cate_total = 0;
                        let goods = company.storage.find(
                            (cate) => cate.category === '成品'
                        ).item.map(
                            (good) => {
                                let change = ratioList.find(
                                    (item) => item.name === good.name
                                ).type.find(
                                    (eachType) => eachType.name === good.type);
                                if (change === undefined) {
                                    return good;
                                } else {
                                    // console.log(change.amount);
                                    total -= change.amount;
                                    cate_total += good.amount - change.amount;
                                    // let change_type = change.type.find((eachType) => eachType.name === good.type);
                                    return {
                                        name: good.name,
                                        type: good.type,
                                        amount: good.amount - change.amount
                                    }
                                }
                            }
                        )
                        return {
                            company: company.company,
                            limit: company.limit,
                            total: total,
                            storage: [
                                company.storage.find(
                                    (cate) => cate.category === '材料'
                                ),
                                {
                                    category: "成品",
                                    total: cate_total,
                                    item: goods
                                }
                            ]
                        }
                        // console.log(goods);
                    } else {
                        return company;
                    }
                }
            );
            console.log(storage);
            localStorage.setItem('storage', JSON.stringify(storage));
            let contracts = get_contract_list().map(
                (contract) => {
                    if (contract.id === id) {
                        let result = contract;
                        result.sent = true;
                        return result;
                    } else {
                        return contract;
                    }
                }
            );
            localStorage.setItem('contract_list', JSON.stringify(contracts));
            console.log('contract: ');
            console.log(contracts);
            console.log('ratio: ');
            console.log(ratioList);
            window.location.href = '../harbor';
        } else {
            console.log('ratio: ');
            console.log(ratioList);
            setSubmitErr(true);
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
            headerName: '商品類型',
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
                    <Button
                        sx={{
                            "&:hover": {
                                backgroundColor: "#350D08", color: "#FDF1EF"
                            },
                            backgroundColor: "#FFFFFF",
                            color: "#E4513D",
                            borderRadius: 3,
                            fontFamily: 'Noto Sans TC',
                            fontSize: '16px',
                            fontWeight: '400',
                            lineHeight: '23px'
                        }}
                        id={params.row.id}
                        onClick={() => {
                            setPopContent(
                                {
                                    name: params.row.name,
                                    amount: params.row.amount
                                }
                            );
                            setWinOpen(true);
                        }}
                    >
                        品質比例
                    </Button>
                )
            }
        }
    ]

    return (
        <div className="harbor-send">
            <Box sx={{ height: 700, bgcolor: "#FDF1EF" }}>

                <Grid container>

                    <Grid Item xs={6}>
                        <Box className="contract-detail" sx={{ height: 600, padding: 2, bgcolor: "#FFFFFF", mb: '16px', ml: '16px', mt: '16px', borderRadius: 5 }}>
                            <Typography disableTypography sx={{ color: '#350D08', fontFamily: 'Noto Sans TC', fontSize: '36px', fontWeight: '700', lineHeight: '52px' }}>
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
                                                        <Typography disableTypography sx={{ color: '#350D08', fontFamily: 'Noto Sans TC', fontSize: '24px', fontWeight: '400', lineHeight: '35px' }} className="status-line-topic">
                                                            下訂內容
                                                        </Typography>
                                                    </Grid>
                                                    <Grid Item xs={12}>
                                                        <Typography disableTypography sx={{ color: '#350D08', fontFamily: 'Noto Sans TC', fontSize: '16px', fontWeight: '400', lineHeight: '23px' }} className="status-due">
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
                        <Box className="send-detail" sx={{ height: 600, padding: 2, bgcolor: '#E4513D', mb: '16px', mt: '16px', mr: '16px', borderRadius: 5 }}>
                            <Typography disableTypography sx={{ color: '#FDF1EF', fontFamily: 'Noto Sans TC', fontSize: '36px', fontWeight: '700', lineHeight: '52px' }}>
                                {saler_address.address.continent}－{buyer_address.address.continent}
                            </Typography>
                            <Box className="product-list" sx={{ height: 400, width: '100%' }}>
                                {/* 要改用Grid再跟我說 */}
                                <DataGrid sx={{ mt: '10px', color: '#FDF1EF', fontFamily: 'Noto Sans TC', fontSize: '16px', fontWeight: '700px', lineHeight: '23px', }}
                                    rows={target.package}
                                    columns={r_columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                />
                            </Box>
                            <Dialog key={popContent.name} open={openWind} onClose={() => handleClose(popContent.name)}>
                                <Box sx={{ width: 285, height: 110, m: 5 }}>
                                    {
                                        (popContent.name !== "None") ?
                                            ratioList.find(ratio => ratio.name === popContent.name).type.map(
                                                (eachType) => {
                                                    return (
                                                        <div key={eachType.name}>
                                                            <Typography>{eachType.name}</Typography>
                                                            <Slider
                                                                name={eachType.name}
                                                                onChange={handleSlide}
                                                                step={1}
                                                                min={0}
                                                                valueLabelDisplay="auto"
                                                                max={popContent.amount}
                                                            />
                                                        </div>
                                                    )
                                                }
                                            ) : <Typography>nothing here</Typography>
                                    }
                                </Box>
                            </Dialog>
                            <Snackbar open={alertOpen} onClose={() => setAlertOpen(false)}>
                                <Alert severity="error">數量不正確，應為{alertNum.should}，現在是{alertNum.now}</Alert>
                            </Snackbar>

                            <Grid container spacing={6}>
                                <Grid item xs={4}>
                                    <Typography disableTypography sx={{ color: '#FDF1EF', fontFamily: 'Noto Sans TC', fontSize: '16px', fontWeight: '700', lineHeight: '23px' }}>
                                        約定配送時長
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <FormControl>
                                        <Select
                                            label="arrange_time"
                                            value={arrange_time}
                                            defaultValue={shippingTime}
                                            onChange={handleArrange}
                                            sx={{ color: '#FDF1EF', fontFamily: 'Noto Sans TC', fontSize: '16px', fontWeight: '700', lineHeight: '23px' }}>
                                            <MenuItem value={shippingTime}>{shippingTime}</MenuItem>
                                            <MenuItem value={shippingTime - 5}>{shippingTime - 5}</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container justifyContent="flex-end">
                                <Button
                                    sx={{
                                        "&:hover": { backgroundColor: "#350D08", color: "#FDF1EF" },
                                        backgroundColor: "#FFFFFF",
                                        color: "#E4513D",
                                        borderRadius: 3,
                                        fontFamily: 'Noto Sans TC',
                                        fontSize: '24px',
                                        fontWeight: '400',
                                        lineHeight: '35px',
                                        mt: '30px'
                                    }}
                                    onClick={handleSend}
                                // href='/harbor'
                                >
                                    開始配送
                                </Button>
                            </Grid>
                            <Snackbar open={submitErr} onClose={() => setSubmitErr(false)}>
                                <Alert severity="error">請確認是否設定完所有產品的配送比例！</Alert>
                            </Snackbar>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default HarborSend;