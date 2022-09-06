import React from "react";
import { Grid, TextField, Typography } from '@mui/material';

function IgdPurchase({ receiver }) {
    return (
        <div className="ingredient-purchase">
            <Typography>
                {receiver}負責人您好：<br />
                &emsp;敝公司依貴公司提供之報價，訂單如下：
            </Typography>
            <Grid container>
                <Grid item>商品品項</Grid>
                <Grid item>單位報價（元）</Grid>
                <Grid item>購買數量（噸）</Grid>
                <Grid item>售價（千元）</Grid>
                
            </Grid>
        </div>
    )
}