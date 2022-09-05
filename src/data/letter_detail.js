import React from "react"
// 用到的mui物件
import {
    RadioGroup, FormControl, Radio, FormLabel, FormControlLabel,
    Box, TextField,
    Grid,
    Typography,
    Button
} from '@mui/material';
// 用到的mui icon
import { LocalGroceryStore, ForwardToInbox, Check, Close } from "@mui/icons-material";
// 其他js檔案的內容
// getContent是用來獲得信件資訊的，像是寄件人、訂單內容，之後應該要改接後端
import getContent from "./letter_content";
// MenuList是撰寫信件、所有信件等的選單
import MenuList from "../Letter/menu";
import { DataGrid } from "@mui/x-data-grid";

import CustomFooter from "../small_component/customFooter";

// Operation: 營運支出計畫
const Operation = ({ detail, user }) => {
    // choice: 營運支出信會需要回傳這個月的支出計畫
    const [choice, setChoice] = React.useState();

    // 營運支出信的確認鈕，向後端傳遞使用者選擇的結果
    // more: 增加支出；normal: 正常支出；less: 減少支出
    const handleOperation = (event) => {
        console.log({
            choice: choice,
            user: user
        })
    }

    return (
        <div className="operation">
            &emsp;上個月營運支出共計{detail.payment}元。並請您確認本月支出計畫，謝謝！<br />
            {/* 選擇這個月支出計畫的Radio Button */}
            <FormControl>
                <FormLabel>本月支出計畫：</FormLabel>
                {/* 預設值是上一次的支出計畫 */}
                <RadioGroup
                    defaultValue={detail.last_plan}
                    onChange={(event) => { setChoice(event.target.value) }}
                >
                    <FormControlLabel value="less" control={<Radio />} label="減少支出，共體時艱" />
                    <FormControlLabel value="normal" control={<Radio />} label="正常營運，正常支出" />
                    <FormControlLabel value="more" control={<Radio />} label="增加支出，增進企業形象" />
                </RadioGroup>
            </FormControl>
            {/* 按鈕會導回所有信件的頁面，並且向後端傳遞本月支出計畫 */}
            <Grid container justifyContent="flex-end">
              
            <Button sx={{"&:hover": { backgroundColor:"#E4513D",color:"#FFFFFF"},backgroundColor: "#FFFFFF" ,color:"#350D08",border:2}} startIcon={<ForwardToInbox />} onClick={handleOperation} href="/letter_list">確認支出</Button>
            </Grid>
        
        </div>
    );
}

// QuotationRequest: 報價單請求
const QuotationRequest = ({ detail, user }) => {
    return (
        <div className="quotation_request">
            <Typography>{user.name} 負責人您好：</Typography>
            {getContent('quotation_request')}
            <Grid container justifyContent="flex-end"><Typography>{detail.sender}敬上</Typography></Grid>
            {/* 直接帶著信件id過去撰寫信件，雖然要再從後端叫一次信件資訊，至少我不用再研究怎麼從傳值的問題 */}
            <Button sx={{"&:hover": { backgroundColor:"#E4513D",color:"#FFFFFF"},backgroundColor: "#FFFFFF" ,color:"#350D08",border:2}} 

                startIcon={<ForwardToInbox />}
                href={`/letter_list/${detail.id}`}>
                提供報價單
            </Button>
        </div>
    );
}

// Quotation: 報價單
const Quotation = ({ detail }) => {
    // datagrid的標題
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
        }
    ]

    // datagrid的內容物
    // 報價單儲存的變數名稱為quotate，會記錄在信件裡面，或是由後端生成（可能有價格調整問題）
    const rows = detail.quotate;

    return (
        <div className="quotation">
            {getContent('quotation')}
            {/* 這段是原本用Grid寫的 */}
            {/* <Grid container>
                <Grid item>商品品項</Grid>
                <Grid item>單位報價</Grid>
            </Grid>
            {
                detail.quotate.map(
                    (product) => {
                        return (
                            <Grid container>
                                <Grid item>{product.name}</Grid>
                                <Grid item>{product.price}</Grid>
                            </Grid>
                        )
                    }
                )
            } */}
            {/* DataGrid版本 */}
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                />
            </Box>
            <Grid container justifyContent="flex-end"><Typography>{detail.sender}敬上</Typography></Grid>
            <Grid container justifyContent="flex-end">            
                <Button sx={{"&:hover": { backgroundColor:"#E4513D",color:"#FFFFFF"},backgroundColor: "#FFFFFF" ,color:"#350D08",border:2}} startIcon={<LocalGroceryStore />} href={`/letter_writing/${detail.id}`}>前往下訂</Button>
            </Grid>
        </div>
    )
}

