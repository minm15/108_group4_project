import React from "react"
import {
    RadioGroup, FormControl, Radio, FormLabel, FormControlLabel,
    Box, TextField,
    Grid,
    Typography,
    Button
} from '@mui/material';
import { LocalGroceryStore, ForwardToInbox, Check, Close } from "@mui/icons-material";
import getContent from "./letter_content";
import MenuList from "../Letter/menu";

const CreateContent = ({ detail }) => {
    const [letterInfo, setInfo] = React.useState();


    const handleOperation = (event) => {
        event.preventDefault();
        console.log(letterInfo)
    }

    function createContent(letterType) {
        switch (letterType) {
            case 'operation':
                return (
                    <div classname="operation">
                        您好：<br />
                        &emsp;上個月營運支出共計{detail.payment}元。並請您確認本月支出計畫，謝謝！<br />
                        <FormControl>
                            <FormLabel>本月支出計畫：</FormLabel>
                            <RadioGroup
                                defaultValue={detail.last_plan}
                                onChange={(event) => { setInfo(event.target.value) }}
                            >
                                <FormControlLabel value="less" control={<Radio />} label="減少支出，共體時艱" />
                                <FormControlLabel value="normal" control={<Radio />} label="正常營運，正常支出" />
                                <FormControlLabel value="more" control={<Radio />} label="增加支出，增進企業形象" />
                            </RadioGroup>
                        </FormControl>
                        <Button startIcon={<ForwardToInbox />} onClick={handleOperation}>確認支出</Button>
                    </div>
                );
            case 'quotation':
                return (
                    <div className="quotation">
                        {getContent('quotation')};
                        <Grid container>
                            <Grid item>商品品項</Grid>
                            <Grid item>單位報價</Grid>
                        </Grid>
                        {
                            detail.quotate.map(
                                (product) => {
                                    <Grid container>
                                        <Grid item>{product.name}</Grid>
                                        <Grid item>{product.price}</Grid>
                                    </Grid>
                                }
                            )
                        }
                        <Typography>{detail.sender}敬上</Typography>
                        <Button startIcon={<LocalGroceryStore />}>前往下訂</Button>
                    </div>
                );
            case 'contract_draft':
                return (
                    <div className="contract-draft">
                        {getContent('contract_draft')}
                        <Grid container>
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
                        </Grid>
                        <Grid container>
                            <Grid item>送達時間</Grid>
                            <Grid item>{detail.arrive}</Grid>

                            <Grid item>送達地址</Grid>
                            <Grid item>{detail.address}</Grid>
                            <Grid item>{detail.addressLoc}</Grid>

                            <Grid item>瑕疵處理</Grid>
                            <Grid item>{detail.flaw}</Grid>
                            <Grid item>處理期限</Grid>
                            <Grid item>{detail.flawDate}</Grid>

                            <Grid item>支付期限</Grid>
                            <Grid item>{detail.pay}</Grid>
                        </Grid>
                        <Typography>{detail.sender}敬上</Typography>
                        <Button startIcon={<ForwardToInbox />}>修改訂單</Button>
                    </div>
                );
            case 'contract_edit':
                return (
                    <div className="contract_edit">
                        {getContent('contract_edit')}
                        <Grid container>
                            <Grid item>產品品項</Grid>
                            <Grid item>單位報價</Grid>
                            <Grid item>購買數量（份）</Grid>
                            <Grid item>折扣</Grid>
                            <Grid item>售價</Grid>
                            {
                                detail.amountList.map(
                                    (product) => {
                                        <div className="contract-products">
                                            <Grid item>{product.name}</Grid>
                                            <Grid item>{product.price}</Grid>
                                            <Grid item>{product.amount}</Grid>
                                            <Grid item>{product.discount}</Grid>
                                            <Grid item>{product.amount * product.price * (1 - product.discount)}</Grid>
                                        </div>
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
                        </Grid>
                        <Grid container>
                            <Grid item>送達時間</Grid>
                            <Grid item>{detail.arrive}</Grid>

                            <Grid item>送達地址</Grid>
                            <Grid item>{detail.address}</Grid>
                            <Grid item>{detail.addressLoc}</Grid>

                            <Grid item>瑕疵處理</Grid>
                            <Grid item>{detail.flaw}</Grid>
                            <Grid item>處理期限</Grid>
                            <Grid item>{detail.flawDate}</Grid>

                            <Grid item>支付期限</Grid>
                            <Grid item>{detail.pay}</Grid>
                        </Grid>
                        <Typography>{detail.sender}敬上</Typography>
                        <Button startIcon={<Check />}>同意訂單</Button>
                        <Button startIcon={<Close />}>拒絕訂單</Button>
                    </div>
                );
            default:
                return <Typography>Error: lettertype can't be recognized.</Typography>
        }
    }

    return (
        <div className="letter_detail">
            <MenuList />
            <Box component="form" >
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        寄件人：
                    </Grid>
                    <Grid item xs={32}>
                        <TextField
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
                            id="title"
                            defaultValue={detail.title}
                            InputProps={{
                                readOnly: true,
                            }} />
                    </Grid>
                </Grid>
            </Box>
            <Typography>{detail.receiver} 負責人您好：</Typography>
            {createContent(detail.letterType)}
        </div>
    )
}


export default CreateContent;