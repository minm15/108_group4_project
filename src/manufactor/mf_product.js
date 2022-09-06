import React from "react";
import {
    Box, Paper, Grid,
    FormControl, InputLabel, Select, MenuItem, Typography
} from "@mui/material";

function Product() {
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
    const igdList = [
        {
            name: "鑄鐵引擎",
            ingredient: [
                {
                    name: "水冷材料",
                    amount: 1,
                    marketPrice: 0.5
                },
                {
                    name: "鑄鐵",
                    amount: 1,
                    marketPrice: 0.1
                },
                {
                    name: "機油",
                    amount: 1,
                    marketPrice: 0.1
                }
            ],
            cost: 1.5,
            time: 0.1
        },
        {
            name: "鋁製車門",
            ingredient: [
                {
                    name: "鋁合金",
                    amount: 1,
                    marketPrice: 1
                }
            ],
            cost: 1.5,
            time: 0.1
        }
    ]

    // 獲得訂單
    const contractList = [
        {
            contract_id: '訂單編號',
            buyer: '買家',
            good_list: [
                {
                    name: '商品名稱',
                    amount: '數量',
                    status: '正在製造／存貨足夠／不足'
                }
            ],
            change: [
                {
                    name: '商品名稱',
                    amount: '數量',
                    status: '正在製造／存貨足夠／不足'
                }
            ],
            deadline: '送達時間'
        },
        {
            contract_id: '訂單編號',
            buyer: '買家',
            good_list: [
                {
                    name: '商品名稱',
                    amount: '數量',
                    status: '正在製造／存貨足夠／不足'
                }
            ],
            change: [],
            deadline: '送達時間'
        }
    ]


    // 計算其他成本
    function calCost(rankNow, amountNow, target) {
        if (rankNow === "A") {
            setCost(Math.round(target.cost * 1.1 * amountNow));
        } else {
            setCost(Math.round(target.cost * amountNow));
        }
    }

    // 計算誤差
    function calMistake(rankNow, amountNow) {
        if (rankNow !== "" && amountNow > 0) {
            switch (rankNow) {
                case "A":
                    setMistake(
                        [
                            {
                                rank: "B",
                                amount: 0.2 * amountNow
                            },
                            {
                                rank: "C",
                                amount: 0.30 * amountNow
                            }
                        ]
                    );
                    break;
                case "B":
                    setMistake(
                        [
                            {
                                rank: "A",
                                amount: 0.2 * amountNow
                            },
                            {
                                rank: "C",
                                amount: 0.30 * amountNow
                            }
                        ]
                    );
                    break;
                case "C":
                    setMistake(
                        [
                            {
                                rank: "B",
                                amount: 0.20 * amountNow
                            }
                        ]
                    );
                    break;
            }
        }
    }

    // 計算材料
    function calIgd(target, amountNow, rankNow) {
        var costNow = 0;
        var timeNow = 0;
        setIgd(
            target.ingredient.map(
                (igd) => {
                    costNow += igd.amount * amountNow * igd.marketPrice;
                    return (
                        {
                            name: igd.name,
                            amount: Math.round((rankNow === 'C') ? igd.amount * amountNow * 0.9 : igd.amount * amountNow)
                        }
                    )
                }
            )
        );
        timeNow = target.time * amountNow;
        switch (rankNow) {
            case "A":
                timeNow = Math.round(timeNow * 1.1);
                break;
            case "C":
                timeNow = Math.round(timeNow * 0.9);
                costNow = Math.round(costNow * 0.9);
                break;
            default:
                timeNow = Math.round(timeNow);
                costNow = Math.round(costNow);
        }
        setIgdCost(costNow);
        setTime(timeNow);
    }

    // 依照產品調整顯示內容
    const handleIgd = (event) => {
        setProduct(event.target.value);
        const target = igdList.find(ele => ele.name === event.target.value);
        calIgd(target, amount, rank);
        calCost(rank, amount, target);
        setRankList(["A", "B", "C"]);
    }

    // 依照等級調整顯示內容
    const handleRank = (event) => {
        setRank(event.target.value);
        const target = igdList.find(ele => ele.name === product);
        calCost(event.target.value, amount, target);
        calIgd(target, amount, event.target.value);
        calMistake(event.target.value, amount);
    }

    // 依照數量調整顯示內容
    const handleAmount = (event) => {
        setAmount(event.target.value);
        const target = igdList.find(ele => ele.name === product)
        calIgd(target, event.target.value, rank);
        calCost(rank, event.target.value, target);
        calMistake(rank, event.target.value);
    }

    // 生成訂單的表格
    function createContract(contract) {
        if (contract.change.length < 1) {
            return (contract.good_list.map(
                (good) => {
                    return (
                        <div className="goods">
                            <Grid item>
                                {good.status}
                            </Grid>
                            <Grid item>
                                {good.name}
                            </Grid>
                            <Grid item>
                                {good.amount}
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
                                <Grid item>
                                    {good.status}
                                </Grid>
                                <Grid item>
                                    {good.name}
                                </Grid>
                                <Grid item>
                                    {good.amount}
                                </Grid>
                            </div>
                        )
                    }
                )
            );
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
                m: 1,
                width: 1367,
                height: 797,
            },
        }}>
            {/* 商品目錄 */}
            <Paper>
                商品目錄（先跳過）
            </Paper>
            {/* 製造指示 */}
            <Paper>
                <Typography>發布製造指示</Typography>
                <Grid container>
                    <Grid item>
                        <FormControl>
                            <InputLabel id="product">生產目標</InputLabel>
                            <Select
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
                    <Grid item>生產目標：</Grid>
                    <Grid item>
                        <FormControl>
                            <InputLabel>生產等級</InputLabel>
                            <Select id="rank-select" onChange={handleRank}>
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
                    <Grid item>
                        <FormControl>
                            <InputLabel id='amount'>生產數量</InputLabel>
                            <Select
                                id="product-amount"
                                label="數量"
                                onChange={handleAmount}>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                                <MenuItem value={150}>150</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        預期誤差：
                    </Grid>
                    {
                        mistakeList.map(
                            mistake => {
                                return (
                                    <Grid item>{mistake.rank}-{mistake.amount}</Grid>
                                )
                            }
                        )
                    }
                    <Grid item>
                        材料：
                    </Grid>
                    {
                        ingredient.map(
                            igd => {
                                return (
                                    <Grid container>
                                        <Grid item>{igd.name}-{igd.amount}單位</Grid>
                                    </Grid>
                                )
                            }
                        )
                    }
                    <Grid item />
                    <Grid item>
                        材料成本：
                    </Grid>
                    <Grid item>
                        {igdCost}千元
                    </Grid>
                    <Grid item>
                        其他費用：
                    </Grid>
                    <Grid item>
                        {cost}千元
                    </Grid>
                    <Grid item>
                        共計成本：
                    </Grid>
                    <Grid item>
                        {igdCost + cost}千元
                    </Grid>
                    <Grid item>
                        預計耗時：
                    </Grid>
                    <Grid item>
                        {time}天
                    </Grid>
                </Grid>
            </Paper>

            {/* 訂單內容 */}
            <Paper>
                <Typography>訂單</Typography>
                {
                    contractList.map(
                        (contract) => {
                            return (
                                <div id={contract.contract_id}>
                                    <Typography>{contract.buyer}</Typography>
                                    <Grid container>
                                        {createContract(contract).map(
                                            (ele) => {
                                                return ele;
                                            }
                                        )}
                                        <Grid item>
                                            送達期限：
                                        </Grid>
                                        <Grid item>
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
    );
}

export default Product;