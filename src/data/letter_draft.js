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
import getContent from "./letter_content";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
function addDay(day) {
    // 目前時間會奇異的倒轉
    // Thu Apr 02 2020 + 15 = 2020-3-17
    var result = new Date(time);
    result.setDate(result.getDate() + day);
    console.log((new Date(time)).toDateString(), '+', day, '=', result.getFullYear() + '-' + result.getMonth() + '-' + result.getDate());
    return result.getFullYear() + '-' + result.getMonth() + '-' + result.getDate();
}

const time = "2020-4-2";

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
    const [arrive, setArrive] = React.useState();
    // 不同公司不同
    const [address, setAddress] = React.useState(receiver);
    const [addressLoc, setLoc] = React.useState(receiver + '的所在地');
    const [pay, setPay] = React.useState();
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
        // 不同商品量不同
        setArrive(addDay(time, 30));
        setPay(addDay(time, 60));
    }

    const handleSend = (event) => {
        
        console.log(
            {
                amountList: amountList,
                arrive: arrive, 
                address: address,
                addressLoc: addressLoc,
                pay: pay
            }
        );
    }

    return (
        <div className="ingredient-purchase">
            <Typography>
                {receiver}負責人您好：<br />
            </Typography>
            {getContent('igd_purchase')}
           
                <Grid container className="contract-grid">
                    <Grid item>商品品項</Grid>
                    <Grid item>單位報價（元）</Grid>
                    <Grid item>購買數量（份）</Grid>
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
                <Grid item>
                    <Grid item>送達時間</Grid>
                    <Grid item>{arrive}</Grid>
                    <Grid item>送達地址</Grid>
                    <Grid item>{address}</Grid>
                    <Grid item>{addressLoc}</Grid>
                    <Grid item>支付期限</Grid>
                    <Grid item>{addDay(arrive, 30)}</Grid>
                </Grid>
                <Typography className="letter-ending">{user}&emsp;敬上</Typography>
                <Button startIcon={<ForwardToInbox />} onClick={handleSend} href='/letter_list'>送出信件</Button>
            
        </div>
    )
}

// 提供報價單
function Quotation({ detail, user }) {
    const [discount, setDiscount] = React.useState();
    const [choice, setChoice] = React.useState();

    const handleDiscount = (event) => {
        setDiscount(event.target.value);
    }

    const handleChoice = (event) => {
        setChoice(event.target.value);
    }

    const handleSend = (event) => {
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
                {detail.sender}負責人您好：<br />
            </Typography>
            {getContent('quotation')}
            
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
                <Button startIcon={<ForwardToInbox />} href='/letter_list' onClick={handleSend}>送出信件</Button>
            
        </div>
    )
}
// 請求報價單
function Quotation_request({ receiver, user }) {
    const handleSend = (event) => {
        console.log('letter sent from ' + user + ' to ' + receiver);
    }
    return (
        <div classname="quotation">
            <Typography>
                {receiver}負責人您好：<br />
            </Typography>
            {getContent('quotation_request')}
            <Grid container justifyContent="flex-end">
                <Grid Item xs={12}> <Typography className="letter-ending">{user}&emsp;敬上</Typography></Grid>
               
                <Button sx={{"&:hover": { backgroundColor:"#E4513D",color:"#FFFFFF"},backgroundColor: "#FFFFFF" ,color:"#350D08",border:2}} startIcon={<ForwardToInbox />} href='/letter_list' onClick={handleSend}>送出信件</Button>
            </Grid>
        </div>
    )
}

