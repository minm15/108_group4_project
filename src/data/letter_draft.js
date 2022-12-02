import React from "react";
import {
    Grid,
    TextField,
    FormControl, RadioGroup, FormControlLabel, FormLabel, Radio,
    Select, MenuItem,
    Button,
    Typography,
    Box
} from '@mui/material';
import { ForwardToInbox } from "@mui/icons-material";
import getContent from "./letter_content";
import { DataGrid } from "@mui/x-data-grid";
import CustomFooter from "../small_component/customFooter";
import Menu from '@material-ui/core/Menu';

function addDay(day) {
    // 目前時間會奇異的倒轉
    // Thu Apr 02 2020 + 15 = 2020-3-17
    var result = new Date(time);
    result.setDate(result.getDate() + day);
    //console.log((new Date(time)).toDateString(), '+', day, '=', result.getFullYear() + '-' + result.getMonth() + '-' + result.getDate());
    return result.getFullYear() + '-' + result.getMonth() + '-' + result.getDate();
}

const time = "2020-4-2";
// Note: 這一邊的letter_draft，IgdPurchase、Quotation_request是要直接從撰寫信件點進去的
// Quotation、ContractDraft、ContractEdit都是藉由回信，才能夠導到這些頁面
// （註：回信，就是從收到的信件裡面最底下的按鈕，點寄送報價單、發起訂單、調整訂單）
// 所以這個.js檔案裡面提到的detail，都是指要回的那一封信的資訊
// 也就是說，在撰寫提供報價單的信件的時候，那個收件者，是detail的寄件者，就是報價單請求信的寄件人

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
            <Typography sx={{textAlign:'left'}}>
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
                    <Grid item>{Math.ceil(total)}</Grid>
                </Grid>
                <Grid item>
                    <Grid item xs={1}>送達時間</Grid>
                    <Grid item xs={11}>{arrive}</Grid>
                    <Grid item xs={1}>送達地址</Grid>
                    <Grid item xs={2}>{address}</Grid>
                    <Grid item xs={9}>{addressLoc}</Grid>
                    <Grid item xs={1}>支付期限</Grid>
                    <Grid item xs={11}>{addDay(arrive, 30)}</Grid>
                </Grid>
                <Typography className="letter-ending">{user}&emsp;敬上</Typography>
                <Grid container justifyContent="flex-end">
                    <Button sx={{"&:hover": { backgroundColor:"#E4513D",color:"#FFFFFF"},backgroundColor: "#FFFFFF" ,color:"#350D08",border:2}}  startIcon={<ForwardToInbox />} onClick={handleSend} href='/letter_list'>送出信件</Button>
                </Grid>

            
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
            <Typography sx={{textAlign:'left'}}>
                {detail.sender}負責人您好：<br />
            </Typography>
            {getContent('quotation')}
            
                <FormControl className="quotation-price">
                    <FormLabel sx={{textAlign:'left'}}>請選擇報價單之價格調整</FormLabel>
                    <RadioGroup sx={{textAlign:'left'}} onChange={handleChoice}>
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
                <Button  sx={{"&:hover": { backgroundColor:"#E4513D",color:"#FFFFFF"},backgroundColor: "#FFFFFF" ,color:"#350D08",border:2}} startIcon={<ForwardToInbox />} href='/letter_list' onClick={handleSend}>送出信件</Button>
            
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
            <Typography sx={{textAlign:'left'}}>
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
                    id: product.id,
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
                            id: igd.id,
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
        setLoc(event.target.value === detail.sender ? receiverInfo.address : userInfo.address);
    }

    // 依照使用者選擇的瑕疵處理方式，調整畫面上的參數
    const handleFlaw = (event) => {
        setFlaw(event.target.value);
        setFlawRender(event.target.value === "change" ?
            <div className="flaw-date">
                
                <Grid item xs={12}>處理期限</Grid>
                <Grid item xs={6}>
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

    // datagrid的標題（我後來把
    const columns = [
        {
            field: 'name',
            headerName: '商品品項',
            width: 120,
            height: 40
        },
        {
            field: 'price',
            headerName: '單位報價',
            width: 120,
            height: 40
        },
        {
            field: 'amount',
            headerName: '數量',
            width: 120,
            height: 40,
            renderCell: (params) => {
                return (
                    <TextField id={params.row.name} label="amount" onChange={handleAmount} />
                )
            }
        }
    ];

    const rows = amountList;

    const contract_detail_sytle = {
        paddingTop :15
    };

    return (
        <div className="contract-draft">
            <Typography sx={{textAlign:'left'}}>
                {detail.receiver}負責人您好：<br />
            </Typography>
            {getContent('contract_draft')}
             {/* 原本的Grid寫法 */}
            {/* 
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
                </Grid>  */}
            {/* datagrid寫法 */}

            <Box sx={{ height: 350, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    components={{
                        Footer: CustomFooter
                    }}
                    componentsProps={{
                        footer: { total }
                    }}
                />
            </Box>
                {/* 原本的寫法 */}
                {/* <Grid container className="contract-detail" spacing={2}>
                    <Grid item xs={1}>送達時間</Grid>
                    <Grid item xs={11}>
                        <FormControl>
                            <Select onChange={(event) => { setArrive(Number(event.target.value)); }}>
                                <MenuItem value={15}>{addDay(15)}</MenuItem>
                                <MenuItem value={30}>{addDay(30)}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={1}>送達地址</Grid>
                    <Grid item xs={3}>
                        <FormControl>
                            <Select onChange={handleAddress}>
                                <MenuItem value={detail.sender}>{detail.sender}</MenuItem>
                                <MenuItem value={user.name}>{user.name}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={8}>位於{addressLoc}</Grid>

                    <Grid item xs={1}>瑕疵處理</Grid>
                    <Grid item xs={11}>
                        <FormControl>
                            <Select onChange={handleFlaw}>
                                <MenuItem value="change">換貨</MenuItem>
                                <MenuItem value="discount">讓價</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {flawRender}
                   

                    <Grid item xs={1}>支付期限</Grid>
                    <Grid item xs={11}>
                        <FormControl>
                            <Select onChange={(event) => { setPay(Number(event.target.value)); }}>
                                <MenuItem value={10 + arrive}>{addDay(10 + arrive)}</MenuItem>
                                <MenuItem value={15 + arrive}>{addDay(15 + arrive)}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Button  sx={{"&:hover": { backgroundColor:"#E4513D",color:"#FFFFFF"},backgroundColor: "#FFFFFF" ,color:"#350D08",border:2}} variant="contained"  fontFamily='Noto Sans TC' size="big" startIcon={<ForwardToInbox />} href='/letter_list' onClick={handleSend}>送出信件</Button>
                </Grid> */}

                <Grid container className="contract-detail" rowSpacing={5} style={contract_detail_sytle}>
                    <Grid container item spacing={3}>
                        <Grid item xs={1}>送達時間</Grid>
                        <Grid item xs={6}>
                            <FormControl style={{minWidth: 160}}>
                                <Select onChange={(event) => { setArrive(Number(event.target.value)); }}>
                                    <MenuItem value={15} style={{maxWidth: 500}}>{addDay(15)}</MenuItem>
                                    <MenuItem value={30} style={{maxWidth: 500}}>{addDay(30)}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container item spacing={3}>
                        <Grid item xs={1}>送達地址(位於{addressLoc})</Grid>
                        <Grid item xs={6}>
                            <FormControl style={{minWidth: 160}}>
                                <Select onChange={handleAddress}>
                                    <MenuItem value={detail.sender}>{detail.sender}</MenuItem>
                                    <MenuItem value={user.name}>{user.name}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* <Grid item xs={4}>位於{addressLoc}</Grid> */}
                    </Grid>

                    <Grid container item spacing={3}>
                        <Grid item xs={1}>瑕疵處理</Grid>
                        <Grid item xs={6}>
                            <FormControl style={{minWidth: 160}}>
                                <Select onChange={handleFlaw}>
                                    <MenuItem value="change">換貨</MenuItem>
                                    <MenuItem value="discount">讓價</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {flawRender}
                    </Grid>

                    <Grid container item spacing={3}>
                        <Grid item xs={1}>支付期限</Grid>
                        <Grid item xs={6}>
                            <FormControl style={{minWidth: 160}}>
                                <Select onChange={(event) => { setPay(Number(event.target.value)); }}>
                                    <MenuItem value={10 + arrive}>{addDay(10 + arrive)}</MenuItem>
                                    <MenuItem value={15 + arrive}>{addDay(15 + arrive)}</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Button  sx={{"&:hover": { backgroundColor:"#E4513D",color:"#FFFFFF"},backgroundColor: "#FFFFFF" ,color:"#350D08",border:2}} variant="contained"  fontFamily='Noto Sans TC' size="big" startIcon={<ForwardToInbox />} href='/letter_list' onClick={handleSend}>送出信件</Button>
                </Grid>

        </div>
    )
}

// 訂單調整
function ContractEdit({ detail, user }) {
    const receiverInfo = {
        name: detail.sender,
        address: "美國"
    }

    const userInfo = {
        name: user,
        address: "英國"
    }

    const [amountList, setAmount] = React.useState(
        detail.amountList.map(
            (product) => {
                return (
                    {
                        id: product.id,
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
    const [arrive, setArrive] = React.useState(detail.arrive);
    const [address, setAddress] = React.useState(detail.address);
    const [addressLoc, setLoc] = React.useState(
        (address === userInfo.name) ? userInfo.address : receiverInfo.address
    );
    const [flaw, setFlaw] = React.useState(detail.flaw);
    const [flawDate, setFlawDate] = React.useState(detail.flawDate);
    const [flawRender, setFlawRender] = React.useState(
        (flaw === 'change') ? (
            <div className="flaw-date">
                
                <Grid container>
                 <Grid item xs={12}>處理期限</Grid>
                <Grid item >{/**一開始是undefined，所以不能加xs... */}
                    <FormControl>
                        <Select
                            onChange={(event) => { setFlawDate(Number(event.target.value)); }}
                            defaultValue={flawDate}>
                            <MenuItem value={15 + arrive}>{addDay(15 + arrive)}</MenuItem>
                            <MenuItem value={30 + arrive}>{addDay(30 + arrive)}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                </Grid>
                
            </div>
        ) : null
    );
    const [pay, setPay] = React.useState(detail.pay);

    const handleAddress = (event) => {
        setAddress(event.target.value);
        setLoc(event.target.value === detail.sender ? receiverInfo.address : userInfo.address);
    }

    const handleFlaw = (event) => {
        setFlaw(event.target.value);
        setFlawRender(event.target.value === "change" ?
            <div className="flaw-date">
                <Grid Container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing='5'
                padding='5'
                >
                 <Grid item xs={6}>
                    
                    處理期限
                  
                    </Grid>
                <Grid item xs={6}>
                    <FormControl>
                        <Select
                            onChange={(event) => { setFlawDate(Number(event.target.value)); }}
                        >
                            <MenuItem value={15 + arrive}>{addDay(15 + arrive)}</MenuItem>
                            <MenuItem value={30 + arrive}>{addDay(30 + arrive)}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                </Grid>
            </div> : null
        );
        console.log('供貨天數:', arrive);
    }

  // 給Grid用的
    // const handleProvide = (event) => {
    //     setAmount(
    //         amountList.map(
    //             (product) => {
    //                 return (
    //                     {
    //                         id: product.id,
    //                         name: product.name,
    //                         price: product.price,
    //                         amount: product.amount,
    //                         discount: product.discount,
    //                         cantProvide: product.name === event.target.id ? !product.cantProvide : product.cantProvide
    //                     }
    //                 )
    //             }
    //         )
    //     );
    // }
    // 給Datagrid用的
    // 因為是配合onCellClick，所以多一層判斷他是點哪一個欄位
    const handleProvide = (params) => {
        if (params.field === 'provide') {
            setAmount(
                amountList.map(
                    (product) => {
                        return ( 
                            {
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            amount: product.amount,
                            discount: product.discount,
                            cantProvide: product.id === params.row.id ? !product.cantProvide : product.cantProvide
                        }
                    )
                }
            )
        );
    }
}

    const handleDiscount = (event) => {
        var totalNow = 0;
        setAmount(
            amountList.map(
                (product) => {
                    var discount = product.name === event.target.id ? Number(event.target.value): product.discount;
                    totalNow += product.price * product.amount * discount;
                    return (
                        {
                            id: product.id,
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

     // datagrid用的標題
     const columns = [
        {
            field: 'provide',
            headerName: '無法提供',
            width: 120,
            height: 40,
            renderCell: (params) => {
                return (params.row.cantProvide ? "X" : "　　　");
            }
        },
        {
            field: 'name',
            headerName: '商品品項',
            width: 120,
            height: 40
        },
        {
            field: 'price',
            headerName: '單位報價',
            width: 120,
            height: 40
        },
        {
            field: 'amount',
            headerName: '購買數量',
            width: 120,
            height: 40
        },
        {
            field: 'discount',
            headerName: '折扣',
            width: 120,
            height: 40,
            renderCell: (params) => {
                return (
                    <TextField id={params.row.name} label="discount" onChange={handleDiscount} />
                )
            }
        }
    ]
    // datagrid用的內容
    const rows = amountList;
    return (
        <div className="contract-edit">
            <Typography sx={{textAlign:'left'}}>
                {detail.sender}負責人您好：<br />
            </Typography>
            {getContent('contract_edit')}
             {/* 原本的Grid寫法 */}
                {/*  <Grid container className="contract-grid">
                
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
                </Grid>*/}
                 {/* datagrid寫法 */}
                {/* CustomFooter在small_component的資料夾底下，調整css要過去調 */}
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        components={{
                            Footer: CustomFooter
                        }}
                        componentsProps={{
                            footer: { total }
                        }}
                        onCellClick={handleProvide}
                    />
                </Box>
                <Grid container className="contract-detail">
                    <Grid item xs={1}>送達時間</Grid>
                    <Grid item xs={11}>
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

                    <Grid item xs={1}>送達地址</Grid>
                    <Grid item xs={2}>
                        <FormControl>
                            <Select
                                onChange={handleAddress}
                                defaultValue={address}
                            >
                                <MenuItem value={detail.sender}>{detail.sender}</MenuItem>
                                <MenuItem value={user.name}>{user.name}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={9}>位於{addressLoc}</Grid>

                    <Grid item xs={1}>瑕疵處理</Grid>
                    <Grid item xs={11}>
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
                    <Grid item xs={12}>{flawRender}</Grid>
                    

                    <Grid item xs={2}>支付期限</Grid>
                    <Grid item xs={10}>
                        <FormControl>
                            <Select
                                onChange={(event) => { setPay(Number(event.target.value)); }}
                                defaultValue={detail.pay}
                            >
                                <MenuItem value={10 + arrive}>{addDay(10 + arrive)}</MenuItem>
                                <MenuItem value={15 + arrive}>{addDay(15 + arrive)}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Button  sx={{"&:hover": { backgroundColor:"#E4513D",color:"#FFFFFF"},backgroundColor: "#FFFFFF" ,color:"#350D08",border:2}} startIcon={<ForwardToInbox />} onClick={handleSend} href='/letter_list'>送出信件</Button>
                </Grid>
            
        </div>
    )
}

export { IgdPurchase, Quotation, ContractDraft, ContractEdit, Quotation_request };