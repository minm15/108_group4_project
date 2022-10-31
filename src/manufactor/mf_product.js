import React from "react";
import {
    Box, Paper, Grid,
    FormControl, InputLabel, Select, MenuItem, Typography
} from "@mui/material";
import { get_component_list, get_car_list, cal_grade } from '../data/game_rule';

const Product = ({ user }) => {
    const color = user.type === "供應" ? "#FDF1EF" : "#E3F2FD";
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
    const productable = user.type === "供應" ? get_component_list() : get_car_list();
    const contractList = JSON.parse(localStorage.getItem('contract_list')).filter(
        (contract) => contract.seller === user.name & !contract.sent
    );
    console.log(contractList);
    const storage = JSON.parse(localStorage.getItem('storage')).find((company) => company.company === user.name);

    // form content
    const [targetName, setTargetName] = React.useState();
    const [targetDetail, setTargetDetail] = React.useState();
    const [targetAmount, setAmount] = React.useState();
    const [rank, setRank] = React.useState();
    const [igd, setIgd] = React.useState();
    const [igdCost, setIgdCost] = React.useState();

    const handleTargetName = (event) => {
        setTargetName(event.value);
        setTargetDetail(productable.find((item) => item.name === event.value));
    }

    const handleAmount = (event) => {
        setAmount(event.value);
        if (targetDetail !== undefined) {
            if (user.type === '供應') {
                let igdRequire = targetDetail.detail.find((eachType) => eachType.type === rank);
                if (igdRequire !== undefined) {
                    setIgd(igdRequire.igd.map(
                        (eachIgd) => {
                            return {
                                name: '材料' + eachIgd,
                                amount: event.value
                            }
                        }
                    ));
                }
            } else {
                setIgd(get_component_list().map((ele) => { return ele.name }).map(
                    (item) => {
                        let require = targetDetail.limit.find((product) => product.igd === item);
                        if (require === undefined) {
                            return {
                                name: item,
                                amount: item === '輪胎' ? 4 * event.value : event.value,
                                type: ''
                            }
                        } else {
                            return {
                                name: item,
                                amount: item === '輪胎' ? 4 * event.value : event.value,
                                type: require.type
                            }
                        }
                    }
                ));
            }
        }
    }

    const handleIgdRank = (event) => {
        setIgd(igd.map(
            (eachIgd) => {
                if (eachIgd.name === event.currentTarget.id) {
                    return {
                        name: eachIgd.name,
                        amount: eachIgd.amount,
                        type: event.value
                    }
                } else {
                    return eachIgd;
                }
            }
        ));
    }

    const checkStatus = (item) => {
        let result = '';
        if (producing_list.includes(item.name)) {
            result = '製造中...'
        }
        storage.storage.find((cate) => cate.category === '成品').item.map(
            (eachItem) => {
                if (eachItem.name === item.name) {
                    if (eachItem.amount >= targetAmount) {
                        result = '完成'
                    }
                }
            }
        );
        return result;
    }

    return (
        <Box sx={{ height: 700, bgcolor: color }}>
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
                            width: 250,
                            height: 400,
                            bgcolor: "#FFFFFF"
                        },
                    }}>
                        <Paper elevation={4}
                            square={false}
                            sx={{
                                width: 250,
                                height: 400,
                                padding: 2
                            }}>
                            {/* <Typography sx={{ fontFamily: "Noto Sans TC", fontSize: "24px", fontWeight: 700, lineHeight: "35px", letterSpacing: "0em", textAlign: "left" }}>
                                商品目錄（先跳過）
                            </Typography> */}

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
                            width: 250,
                            height: 400,
                            bgcolor: "#FFFFFF"
                        },
                    }}>
                        <Paper elevation={4}
                            square={false}
                            sx={{
                                width: 250,
                                height: 400,
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
                                            onChange={handleTargetName}>
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
                                    {
                                        user.type === '供應' ?
                                            <FormControl>
                                                <InputLabel>生產類型</InputLabel>
                                                <Select sx={{ bgcolor: '#FDF1EF', width: 80, height: 40 }}
                                                    id="rank-select"
                                                    onChange={(event) => setRank(event.value)}>
                                                    {
                                                        targetDetail === undefined ? null : targetDetail.detail.map(
                                                            (rank) => {
                                                                return (
                                                                    <MenuItem key={rank.type} value={rank.type}>
                                                                        {rank.type}級
                                                                    </MenuItem>
                                                                )
                                                            }
                                                        )
                                                    }
                                                </Select>
                                            </FormControl> :
                                            <Typography>{rank}</Typography>
                                    }
                                </Grid>
                                <Grid item xs={2} >
                                    <FormControl>
                                        <InputLabel id='amount'>生產數量</InputLabel>
                                        <Select
                                            sx={{ bgcolor: '#FDF1EF', width: 80, height: 40 }}
                                            id="product-amount"
                                            label="數量"
                                            onChange={handleAmount}>
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
                                    igd !== undefined ? igd.map(
                                        (ele) => {
                                            if (user.type === '供應') {
                                                return (
                                                    <Grid container>
                                                        <Grid item xs={4} ></Grid>
                                                        <Grid item xs={8} sx={{ borderBottom: 1 }}>{ele.name}-{ele.amount}單位</Grid>
                                                    </Grid>
                                                )
                                            } else {
                                                return (
                                                    <Grid container>
                                                        <Grid item xs={4} />
                                                        <Grid item xs={2} sx={{ borderBottom: 1 }}>
                                                            {ele.name}
                                                        </Grid>
                                                        <Grid item xs={2} sx={{ borderBottom: 1 }}>
                                                            {ele.type === '' ?
                                                                <FormControl>
                                                                    <Select sx={{ bgcolor: '#FDF1EF', width: 80, height: 40 }}
                                                                        id={ele.name}
                                                                        label="等級"
                                                                        onChange={handleIgdRank} >
                                                                        {
                                                                            get_component_list().find(ele.name).detail.map(
                                                                                (eachType) => {
                                                                                    return (
                                                                                        <MenuItem value={eachType.type}>{eachType.type}</MenuItem>
                                                                                    )
                                                                                }
                                                                            )
                                                                        }
                                                                    </Select>
                                                                </FormControl>
                                                                : ele.type
                                                            }
                                                        </Grid>
                                                        <Grid item xs={2} sx={{ borderBottom: 1 }}>
                                                            {ele.amount}
                                                        </Grid>
                                                    </Grid>
                                                )
                                            }
                                        }
                                    ) : null
                                }
                                <Grid item />

                                <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                    材料成本：
                                </Grid>
                                <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                    {targetDetail !== undefined ? user.type === '供應' ?
                                        targetDetail.detail.find((eachType) => eachType.type === rank).avg_cost :
                                        get_component_list().map(
                                            (item) => {
                                                let targetType = igd.find((eachIgd) => eachIgd.name === item.name);
                                                if (targetType === undefined) {
                                                    return 0;
                                                } else {
                                                    return item.detail.find((eachType) => eachType.type === targetType).avg_cost;
                                                }
                                            }
                                        ).reduce((prev, curr) => prev + curr, 0) : 0
                                    }元
                                </Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                    其他費用：
                                </Grid>
                                <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                    {targetDetail !== undefined ? targetDetail.other_cost : 0}元
                                </Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                    共計成本：
                                </Grid>
                                <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                    {targetDetail !== undefined ? user.type === '供應' ?
                                        targetDetail.detail.find((eachType) => eachType.type === rank).avg_cost + targetDetail.other_cost :
                                        get_component_list().map(
                                            (item) => {
                                                let targetType = igd.find((eachIgd) => eachIgd.name === item.name);
                                                if (targetType === undefined) {
                                                    return 0;
                                                } else {
                                                    return item.detail.find((eachType) => eachType.type === targetType).avg_cost;
                                                }
                                            }
                                        ).reduce((prev, curr) => prev + curr, 0) + targetDetail.other_cost : 0
                                    }元
                                </Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                    預計耗時：
                                </Grid>
                                <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                    {targetDetail !== undefined ? Math.ceil(targetAmount / targetDetail.product_per_day) : 0}天
                                </Grid>
                                <Grid item xs={4}></Grid>
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
                            width: 250,
                            height: 400,
                            bgcolor: "#FFFFFF"
                        },
                    }}>
                        <Paper elevation={4}
                            square={false}
                            sx={{
                                width: 250,
                                height: 400,
                                padding: 2
                            }}>
                            <Typography disableTypography sx={{ fontFamily: "Noto Sans TC", fontSize: "24px", fontWeight: 700, lineHeight: "35px", letterSpacing: "0em", textAlign: "left" }}>
                                訂單
                            </Typography>
                            {
                                contractList.map(
                                    (contract) => {
                                        return (
                                            <div id={contract.contract_id}>
                                                <Grid container>
                                                    <Grid item xs={12}>
                                                        <Typography disableTypography sx={{ fontFamily: "Noto Sans TC", fontSize: "24px", fontWeight: 400, lineHeight: "35px", letterSpacing: "0em", textAlign: "left" }}>{contract.buyer}</Typography>
                                                    </Grid>
                                                    {
                                                        contract.package.map(
                                                            (item) => {
                                                                return (
                                                                    <div className={item.name}>
                                                                        <Grid container>
                                                                            <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                                                                <Typography disableTypography sx={{ fontFamily: "Noto Sans TC", fontSize: "16px", fontWeight: 700, lineHeight: "23px", letterSpacing: "0em", textAlign: "left" }}>
                                                                                    {
                                                                                        checkStatus(item)
                                                                                    }
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                                                                {item.name}
                                                                            </Grid>
                                                                            <Grid item xs={4} sx={{ borderBottom: 1 }}>
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
        </Box>
    )
}

export default Product;