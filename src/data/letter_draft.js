import React from "react";
import {
    Grid,
    TextField,
    FormControl, RadioGroup, FormControlLabel, FormLabel, Radio,
    Select, MenuItem,
    Button,
    Typography
} from '@mui/material';
import { ForwardToInbox } from "@mui/icons-material";

// 材料下訂
function IgdPurchase({ receiver, user }) {
    const igdList = [
        {
            name: "品項1",
            price: 1000
        },
        {
            name: "品項2",
            price: 500
        }
    ];

    const [amountList, setAmount] = React.useState(
        igdList.map(
            (igd) => {
                return (
                    {
                        name: igd.name,
                        price: igd.price,
                        amount: 0
                    }
                )
            }
        )
    );
    const [total, setTotal] = React.useState();

    const handleAmount = (event) => {
        var totalNow = 0;
        setAmount(
            amountList.map(
                (igd) => {
                    var igdAmount = event.target.id === igd.name ? Number(event.target.value) : igd.amount;
                    totalNow += igdAmount;
                    return (
                        {
                            name: igd.name,
                            price: igd.price,
                            amount: igdAmount
                        }
                    )
                }
            )
        );
        setTotal(totalNow);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(amountList);
    }

    return (
        <div className="ingredient-purchase">
            <Typography>
                {receiver}負責人您好：<br />
                &emsp;敝公司依貴公司提供之報價，訂單如下：
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container className="contract-grid">
                    <Grid item>商品品項</Grid>
                    <Grid item>單位報價（元）</Grid>
                    <Grid item>購買數量（噸）</Grid>
                    <Grid item>售價（千元）</Grid>
                    {
                        amountList.map(
                            (igd) => {
                                return (
                                    <div className="purchase-form">
                                        <Grid item>{igd.name}</Grid>
                                        <Grid item>{igd.price}</Grid>
                                        <Grid item>
                                            <TextField id={igd.name} label="amount" onChange={handleAmount} />
                                        </Grid>
                                        <Grid item>{igd.price * igd.amount}</Grid>
                                    </div>
                                )
                            }
                        )
                    }
                    <Grid item>總價（千元）：</Grid>
                    <Grid item>{Math.round(total)}</Grid>
                </Grid>
                <Typography className="letter-ending">{user}&emsp;敬上</Typography>
                <Button startIcon={<ForwardToInbox />} type="submit">送出信件</Button>
            </form>
        </div>
    )
}

