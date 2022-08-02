import React from "react";
import {
    Box, Paper, Grid,
    FormControl, InputLabel, Select, MenuItem, Typography
} from "@mui/material";

function Product() {
    const [amount, setAmount] = React.useState(0);
    const [rankSelected, setRank] = React.useState("");
    const [product, setProduct] = React.useState("");

    const [ingredient, setIgd] = React.useState([]);
    const [rankList, setRankList] = React.useState([]);
    const [mistakeList, setMistake] = React.useState([]);
    const [productList, setProductList] = React.useState(['引擎', '車門']);
    const [igdCost, setIgdCost] = React.useState();

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

    const calIgd = (event) => {
        setProduct(event.target.value);
        // 要思考一下我一次載入所有產品比較合理，還是我每次重選一次產品都要重新抓一次材料
        setIgd([
            {
                name: event.target.value + "的材料",
                amount: 100
            }
        ]);
        setRankList(["B", "C"]);
    }

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

    const handleRank = (event) => {
        setRank(event.target.value);
        calMistake(event.target.value, amount);
    }

    const calAmount = (event) => {
        setAmount(event.target.value);
        const result = ingredient.map(
            igd => {
                console.log(event.target.value);
                console.log(igd.amount);
                return (
                    {
                        name: igd.name,
                        amount: 100 * event.target.value
                        // 這邊的100要改成變數
                    }
                )
            }
        );
        setIgd(result);
        calMistake(rankSelected, amount);
    }

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
                                onChange={calIgd}
                                value={productList}>
                                {
                                    productList.map(
                                        (product) => (
                                            <MenuItem key={product} value={product}>
                                                {product}
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
                                onChange={calAmount}>
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
                                        <Grid item>
                                            廠房選擇（待討論）
                                        </Grid>
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
                        這邊會算成本
                    </Grid>
                    <Grid item>
                        其他費用：
                    </Grid>
                    <Grid item>
                        這邊會算費用
                    </Grid>
                    <Grid item>
                        共計成本：
                    </Grid>
                    <Grid item>
                        這邊是費用加成本的金額
                    </Grid>
                    <Grid item>
                        預計耗時：
                    </Grid>
                    <Grid item>
                        耗時天
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