// 訂單草稿
function ContractDraft({ detail, user }) {
    // 主要獲得收件人的地址
    const receiverInfo = {
        name:detail.sender,
        address: "美國"
    }
    
    // 主要獲得寄件人地址
    const userInfo = {
        name: user,
        address: "英國"
    }

    
    // 一些最後表單完成後要交給後端的參數

    const [amountList, setAmount] = React.useState(detail.quotate.map(
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
    
    const [arrive, setArrive] = React.useState();
    const [address, setAddress] = React.useState();
    const [addressLoc, setLoc] = React.useState();
    const [flaw, setFlaw] = React.useState();
    const [flawDate, setFlawDate] = React.useState();
    const [flawRender, setFlawRender] = React.useState();
    const [pay, setPay] = React.useState();

     // 用來加總東西的
     const [total, setTotal] = React.useState(0);
     // 當使用者輸入任何一格數量時，調整畫面上的參數
    const handleAmount = (event) => {
        var totalNow = 0;
        setAmount(
            amountList.map(
                (igd) => {
                    var igdAmount = event.target.id === igd.name ? Number(event.target.value) : igd.amount;
                    totalNow += igdAmount * igd.price;
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
    // 依照使用者選擇的送貨目的地，調整畫面上的參數
    const handleAddress = (event) => {
        setAddress(event.target.value);
        setLoc(event.target.value === detail.receiver ? receiverInfo.address : userInfo.address);
    }

    // 依照使用者選擇的瑕疵處理方式，調整畫面上的參數
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
        console.log('供貨天數:', arrive);
    }
     // 信件送出時，將需要交給後端的參數傳給後端
    const handleSend = (event) => {
        
        console.log(
            {
                amountList: amountList,
                arrive: arrive,
                address: address,
                addressLoc: addressLoc,
                flaw: flaw,
                flawDate: flawDate,
                pay: pay
            }
        )
    }

    return (
        <div className="contract-draft">
            <Typography>
                {detail.receiver}負責人您好：<br />
            </Typography>
            {getContent('contract_draft')}
            
                <Grid container 
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="baseline" className="contract-grid">
                
                    <Grid item xs={3}>商品品項</Grid>
                    <Grid item xs={3}>單位報價（元）</Grid>
                    <Grid item xs={3}>購買數量（份）</Grid>
                    <Grid item xs={3}>售價（千元）</Grid>

                    {
                        amountList.map(
                            (product) => {
                                return (
                                    <div className="quoate-list">
                                        <Grid item xs={3}>{product.name}</Grid>
                                        <Grid item xs={3}>{product.price}</Grid>
                                        <Grid item xs={3}>
                                            <TextField id={product.name} label="amount" onChange={handleAmount} />
                                        </Grid>
                                        <Grid item xs={3}>{product.price * product.amount}</Grid>
                                    </div>
                                )
                            }
                        )
                    }
                    <Grid item>總價（千元）：</Grid>
                    <Grid item>{total / 1000}</Grid>
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
                                <MenuItem value={detail.receiver}>{detail.receiver}</MenuItem>
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
                <Button  variant="contained" color='#350D08' fontFamily='Noto Sans TC' size="big" startIcon={<ForwardToInbox />} href='/letter_list' onClick={handleSend}>送出信件</Button>

        </div>
    )
}

function ContractEdit({ receiver, user, contract }) {
    const receiverInfo = {
        name: receiver,
        address: "美國"
    }

    const userInfo = {
        name: user,
        address: "英國"
    }

    const [amountList, setAmount] = React.useState(
        contract.amountList.map(
            (product) => {
                return (
                    {
                        name: product.name,
                        price: product.price,
                        amount: product.amount,
                        discount: 0,
                        cantProvide: false
                    }
                )
            }
        )
    );
    const [total, setTotal] = React.useState(
        amountList.map(
            (product) => {
                return (
                    product.amount * product.price
                );
            }
        ).reduce((acc, ele) => acc + ele, 0)
    );
    const [arrive, setArrive] = React.useState(contract.arrive);
    const [address, setAddress] = React.useState(contract.address);
    const [addressLoc, setLoc] = React.useState(
        (address === userInfo.name) ? userInfo.address : receiverInfo.address
    );
    const [flaw, setFlaw] = React.useState(contract.flaw);
    const [flawDate, setFlawDate] = React.useState(contract.flawDate);
    const [flawRender, setFlawRender] = React.useState(
        (flaw === 'change') ? (
            <div className="flaw-date">
                <Grid item>處理期限</Grid>
                <Grid item>
                    <FormControl>
                        <Select
                            onChange={(event) => { setFlawDate(Number(event.target.value)); }}
                            defaultValue={flawDate}>
                            <MenuItem value={15 + arrive}>{addDay(15 + arrive)}</MenuItem>
                            <MenuItem value={30 + arrive}>{addDay(30 + arrive)}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </div>
        ) : null
    );
    const [pay, setPay] = React.useState(contract.pay);

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
                        <Select
                            onChange={(event) => { setFlawDate(Number(event.target.value)); }}
                        >
                            <MenuItem value={15 + arrive}>{addDay(15 + arrive)}</MenuItem>
                            <MenuItem value={30 + arrive}>{addDay(30 + arrive)}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </div> : null
        );
        console.log('供貨天數:', arrive);
    }

    const handleProvide = (event) => {
        setAmount(
            amountList.map(
                (product) => {
                    return (
                        {
                            name: product.name,
                            price: product.price,
                            amount: product.amount,
                            discount: product.discount,
                            cantProvide: product.name === event.target.id ? !product.cantProvide : product.cantProvide
                        }
                    )
                }
            )
        );
    }

    const handleDiscount = (event) => {
        var totalNow = 0;
        setAmount(
            amountList.map(
                (product) => {
                    var discount = product.name === event.target.id ? event.target.value : product.discount;
                    totalNow = product.price * product.amount * (1 - discount);
                    return (
                        {
                            name: product.name,
                            price: product.price,
                            amount: product.amount,
                            discount: discount,
                            cantProvide: product.cantProvide
                        }
                    )
                }
            )
        );
        setTotal(totalNow);
    }

    const handleSend= (event) => {
       
        console.log(
            {
                amountList: amountList,
                arrive: arrive,
                address: address,
                addressLoc: addressLoc,
                flaw: flaw,
                flawDate: flawDate,
                pay: pay
            }
        )
    }

    return (
        <div className="contract-edit">
            <Typography>
                {receiver}負責人您好：<br />
            </Typography>
            {getContent('contract_edit')}
            
                <Grid container className="contract-grid">
                
                    <Grid item>無法提供</Grid>
                    <Grid item>商品品項</Grid>
                    <Grid item>單位報價（元）</Grid>
                    <Grid item>購買數量（份）</Grid>
                    <Grid item>折扣（%off）</Grid>
                    <Grid item>售價（千元）</Grid>

                    {
                        amountList.map(
                            (product) => {
                                return (
                                    <div className="quoate-list">
                                        <Grid item id={product.name} onClick={handleProvide}>{product.cantProvide ? "X" : "　　　"}</Grid>
                                        <Grid item>{product.name}</Grid>
                                        <Grid item>{product.price}</Grid>
                                        <Grid item>{product.amount}</Grid>
                                        <Grid item>
                                            <TextField id={product.name} label="discount" onChange={handleDiscount} />
                                        </Grid>
                                        <Grid item>{product.price * product.amount * (1 - product.discount)}</Grid>
                                    </div>
                                )
                            }
                        )
                    }
                    <Grid item>總價（千元）：</Grid>
                    <Grid item>{total / 1000}</Grid>
                </Grid>
                <Grid container className="contract-detail">
                    <Grid item>送達時間</Grid>
                    <Grid item>
                        <FormControl>
                            <Select
                                onChange={(event) => { setArrive(Number(event.target.value)); }}
                                defaultValue={arrive}
                            >
                                <MenuItem value={15}>{addDay(15)}</MenuItem>
                                <MenuItem value={30}>{addDay(30)}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item>送達地址</Grid>
                    <Grid item>
                        <FormControl>
                            <Select
                                onChange={handleAddress}
                                defaultValue={address}
                            >
                                <MenuItem value={receiver}>{receiver}</MenuItem>
                                <MenuItem value={user}>{user}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>位於{addressLoc}</Grid>

                    <Grid item>瑕疵處理</Grid>
                    <Grid item>
                        <FormControl>
                            <Select
                                onChange={handleFlaw}
                                defaultValue={flaw}
                            >
                                <MenuItem value="change">換貨</MenuItem>
                                <MenuItem value="discount">讓價</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {flawRender}

                    <Grid item>支付期限</Grid>
                    <Grid item>
                        <FormControl>
                            <Select
                                onChange={(event) => { setPay(Number(event.target.value)); }}
                                defaultValue={contract.pay}
                            >
                                <MenuItem value={10 + arrive}>{addDay(10 + arrive)}</MenuItem>
                                <MenuItem value={15 + arrive}>{addDay(15 + arrive)}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button startIcon={<ForwardToInbox />} onClick={handleSend} href='/letter_list'>送出信件</Button>
            
        </div>
    )
}

export { IgdPurchase, Quotation, ContractDraft, ContractEdit, Quotation_request };