// ContractDraft: 訂單草稿
const ContractDraft = ({ detail }) => {
    // 用來加總東西的
    const [total, setTotal] = React.useState(0);
    // datagrid的標題
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
            height: 40
        }
    ];

    // datagrid的內容物
    const rows = detail.amountList;

    return (
        <div className="contract-draft">
            {/* 獲取信件前半段的文字敘述內容 */}
            {getContent('contract_draft')}
            {/* 原本的Grid寫法 */}
            {/* <Grid container>
                <Grid item>商品品項</Grid>
                <Grid item>單位報價</Grid>
                <Grid item>購買數量</Grid>
                <Grid item>售價</Grid>
                {
                    detail.amountList.map(
                        (product) => {
                            return (
                                <div className="draft-products">
                                    <Grid item>{product.name}</Grid>
                                    <Grid item>{product.price}</Grid>
                                    <Grid item>{product.amount}</Grid>
                                    <Grid item>{product.price * product.amount}</Grid>
                                </div>
                            )
                        }
                    )
                }
                <Grid item>總價（千元）</Grid>
                <Grid item>
                    {
                        detail.amountList.map(
                            (product) => {
                                return (
                                    product.amount * product.price
                                )
                            }
                        ).reduce(
                            (prev, curr) => prev + curr, 0
                        )
                    }
                </Grid>
            </Grid> */}
            {/* 這邊是DataGrid版本 */}
            {/* CustomFooter在本js檔案最上面，要調整CSS要上去調 */}
            <Box sx={{ height: 400, width: '100%',mb:3,mt:3 }}>
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
                    onStateChange={(state) => {
                        const totalNow = detail.amountList.map(
                            (product) => {
                                return product.price * product.amount
                            }
                        ).reduce(
                            (a, b) => a + b, 0
                        );
                        setTotal(totalNow);
                    }
                    }
                />
            </Box>
            {/* 訂單細節 */}
            <Grid container direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                >
              
               <Grid item xs={2} sx={{borderBottom:1}}>送達時間</Grid>
                <Grid item xs={10} sx={{borderBottom:1}}>{detail.arrive}</Grid>
             

                <Grid item xs={2} sx={{borderBottom:1}}>送達地址</Grid>
                <Grid item xs={2} sx={{borderBottom:1}}>{detail.address}</Grid>
                <Grid item xs={8} sx={{borderBottom:1}}>{detail.addressLoc}</Grid>
              

                <Grid item xs={2} sx={{borderBottom:1}}>瑕疵處理</Grid>
                <Grid item xs={2} sx={{borderBottom:1}}>{detail.flaw}</Grid>
                <Grid item xs={2} sx={{borderBottom:1}}>處理期限</Grid>
                <Grid item xs={6} sx={{borderBottom:1}}>{detail.flawDate}</Grid>

                <Grid item xs={2} sx={{borderBottom:1}}>支付期限</Grid>
                <Grid item xs={2} sx={{borderBottom:1}}>{detail.pay}</Grid>


        
                
            </Grid>
            {/* 信件結尾 */}
            <Grid container justifyContent="flex-end"><Typography>{detail.sender}敬上</Typography></Grid>
            
            {/* 導向修改訂單的介面的按鈕 */}
            <Grid container justifyContent="flex-end">
                <Button sx={{"&:hover": { backgroundColor:"#E4513D",color:"#FFFFFF"},backgroundColor: "#FFFFFF" ,color:"#350D08",border:2}} startIcon={<ForwardToInbox />} href={`/letter_writing/${detail.id}`}>
                    修改訂單
                </Button>
            </Grid>
        </div>
    )
}