// 提供報價單
function Quotation({ receiver, user }) {
    const [discount, setDiscount] = React.useState();
    const [choice, setChoice] = React.useState();

    const handleDiscount = (event) => {
        setDiscount(event.target.value);
    }

    const handleChoice = (event) => {
        setChoice(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const quotate = [
            {
                name: "螺絲",
                price: 100
            },
            {
                name: "休旅車車門",
                price: 1000
            }
        ]
        if (choice === "normal") {
            console.log(quotate);
        } else if (choice === "adjust") {
            console.log(quotate.map(
                (product) => {
                    return (
                        {
                            name: product.name,
                            price: product.price * discount
                        }
                    )
                }
            ))
        } else {
            console.log('no input');
        }
    }

    return (
        <div classname="quotation">
            <Typography>
                {receiver}負責人您好：<br />
                &emsp;敝公司報價單如下，提醒您，本報價單為本月之計價方式。
                若逾期，煩請另索取一次報價單，謝謝！
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormControl className="quotation-price">
                    <FormLabel>請選擇報價單之價格調整</FormLabel>
                    <RadioGroup onChange={handleChoice}>
                        <FormControlLabel value="normal" control={<Radio />} label="提供預設價格之報價單" />
                        <FormControlLabel value="adjust" control={<Radio />} label={
                            <div className="discount-textfield">
                                提供
                                <TextField id="discount" onChange={handleDiscount} />
                                的價格
                            </div>
                        } />
                    </RadioGroup>
                </FormControl>
                <Typography className="letter-ending">{user}&emsp;敬上</Typography>
                <Button type='submit' startIcon={<ForwardToInbox />}>送出信件</Button>
            </form>
        </div>
    )
}

// 訂單草稿
function ContractDraft({ receiver, user }) {
    const time = "2020-4-2"

    const receiverInfo = {
        name: receiver,
        address: "美國"
    }

    const userInfo = {
        name: user,
        address: "英國"
    }

    const quotate = [
        {
            name: "螺絲",
            price: 100
        },
        {
            name: "休旅車車門",
            price: 1000
        }
    ]

    const [amountList, setAmount] = React.useState(quotate.map(
        (product) => {
            return (
                {
                    name: product.name,
                    price: product.price,
                    amount: 0
                }
            )
        }
    ));
    const [total, setTotal] = React.useState(0);
    const [arrive, setArrive] = React.useState();
    const [address, setAddress] = React.useState();
    const [addressLoc, setLoc] = React.useState();
    const [flaw, setFlaw] = React.useState();
    const [flawDate, setFlawDate] = React.useState();
    const [flawRender, setFlawRender] = React.useState();
    const [pay, setPay] = React.useState();

    const handleAmount = (event) => {
        var totalNow = 0;
        setAmount(
            amountList.map(
                (igd) => {
                    var igdAmount = event.target.id === igd.name ? Number(event.target.value) : igd.amount;
                    totalNow += igdAmount*igd.price;
                    return (
                        {
                            name: igd.name,
                            price: igd.price,
                            amount: igdAmount
                        }
                    )
                }
            )
        );
        setTotal(totalNow);
    }

    const handleAddress = (event) => {
        setAddress(event.target.value);
        setLoc(event.target.value === receiver ? receiverInfo.address : userInfo.address);
    }

    const handleFlaw = (event) => {
        setFlaw(event.target.value);
        setFlawRender(event.target.value === "change" ?
            <div className="flaw-date">
                <Grid item>處理期限</Grid>
                <Grid item>
                    <FormControl>
                        <Select onChange={(event) => { setFlawDate(Number(event.target.value)); }}>
                            <MenuItem value={15 + arrive}>{addDay(15 + arrive)}</MenuItem>
                            <MenuItem value={30 + arrive}>{addDay(30 + arrive)}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </div> : null
        );
        console.log('供貨天數:',arrive);
    }

    function addDay(day) {
        // 目前時間會奇異的倒轉
        // Thu Apr 02 2020 + 15 = 2020-3-17
        var result = new Date(time);
        result.setDate(result.getDate() + day);
        console.log((new Date(time)).toDateString(), '+', day, '=', result.getFullYear() + '-' + result.getMonth() + '-' + result.getDate());
        return result.getFullYear() + '-' + result.getMonth() + '-' + result.getDate();
    }

    return (
        <div className="contract-draft">
            <Typography>
                {receiver}負責人您好：<br />
                &emsp;敝公司報價單如下，提醒您，本報價單為本月之計價方式。
                若逾期，煩請另索取一次報價單，謝謝！
            </Typography>
            <form>
            <Grid container className="contract-grid">
                <Grid item>商品品項</Grid>
                <Grid item>單位報價（元）</Grid>
                <Grid item>購買數量（噸）</Grid>
                <Grid item>售價（千元）</Grid>

                {
                    amountList.map(
                        (product) => {
                            return (
                                <div className="quoate-list">
                                    <Grid item>{product.name}</Grid>
                                    <Grid item>{product.price}</Grid>
                                    <Grid item>
                                        <TextField id={product.name} label="amount" onChange={handleAmount} />
                                    </Grid>
                                    <Grid item>{product.price * product.amount}</Grid>
                                </div>
                            )
                        }
                    )
                }
                <Grid item>總價（千元）：</Grid>
                <Grid item>{total/1000}</Grid>
            </Grid>
            <Grid container className="contract-detail">
                <Grid item>送達時間</Grid>
                <Grid item>
                    <FormControl>
                        <Select onChange={(event) => { setArrive(Number(event.target.value)); }}>
                            <MenuItem value={15}>{addDay(15)}</MenuItem>
                            <MenuItem value={30}>{addDay(30)}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item>送達地址</Grid>
                <Grid item>
                    <FormControl>
                        <Select onChange={handleAddress}>
                            <MenuItem value={receiver}>{receiver}</MenuItem>
                            <MenuItem value={user}>{user}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>位於{addressLoc}</Grid>

                <Grid item>瑕疵處理</Grid>
                <Grid item>
                    <FormControl>
                        <Select onChange={handleFlaw}>
                            <MenuItem value="change">換貨</MenuItem>
                            <MenuItem value="discount">讓價</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {flawRender}

                <Grid item>支付期限</Grid>
                <Grid item>
                    <FormControl>
                        <Select onChange={(event) => { setPay(Number(event.target.value)); }}>
                            <MenuItem value={10 + arrive}>{addDay(10 + arrive)}</MenuItem>
                            <MenuItem value={15 + arrive}>{addDay(15 + arrive)}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            </form>
        </div>
    )
}

export { IgdPurchase, Quotation, ContractDraft };