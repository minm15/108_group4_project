import React from "react";
import { Box, Paper, Grid, IconButton, Button, Typography } from "@mui/material";
// import { shadows } from '@mui/system';
import { Add } from '@mui/icons-material';
import { Link } from "react-router-dom";
// import get_producing_list from "../data/mf_producing_list";
import { calculate_time } from '../time';

function get_producing_list() {
    let producing_list = require('../data/mf_producing.json');
    return producing_list;
}

function Manufactor() {
    const [date, setDate] = React.useState(calculate_time().game_day);
    const time_change = () => {
        setDate(calculate_time().game_day);
    }
    setInterval(time_change, 10000);
    const handleCollect = (event) => {
        setList(
            mf_list.filter(
                (mf) => mf.id !== event.currentTarget.id
            )
        );
        // console.log(mf_list);
        // console.log(event.currentTarget.id);
    }

    // manufactor list
    const [mf_list, setList] = React.useState(get_producing_list());

    const product_paper = mf_list.map(
        mf => {
            return (
                <Paper elevation={4}
                    square={false}
                    sx={{
                        width: 250,
                        height: 400,
                        padding: 2
                    }}
                    key={mf.id}>

                    <div className="mf_status">{mf.status}</div>
                    <div className="mf_purpose">
                        <Typography disableTypography sx={{ fontFamily: "Noto Sans TC", fontSize: "24px", fontWeight: 700, lineHeight: "35px", letterSpacing: "0em", textAlign: "left" }}>
                            {mf.purpose}
                        </Typography>
                    </div>
                    <Grid container direction="row">
                        <Grid item xs={8} sx={{ borderBottom: 1 }} >生產目標：</Grid>
                        <Grid item xs={4} ></Grid>
                        <Grid item xs={2} ></Grid>
                        <Grid item xs={6} sx={{ borderBottom: 1 }}>{mf.target.type}</Grid>
                        <Grid item xs={4} sx={{ borderBottom: 1 }}>{mf.target.amount}</Grid>

                        <Grid item xs={8} sx={{ borderBottom: 1 }}>預期誤差：</Grid>
                        <Grid item xs={4} sx={{ borderBottom: 1 }}>{mf.mistake}</Grid>

                        <Grid item xs={5} sx={{ borderBottom: 1 }}>材料：</Grid>
                        <Grid item xs={7} ></Grid>
                        {
                            mf.ingredient.map(
                                igd => {
                                    return (
                                        <Grid container>
                                            <Grid item xs={2} ></Grid>
                                            <Grid item xs={6} sx={{ borderBottom: 1 }}>{igd.name}-{igd.type}</Grid>
                                            <Grid item xs={4} sx={{ borderBottom: 1 }}>{igd.amount}</Grid>
                                        </Grid>
                                    )
                                }
                            )
                        }
                        <Grid item xs={8} sx={{ borderBottom: 1 }}>其他費用：</Grid>
                        <Grid item xs={4} sx={{ borderBottom: 1 }}>{mf.expense}</Grid>

                        <Grid item xs={8} sx={{ borderBottom: 1 }}>共計成本：</Grid>
                        <Grid item xs={4} sx={{ borderBottom: 1 }}>{mf.total_cost}</Grid>

                        <Grid item xs={8} sx={{ borderBottom: 1 }}>預計耗時：</Grid>
                        <Grid item xs={4} sx={{ borderBottom: 1 }}>{mf.time}</Grid>
                    </Grid>
                    {
                        mf.finish_date === date ?
                            <Grid container justifyContent="flex-end"><Button sx={{ margin: "10px", "&:hover": { backgroundColor: "#E4513D", color: "#FFFFFF" }, backgroundColor: "#FFFFFF", color: "#350D08", border: 2 }} onClick={handleCollect} id={mf.id}>收集成品</Button></Grid> : null
                    }
                </Paper>
            )
        }
    )

    // manufactor space
    const mf_space = 5 - mf_list.length > 0 ? (
        <Paper elevation={4} square={false} sx={{ width: 250, height: 400, padding: 2 }}>
            <Grid container
                justifyContent="center"
                alignItems="center"
                direction="column"
                spacing={0}
                style={{ minHeight: 'auto' }}
            >

                <Grid Item >
                    <IconButton component={Link} to="/manufactory/product">
                        <Add />
                    </IconButton>
                </Grid>

            </Grid>
        </Paper>
    ) : (
        <Paper elevation={4} square={false} sx={{ bgcolor: "#F6C9C3" }}>
            <Typography disableTypography sx={{ fontFamily: "Noto Sans TC", fontSize: "36px", fontWeight: 400, lineHeight: "52px", letterSpacing: "0em", textAlign: "left" }}>
                請擴建廠房
            </Typography>
        </Paper>
    );

    //manufactor main menu
    return (
        <div className="mf_mainframe">
            <Box sx={{ height: 700, bgcolor: "#FDF1EF" }}>
                <Grid container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <Grid Item xs={6}>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1,
                                width: 250,
                                height: 400,
                                bgcolor: "#FFFFFF"
                            },
                        }}>
                            {product_paper}
                        </Box>
                    </Grid>
                    <Grid Item xs={6}>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1,
                                width: 250,
                                height: 400,
                                bgcolor: "#FFFFFF"
                            },
                        }}>
                            {mf_space}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            {/*
         
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
            </Box>*/}
        </div>
    )
}

export default Manufactor;