// ContractEdit: 訂單調整
const ContractEdit = ({ detail }) => {
    // 用來記錄總價
    const [total, setTotal] = React.useState(0);
    // 以下兩個function都是訂單確認信的按鈕
    // 拒絕訂單：向後端傳遞這份訂單被拒絕
    const handleRefuseContract = (event) => {
        console.log('拒絕訂單');
    };
    // 同意訂單：向後端傳遞使用者同意這份訂單 -> 亦即這份訂單正在「進行中」
    const handleAgreeContract = (event) => {
        console.log('同意訂單');
    };

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
            height: 40
        }
    ]

    // datagrid用的內容
    const rows = detail.amountList;

    return (
        <div className="contract_edit">
            {/* 信件開頭文字敘述 */}
            {getContent('contract_edit')}
            {/* 原本的Grid寫法 */}
            {/* <Grid container>
                <Grid item>產品品項</Grid>
                <Grid item>單位報價</Grid>
                <Grid item>購買數量（份）</Grid>
                <Grid item>折扣</Grid>
                <Grid item>售價</Grid>
                {
                    detail.amountList.map(
                        (product) => {
                            return (
                                <div className="contract-products">
                                    <Grid item>{product.name}</Grid>
                                    <Grid item>{product.price}</Grid>
                                    <Grid item>{product.amount}</Grid>
                                    <Grid item>{product.discount}</Grid>
                                    <Grid item>{Math.round(product.amount * product.price * (1 - product.discount))}</Grid>
                                </div>
                            )
                        }
                    )
                }
                <Grid item>總價</Grid>
                <Grid item>
                    {
                        detail.amountList.map(
                            (product) => {
                                return (
                                    product.amount * product.price * product.discount
                                )
                            }
                        ).reduce(
                            (prev, curr) => prev + curr, 0
                        )
                    }
                </Grid>
            </Grid> */}

            {/* datagrid寫法 */}
            {/* CustomFooter在small_component的資料夾底下，調整css要過去調 */}
            <Box sx={{ height: 400, width: '100%' ,mb:3,mt:3}}>
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
                    onStateChange={(state) => {
                        const totalNow = detail.amountList.map(
                            (product) => {
                                return product.price * product.amount * (1-product.discount)
                            }
                        ).reduce(
                            (a, b) => a + b, 0
                        );
                        setTotal(totalNow);
                    }
                    }
                />
            </Box>
            {/* 訂單詳細內容 */}
            <Grid container direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                >
              
               <Grid item xs={2} sx={{borderBottom:1}}>送達時間</Grid>
                <Grid item xs={10} sx={{borderBottom:1}}>{detail.arrive}</Grid>
             

                <Grid item xs={2} sx={{borderBottom:1}}>送達地址</Grid>
                <Grid item xs={2} sx={{borderBottom:1}}>{detail.address}</Grid>
                <Grid item xs={8} sx={{borderBottom:1}}>{detail.addressLoc}</Grid>
              

                <Grid item xs={2} sx={{borderBottom:1}}>瑕疵處理</Grid>
                <Grid item xs={2} sx={{borderBottom:1}}>{detail.flaw}</Grid>
                <Grid item xs={2} sx={{borderBottom:1}}>處理期限</Grid>
                <Grid item xs={6} sx={{borderBottom:1}}>{detail.flawDate}</Grid>

                <Grid item xs={2} sx={{borderBottom:1}}>支付期限</Grid>
                <Grid item xs={2} sx={{borderBottom:1}}>{detail.pay}</Grid>


        
                
            </Grid>
            {/* 信件結尾詞 */}
            <Grid container justifyContent="flex-end"><Typography>{detail.sender}敬上</Typography></Grid>
            {/* 同意並回到所有訂單頁面 */}
            <Grid container justifyContent="flex-end" columnSpacing={5}>
                <Grid Item xs={2}>
                <Button sx={{"&:hover": { backgroundColor:"green",color:"#FFFFFF"},backgroundColor: "#FFFFFF" ,color:"green",border:2}} startIcon={<Check />} href="/letter_list" onClick={handleAgreeContract}>
                    同意訂單
                </Button>
                </Grid>
            {/* 拒絕並回到所有訂單頁面 */}
                <Grid Item xs={2}>
                <Button sx={{"&:hover": { backgroundColor:"red",color:"#FFFFFF"},backgroundColor: "#FFFFFF" ,color:"red",border:2}} startIcon={<Close />} href="/letter_list" onClick={handleRefuseContract}>
                    拒絕訂單
                </Button>
                </Grid>
            </Grid>
        </div>
    )
}

// 收信時的內容，主體在letter_receive
const CreateContent = ({ detail, user }) => {
    // 依照信件類型，生成不同的信件內容
    function createContent(letterType) {
        // 會收到的信只有五種
        // operation: 營運支出計畫；quotation_request: 報價請求；quotation: 報價單；
        // contract_draft: 信件草稿；contract_edit: 信件編輯
        switch (letterType) {
            case 'operation':
                return (
                    <Operation detail={detail} user={user} />
                );
            case 'quotation_request':
                return (
                    <QuotationRequest detail={detail} user={user} />
                );
            case 'quotation':
                return (
                    <Quotation detail={detail} user={user} />
                );
            case 'contract_draft':
                return (
                    <ContractDraft detail={detail} user={user} />
                );
            case 'contract_edit':
                return (
                    <ContractEdit detail={detail} user={user} />
                );
            default:
                return <Typography>Error: lettertype can't be recognized.</Typography>
        }
    }

    return (
        <div className="letter_detail">
           
       <Box sx={{height: 950,bgcolor:"#FDF1EF"}}>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing='5'
                padding='5'
                >
               <div className="menu">
               <Grid item xs={12}>
                <MenuList />
                </Grid>
                </div>
            
            <Grid item xs={8}>
            <Box component="form"  sx={{ height: 850, width: '90%' ,padding:3,bgcolor: '#FFFFFF' }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        寄件人：
                    </Grid>
                    <Grid item xs={32}>
                        <TextField
                            fullWidth
                            id="sender"
                            defaultValue={detail.sender}
                            InputProps={{
                                readOnly: true,
                            }} />
                    </Grid>
                    <Grid item xs={4}>
                        標題：
                    </Grid>
                    <Grid item xs={32}>
                        <TextField
                            fullWidth
                            id="title"
                            defaultValue={detail.title}
                            InputProps={{
                                readOnly: true,
                            }} />
                    </Grid>
                </Grid>
           
            <Typography>{detail.receiver} 負責人您好：</Typography>
            {createContent(detail.letter_type)}
            </Box>
            </Grid>
            </Grid>
            </Box>
        </div>
   
    )
}


export default CreateContent;