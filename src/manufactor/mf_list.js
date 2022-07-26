import React from "react";
import { Box, Paper, Grid } from "@mui/material";

function Manufactor() {
    const mf_list = [
        {
            product: "品項名稱",
            target: {
                rank:"生產目標",
                amount: "目標數量"
            },
            mistake: "預期誤差",
            ingredient: [
                {
                    name: "材料名稱",
                    amount: "消耗量",
                    company: "從哪間公司購買的",
                    rank: "材料等級",
                    cost: "進貨成本"
                }
            ],
            expense: "其他費用",
            total_cost: "共計成本",
            time: "預計耗時",
            status: "生產是否完畢",
            purpose: "生產目的"
        }
    ]

    const product_paper = mf_list.map(
        mf => {
            return (
                <Paper elevation={4}>
                    <div className="mf_status">{mf.status}</div>
                    <div className="mf_purpose">{mf.purpose}</div>
                    <Grid container>
                        <Grid item>生產目標：</Grid>
                        <Grid item>{mf.target.rank}</Grid>
                        <Grid item>{mf.target.amount}</Grid>
                    </Grid>
                </Paper>
            )
        }
    )

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
            {product_paper}
        </Box>
    )
}

export default Manufactor;