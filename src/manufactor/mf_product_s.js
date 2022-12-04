import React from "react";
import {
    Box, Paper, Grid,
    FormControl, InputLabel, Select, MenuItem, Typography, Button, 
    Alert, Snackbar
} from "@mui/material";
import { cal_size, get_component_list } from '../data/game_rule';
import { calculate_time, cal_input_data } from "../time/index";

const ProductS = ({ user }) => {
    const dm = JSON.parse(localStorage.getItem('dm')).find(
        (company) => company.company === user.name
    );
    const producing_list = JSON.parse(localStorage.getItem('product_list')).find(
        (company) => company.company === user.name
    ).product_list.map(
        (item) => {
            return item.target;
        }
    );
    const productable = get_component_list();
    const contractList = JSON.parse(localStorage.getItem('contract_list')).filter(
        (contract) => contract.seller === user.name & !contract.sent
    );
    // console.log(JSON.parse(localStorage.getItem('contract_list')));
    const storage = JSON.parse(localStorage.getItem('storage')).find(
        (company) => company.company === user.name
    );
    // form content
    const [targetName, setTargetName] = React.useState('');
    // const [targetDetail, setTargetDetail] = React.useState();
    const [targetAmount, setAmount] = React.useState(0);
    const [targetDetail, setTargetDetail] = React.useState();
    const [typeList, setTypeList] = React.useState([]);
    const [type, setType] = React.useState('');
    const [igd, setIgd] = React.useState([]);
    const [igdCost, setIgdCost] = React.useState(0);
    const [otherCost, setOtherCost] = React.useState(0);
    const [time, setTime] = React.useState(0);

    const [alert, setAlert] = React.useState(false);

    React.useEffect(() => {
        if (targetName !== '') {
            let detail = productable.find(
                (item) => item.name === targetName
            );
            // console.log(productable);
            setTargetDetail(detail);
            setTypeList(detail.detail.map(
                (eachType) => { return eachType.type })
            );
        }
    }, [targetName]);

    React.useEffect(() => {
        if (targetName !== '' & type !== '') {
            let targetType = targetDetail.detail.find(
                (eachType) => eachType.type === type
            );
            if (targetAmount === 0) {
                setIgdCost(targetType.avg_cost);
                setIgd(
                    targetType.igd.map(
                        (eachIgd) => {
                            return {
                                name: '材料' + eachIgd,
                                amount: 0
                            }
                        }
                    )
                );
            } else {
                setIgdCost(targetType.avg_cost * targetAmount);
                setIgd(
                    targetType.igd.map(
                        (eachIgd) => {
                            return {
                                name: '材料' + eachIgd,
                                amount: targetAmount
                            }
                        }
                    )
                );
            }
        }
    }, [type]);

    React.useEffect(() => {
        if (targetName !== '' & type !== '') {
            let targetType = targetDetail.detail.find(
                (eachType) => eachType.type === type
            );
            setIgdCost(targetType.avg_cost * targetAmount);
            setIgd(
                igd.map(
                    (eachIgd) => {
                        return {
                            name: eachIgd.name,
                            amount: targetAmount
                        }
                    }
                )
            );
            setTime(Math.ceil(targetAmount / targetDetail.product_per_day));
            setOtherCost(targetAmount * targetDetail.other_cost);
        }
    }, [targetAmount])

    const checkStatus = (item) => {
        let result = '　　';
        if (producing_list.includes(item.name)) {
            result = '製造中...';
        }
        storage.storage.find((cate) => cate.category === '成品').item.map(
            (eachItem) => {
                if (eachItem.name === item.name) {
                    if (eachItem.amount >= targetAmount) {
                        result = '完成';
                    }
                }
            }
        );
        return result;
    }

    const handleProduct = (event) => {
        // 檢查是否超出倉儲
        let storageNow = cal_size(storage.storage.find((cate) => cate.category === '成品').item)
            + storage.storage.find((cate) => cate.category === '材料').item.map(
                (item) => {return item.amount}
            ).reduce((acc, curr) => acc + curr, 0);
        let igdSize = igd.map((item) => item.amount).reduce((acc, curr) => acc + curr, 0);
        let productSize = cal_size([{
            name: targetName,
            amount: targetAmount
        }]);
        let levelList = [0, 1000, 1700, 2200, 2600, 3000];
        let storageVolume = levelList[JSON.parse(localStorage.getItem('user')).levelList[0]];
        // console.log(storageVolume - storageNow + igdSize - productSize);
        if (storageVolume - storageNow + igdSize - productSize < 0) {
            setAlert(true);
            console.log('倉儲不足')
        } else {
            let timeNow = calculate_time().game_day;
            let product_list = JSON.parse(localStorage.getItem('product_list'));
            console.log(product_list);
            let addProduct = {
                id: product_list.find(
                    (ele) => ele.company === user.name
                ).product_list.length,
                reason: '',
                target: {
                    name: targetName,
                    type: type,
                    amount: targetAmount
                },
                igd: igd,
                other_cost: otherCost,
                total_cost: igdCost + otherCost,
                time: time,
                product_time: timeNow
            };
            localStorage.setItem('product_list', JSON.stringify(product_list.map(
                (ele) => {
                    if (ele.company === user.name) {
                        let temp = ele;
                        temp.product_list.push(addProduct);
                        return temp;
                    } else {
                        return ele;
                    }
                }
            )));
            let company_list = JSON.parse(localStorage.getItem('company_list'));
            company_list = company_list.map(
                (company) => {
                    if (company.name === user.name) {
                        company.cash = company.cash - igdCost - otherCost;
                        return company
                    } else {
                        return company;
                    }
                }
            );
            localStorage.setItem('company_list', JSON.stringify(company_list));
            let user_info = JSON.parse(localStorage.getItem('user'));
            user_info.cash = user_info.cash - igdCost - otherCost;
            localStorage.setItem('user', JSON.stringify(user_info));
            window.location.href = `../manufactory`
            // console.log(JSON.parse(localStorage.getItem('product_list')));
        }
    }

    return (
        <Box sx={{ height: 700, bgcolor: "#FDF1EF" }}>
            <Grid container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Grid Item xs={4}>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 420,
                            height: 600,
                            bgcolor: "#FFFFFF"
                        },
                    }}>
                        <Paper elevation={4}
                            square={false}
                            sx={{
                                width: 420,
                                height: 600,
                                padding: 2
                            }}>
                            <Typography sx={{ fontFamily: "Noto Sans TC", fontSize: "24px", fontWeight: 700, lineHeight: "35px", letterSpacing: "0em", textAlign: "left" }}>
                                商品目錄
                            </Typography>
                            {
                                dm.dm.map(
                                    (product) => {
                                        return (
                                            <Grid container>
                                                <Grid item xs={4}>
                                                    {product.name}
                                                </Grid>
                                                <Grid item xs={2}>
                                                    {product.type}
                                                </Grid>
                                                <Grid item xs={2}>
                                                    {product.price}
                                                </Grid>
                                            </Grid>
                                        )
                                    }
                                )
                            }
                        </Paper>
                    </Box>
                </Grid>
                {/* 製造指示 */}
                <Grid Item xs={4}>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 420,
                            height: 600,
                            bgcolor: "#FFFFFF"
                        },
                    }}>
                        <Paper elevation={4}
                            square={false}
                            sx={{
                                width: 420,
                                height: 600,
                                padding: 2
                            }}>
                            <Typography sx={{ fontFamily: "Noto Sans TC", fontSize: "24px", fontWeight: 700, lineHeight: "35px", letterSpacing: "0em", textAlign: "left" }}>
                                發布製造指示
                            </Typography>
                            <Grid container>
                                <Grid item xs={12}>
                                    <FormControl>
                                        <InputLabel id="product">生產目標</InputLabel>
                                        <Select
                                            sx={{ bgcolor: '#FDF1EF', width: 150 }}
                                            id="product-select"
                                            label="產品"
                                            onChange={(event) => setTargetName(event.target.value)}>
                                            {
                                                productable.map(
                                                    (product) => (
                                                        <MenuItem key={product.name} value={product.name}>
                                                            {product.name}
                                                        </MenuItem>
                                                    )
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={4} sx={{ borderBottom: 1 }}>生產目標：</Grid>
                                <Grid item xs={4} >
                                    <FormControl>
                                        <InputLabel>生產類型</InputLabel>
                                        <Select sx={{ bgcolor: '#FDF1EF', width: 80, height: 40 }}
                                            id="rank-select"
                                            onChange={(event) => setType(event.target.value)}>
                                            {
                                                typeList.map(
                                                    (rank) => {
                                                        return (
                                                            <MenuItem key={rank} value={rank}>
                                                                {rank}級
                                                            </MenuItem>
                                                        )
                                                    }
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2} >
                                    <FormControl>
                                        <InputLabel id='amount'>生產數量</InputLabel>
                                        <Select
                                            sx={{ bgcolor: '#FDF1EF', width: 80, height: 40 }}
                                            id="product-amount"
                                            label="數量"
                                            onChange={(event) => { setAmount(event.target.value) }}>
                                            <MenuItem value={50}>50</MenuItem>
                                            <MenuItem value={100}>100</MenuItem>
                                            <MenuItem value={150}>150</MenuItem>
                                            <MenuItem value={200}>200</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                    材料：
                                </Grid>
                                {
                                    igd.map(
                                        (ele) => {
                                            return (
                                                <Grid container>
                                                    <Grid item xs={4} ></Grid>
                                                    <Grid item xs={8} sx={{ borderBottom: 1 }}>
                                                        {ele.name}-{ele.amount}單位
                                                    </Grid>
                                                </Grid>
                                            )
                                        }
                                    )
                                }
                                <Grid item />

                                <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                    材料成本：
                                </Grid>
                                <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                    {igdCost}元
                                </Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                    其他費用：
                                </Grid>
                                <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                    {otherCost}元
                                </Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                    共計成本：
                                </Grid>
                                <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                    {otherCost + igdCost}元
                                </Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                    預計耗時：
                                </Grid>
                                <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                    {time}天
                                </Grid>
                                <Grid item xs={4}></Grid>
                            </Grid>
                            <Grid container justifyContent="flex-end">
                                <Button sx={{
                                    "&:hover": { backgroundColor: "#350D08", color: "#FDF1EF" },
                                    backgroundColor: "#E4513D",
                                    color: "#FFFFFF",
                                    borderRadius: 3,
                                    fontFamily: 'Noto Sans TC',
                                    fontSize: '24px',
                                    fontWeight: '400',
                                    lineHeight: '35px',
                                    mt: '30px'
                                }}
                                    onClick={handleProduct}>
                                    開始生產
                                </Button>
                            </Grid>
                        </Paper>
                    </Box>
                </Grid>

                {/* 訂單內容 */}
                <Grid Item xs={4}>
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: 420,
                            height: 600,
                            bgcolor: "#FFFFFF"
                        },
                    }}>
                        <Paper elevation={4}
                            square={false}
                            sx={{
                                width: 420,
                                height: 600,
                                padding: 2
                            }}>
                            <Typography sx={{ fontFamily: "Noto Sans TC", fontSize: "24px", fontWeight: 700, lineHeight: "35px", letterSpacing: "0em", textAlign: "left" }}>
                                訂單
                            </Typography>
                            {
                                contractList.map(
                                    (contract) => {
                                        return (
                                            <div id={contract.contract_id}>
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <Typography sx={{ fontFamily: "Noto Sans TC", fontSize: "24px", fontWeight: 400, lineHeight: "35px", letterSpacing: "0em", textAlign: "left" }}>{contract.buyer}</Typography>
                                                    </Grid>
                                                    {
                                                        contract.package.map(
                                                            (item) => {
                                                                return (
                                                                    <div className={item.name}>
                                                                        <Grid container>
                                                                            <Grid item sx={{ borderBottom: 1, width: 100 }}>
                                                                                <Typography
                                                                                    sx={{
                                                                                        fontFamily: "Noto Sans TC",
                                                                                        fontSize: "16px",
                                                                                        fontWeight: 700,
                                                                                        lineHeight: "23px",
                                                                                        letterSpacing: "0em",
                                                                                        textAlign: "left"
                                                                                    }}>
                                                                                    {
                                                                                        checkStatus(item)
                                                                                    }
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item sx={{ borderBottom: 1, width: 100 }}>
                                                                                {item.name}
                                                                            </Grid>
                                                                            <Grid item sx={{ borderBottom: 1, width: 100 }}>
                                                                                {item.amount}
                                                                            </Grid>
                                                                        </Grid>
                                                                    </div>
                                                                )
                                                            }
                                                        )
                                                    }
                                                    <Grid item xs={4}></Grid>
                                                    <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                                        送達期限：
                                                    </Grid>
                                                    <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                                        {contract.arrive}
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        )
                                    }
                                )
                            }
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
            <Snackbar open={alert} onClose={() => setAlert(false)}>
                <Alert severity="error">倉儲空間不足！</Alert>
            </Snackbar>
        </Box>
    )
}

export default ProductS;