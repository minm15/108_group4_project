import React from "react";
import {
    Box, Paper, Grid,
    FormControl, InputLabel, Select, MenuItem, Typography
} from "@mui/material";
import {get_component_list, get_car_list} from '../data/game_rule';

function ProductOld({user}) {
    const [amount, setAmount] = React.useState(0);
    const [rank, setRank] = React.useState("");
    const [product, setProduct] = React.useState("");

    const [ingredient, setIgd] = React.useState([]);
    const [rankList, setRankList] = React.useState([]);
    const [mistakeList, setMistake] = React.useState([]);
    const [igdCost, setIgdCost] = React.useState();
    const [cost, setCost] = React.useState();
    const [time, setTime] = React.useState();

    // 參數
    const [efficient, setEfficient] = React.useState(true);
    const [thrift, setThrift] = React.useState(0.5);

    // 獲得每個產品的生產資訊
    const igdList = user.type === '供應' ? get_component_list() : get_car_list();

    // 獲得訂單
    const contractList = JSON.parse(localStorage.getItem('contract_list')).filter(
        (contract) => contract.seller === user.name & !contract.sent
    );
    
    // const contractList = [
    //     {
    //         contract_id: '訂單編號',
    //         buyer: '買家',
    //         good_list: [
    //             {
    //                 name: '商品名稱',
    //                 amount: '數量',
    //                 status: '正在製造／存貨足夠／不足'
    //             }
    //         ],
    //         change: [
    //             {
    //                 name: '商品名稱',
    //                 amount: '數量',
    //                 status: '正在製造／存貨足夠／不足'
    //             }
    //         ],
    //         deadline: '送達時間'
    //     },
    //     {
    //         contract_id: '訂單編號',
    //         buyer: '買家',
    //         good_list: [
    //             {
    //                 name: '商品名稱',
    //                 amount: '數量',
    //                 status: '正在製造／存貨足夠／不足'
    //             }
    //         ],
    //         change: [],
    //         deadline: '送達時間'
    //     }
    // ]


    // 計算其他成本
    // function calCost(rankNow, amountNow, target) {
    //     if (rankNow === "A") {
    //         setCost(Math.round(target.cost * 1.1 * amountNow));
    //     } else {
    //         setCost(Math.round(target.cost * amountNow));
    //     }
    // }

    // 計算誤差
    // function calMistake(rankNow, amountNow) {
    //     if (rankNow !== "" && amountNow > 0) {
    //         switch (rankNow) {
    //             case "A":
    //                 setMistake(
    //                     [
    //                         {
    //                             rank: "B",
    //                             amount: 0.2 * amountNow
    //                         },
    //                         {
    //                             rank: "C",
    //                             amount: 0.30 * amountNow
    //                         }
    //                     ]
    //                 );
    //                 break;
    //             case "B":
    //                 setMistake(
    //                     [
    //                         {
    //                             rank: "A",
    //                             amount: 0.2 * amountNow
    //                         },
    //                         {
    //                             rank: "C",
    //                             amount: 0.30 * amountNow
    //                         }
    //                     ]
    //                 );
    //                 break;
    //             case "C":
    //                 setMistake(
    //                     [
    //                         {
    //                             rank: "B",
    //                             amount: 0.20 * amountNow
    //                         }
    //                     ]
    //                 );
    //                 break;
    //         }
    //     }
    // }

    // 計算材料
    // function calIgd(target, amountNow, rankNow) {
    //     var costNow = 0;
    //     var timeNow = 0;
    //     var amountAfter = amountNow;
    //     if (rankNow === "C") {
    //         amountAfter = amountNow * 0.9;
    //     }
    //     if (thrift) {
    //         amountAfter = amountNow * 0.9;
    //     }
    //     setIgd(
    //         target.ingredient.map(
    //             (igd) => {
    //                 costNow += igd.amount * amountAfter * igd.marketPrice;
    //                 return (
    //                     {
    //                         name: igd.name,
    //                         amount: Math.round(igd.amount * amountAfter)
    //                     }
    //                 )
    //             }
    //         )
    //     );
    //     timeNow = target.time * amountNow;
    //     switch (rankNow) {
    //         case "A":
    //             timeNow = Math.round(timeNow * 1.1);
    //             break;
    //         case "C":
    //             timeNow = Math.round(timeNow * 0.9);
    //             costNow = Math.round(costNow * 0.9);
    //             break;
    //         default:
    //             timeNow = Math.round(timeNow);
    //             costNow = Math.round(costNow);
    //     }
    //     setIgdCost(costNow);
    //     setTime(timeNow);
    // }

    // 依照產品調整顯示內容
    // const handleIgd = (event) => {
    //     setProduct(event.target.value);
    //     const target = igdList.find(ele => ele.name === event.target.value);
    //     calIgd(target, amount, rank);
    //     calCost(rank, amount, target);
    //     setRankList(["A", "B", "C"]);
    // }

    // 依照等級調整顯示內容
    // const handleRank = (event) => {
    //     setRank(event.target.value);
    //     const target = igdList.find(ele => ele.name === product);
    //     calCost(event.target.value, amount, target);
    //     calIgd(target, amount, event.target.value);
    //     calMistake(event.target.value, amount);
    // }

    // 依照數量調整顯示內容
    // const handleAmount = (event) => {
    //     setAmount(event.target.value);
    //     const target = igdList.find(ele => ele.name === product)
    //     calIgd(target, event.target.value, rank);
    //     calCost(rank, event.target.value, target);
    //     calMistake(rank, event.target.value);
    // }

    // 生成訂單的表格
    function createContract(contract) {
        if (contract.change.length < 1) {
            return (contract.good_list.map(
                (good) => {
                    return (
                        <div className="goods">
                            <Grid container>
                                <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                    <Typography disableTypography sx={{ fontFamily: "Noto Sans TC", fontSize: "16px", fontWeight: 700, lineHeight: "23px", letterSpacing: "0em", textAlign: "left" }}>
                                        {good.status}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                    {good.name}
                                </Grid>
                                <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                    {good.amount}
                                </Grid>
                            </Grid>
                        </div>
                    )
                }
            )
            );
        } else {
            return (
                contract.change.map(
                    (good) => {
                        return (
                            <div className="change">
                                <Grid container>
                                    <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                        <Typography disableTypography sx={{ fontFamily: "Noto Sans TC", fontSize: "16px", fontWeight: 700, lineHeight: "23px", letterSpacing: "0em", textAlign: "left" }}>
                                            {good.status}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                        {good.name}

                                    </Grid>
                                    <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                        {good.amount}
                                    </Grid>
                                </Grid>
                            </div>
                        )
                    }
                )
            );
        }
    }

    return (
        <div div className="mf_product">
            {/* 商品目錄 */}
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
                                    商品目錄（先跳過）
                                </Typography>
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
                                <Typography disableTypography sx={{ fontFamily: "Noto Sans TC", fontSize: "24px", fontWeight: 700, lineHeight: "35px", letterSpacing: "0em", textAlign: "left" }}>
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
                                                onChange={handleIgd}>
                                                {
                                                    igdList.map(
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
                                            <Select sx={{ bgcolor: '#FDF1EF', width: 80, height: 40 }} id="rank-select" onChange={handleRank}>
                                                {
                                                    rankList.map(
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
                                                onChange={handleAmount}>
                                                <MenuItem value={50}>50</MenuItem>
                                                <MenuItem value={100}>100</MenuItem>
                                                <MenuItem value={150}>150</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2}></Grid>
                                    {/* <Grid item xs={4} sx={{borderBottom:1}}>
                        預期誤差：
                    </Grid>
                    {
                        mistakeList.map(
                            mistake => {
                                return (
                                    <Grid container>
                                        <Grid item xs={4} ></Grid>
                                        <Grid item xs={8} sx={{borderBottom:1}}>{mistake.rank}-{mistake.amount}</Grid>
                                    </Grid>
                                    
                                    
                                )
                            }
                        )
                    } */}
                                    <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                        材料：
                                    </Grid>
                                    {
                                        ingredient.map(
                                            igd => {
                                                return (
                                                    <Grid container>
                                                        <Grid item xs={4} ></Grid>
                                                        <Grid item xs={8} sx={{ borderBottom: 1 }}>{igd.name}-{igd.amount}單位</Grid>
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
                                        {cost}元
                                    </Grid>
                                    <Grid item xs={4}></Grid>
                                    <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                        共計成本：
                                    </Grid>
                                    <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                        {igdCost + cost}元
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
                                                        {createContract(contract).map(
                                                            (ele) => {
                                                                return ele;
                                                            }
                                                        )}
                                                        <Grid item xs={4}></Grid>
                                                        <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                                            送達期限：
                                                        </Grid>
                                                        <Grid item xs={4} sx={{ borderBottom: 1 }}>
                                                            {contract.deadline}
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
        </div>
    );
}

// export default Product;