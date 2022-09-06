import React from "react";
import { Box, Paper, Grid, IconButton } from "@mui/material";
import { Add } from '@mui/icons-material';
import { Link } from "react-router-dom";

function Manufactor() {
    // manufactor list
    const mf_list = [
        {
            product: "品項名稱",
            target: {
                rank: "生產目標",
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
        },
        {
            product: "品項名稱",
            target: {
                rank: "生產目標",
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
                <Paper elevation={4}
                    square={false}>
                    <div className="mf_status">{mf.status}</div>
                    <div className="mf_purpose">{mf.purpose}</div>
                    <Grid container>
                        <Grid item>生產目標：</Grid>
                        <Grid item>{mf.target.rank}</Grid>
                        <Grid item>{mf.target.amount}</Grid>

                        <Grid item>預期誤差：</Grid>
                        <Grid item>{mf.mistake}</Grid>

                        <Grid item>材料：</Grid>
                        {
                            mf.ingredient.map(
                                igd => {
                                    return (
                                        <Grid container>
                                            <Grid item>{igd.name}-{igd.amount}</Grid>
                                            <Grid item>{igd.company}</Grid>
                                        </Grid>
                                    )
                                }
                            )
                        }

                        <Grid item>其他費用：</Grid>
                        <Grid item>{mf.expense}</Grid>

                        <Grid item>共計成本：</Grid>
                        <Grid item>{mf.total_cost}</Grid>

                        <Grid item>預計耗時：</Grid>
                        <Grid item>{mf.time}</Grid>
                    </Grid>
                </Paper>
            )
        }
    )

    // manufactor space
    const mf_space = 5 - mf_list.length > 0 ? (
        <Paper elevation={4} square={false}>
            <IconButton component={Link} to="/manufactory/product">
                <Add />
            </IconButton>
        </Paper>
    ) : (
        <Paper elevation={4} square={false}>請擴建廠房</Paper>
    );

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
            {mf_space}
        </Box>
    )
}

export default Manufactor;