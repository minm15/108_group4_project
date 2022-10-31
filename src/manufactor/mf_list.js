import React from "react";
import { Box, Paper, Grid, IconButton, Button, Typography } from "@mui/material";
import { Add, KeyboardArrowRight, KeyboardArrowLeft } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { calculate_time, cal_input_date, diff_time } from '../time';

function get_producing_list(user) {
    let producing_list = JSON.parse(localStorage.getItem('product_list')).find((ele) => ele.company === user);
    return producing_list;
}

function Manufactor({ user }) {
    const color = user.type === "供應" ? "#FDF1EF" : "#E3F2FD";
    const [date, setDate] = React.useState(calculate_time().game_day);
    // manufactor list
    const [mf_list, setList] = React.useState(
        get_producing_list(user.name).product_list
    );
    const time_change = () => {
        setDate(calculate_time().game_day);
        setList(get_producing_list(user.name).product_list);
    };
    setInterval(time_change, 10000);
    const handleCollect = (event) => {
        let result = mf_list.filter(
            (mf) => mf.id !== Number(event.currentTarget.id)
        );
        // console.log('here');
        // console.log(result);
        setList(result);
        localStorage.setItem('product_list', JSON.stringify(
            JSON.parse(localStorage.getItem('product_list')).map(
                (ele) => {
                    if (ele.company=== user.name) {
                        return {
                            company: user.name,
                            limit: ele.limit,
                            product_list: result
                        };
                    } else {
                        return ele;
                    }
                }
            )
        ));
        console.log(
            JSON.parse(localStorage.getItem('product_list')).map(
                (ele) => {
                    if (ele.company === user.name) {
                        // console.log('here');
                        return {
                            company: user.name,
                            limit: ele.limit,
                            product_list: result
                        };
                    } else {
                        return ele;
                    }
                }
            )
        );
        // console.log(JSON.parse(localStorage.getItem('product_list')).map(
        //     (ele) => {
        //         if (ele.company === user.name) {
        //             return {
        //                 company: user.name,
        //                 limit: ele.limit,
        //                 product_list: result
        //             };
        //         } else {
        //             return ele;
        //         }
        //     }
        // ));
    };
    const [page, setPage] = React.useState(3);
    const product_paper = mf_list.map(
        (mf, index) => {
            return (
                <Paper elevation={4}
                    square={false}
                    sx={{
                        width: 250,
                        height: 400,
                        padding: 2,
                        display: index >= page - 3 & index < page ? null : 'none'
                    }}
                    key={mf.id}>
                    <div className="mf_reason">
                        <Grid container direction="row">
                            <Grid xs={8}>
                                <Typography sx={{ fontFamily: "Noto Sans TC", fontSize: "24px", fontWeight: 700, lineHeight: "35px", letterSpacing: "0em", textAlign: "left" }}>
                                    {mf.reason}
                                </Typography>
                            </Grid>
                            {
                                diff_time(date, cal_input_date(mf.product_time, mf.time)) > 0 ?
                                    null :
                                    <Grid xs={4}>
                                        <Typography sx={{ fontFamily: "Noto Sans TC", fontSize: "16px", fontWeight: 700, lineHeight: "35px", letterSpacing: "0em", textAlign: "left" }}>
                                            製造中...
                                        </Typography>
                                    </Grid>
                            }
                        </Grid>
                    </div>
                    <Grid container direction="row">
                        <Grid item xs={8} sx={{ borderBottom: 1 }} >生產目標：</Grid>
                        <Grid item xs={4} ></Grid>
                        <Grid item xs={2} ></Grid>
                        <Grid item xs={6} sx={{ borderBottom: 1 }}>
                            {mf.target.name}-{mf.target.type === undefined
                                ? mf.target.rank :
                                mf.target.type}
                        </Grid>
                        <Grid item xs={4} sx={{ borderBottom: 1 }}>{mf.target.amount}</Grid>

                        {/* <Grid item xs={8} sx={{ borderBottom: 1 }}>預期誤差：</Grid>
                        <Grid item xs={4} sx={{ borderBottom: 1 }}>{mf.mistake}</Grid> */}

                        <Grid item xs={5} sx={{ borderBottom: 1 }}>材料：</Grid>
                        <Grid item xs={7} ></Grid>
                        {
                            mf.igd.map(
                                igd => {
                                    return (
                                        <Grid container>
                                            <Grid item xs={2} ></Grid>
                                            <Grid item xs={6} sx={{ borderBottom: 1 }}>{igd.name}{igd.type === undefined ? null : '-' + igd.type}</Grid>
                                            <Grid item xs={4} sx={{ borderBottom: 1 }}>{igd.amount}</Grid>
                                        </Grid>
                                    )
                                }
                            )
                        }
                        <Grid item xs={8} sx={{ borderBottom: 1 }}>其他費用：</Grid>
                        <Grid item xs={4} sx={{ borderBottom: 1 }}>{mf.other_cost}</Grid>

                        <Grid item xs={8} sx={{ borderBottom: 1 }}>共計成本：</Grid>
                        <Grid item xs={4} sx={{ borderBottom: 1 }}>{mf.total_cost}</Grid>

                        <Grid item xs={8} sx={{ borderBottom: 1 }}>預計耗時：</Grid>
                        <Grid item xs={4} sx={{ borderBottom: 1 }}>{mf.time}</Grid>
                    </Grid>
                    {
                        diff_time(date, cal_input_date(mf.product_time, mf.time)) > 0 ?
                            <Grid container justifyContent="flex-end">
                                <Button
                                    sx={{
                                        margin: "10px",
                                        "&:hover": { backgroundColor: "#E4513D", color: "#FFFFFF" },
                                        backgroundColor: "#FFFFFF",
                                        color: "#350D08",
                                        border: 2
                                    }}
                                    onClick={handleCollect}
                                    id={mf.id}>
                                    收集成品
                                </Button>
                            </Grid> : null
                    }
                </Paper>
            )
        }
    )

    // manufactor space
    // console.log(get_producing_list(user.name));
    const mf_space = get_producing_list(user.name).limit - mf_list.length > 0 ? (
        <Paper
            elevation={4}
            square={false}
            sx={{
                width: 250,
                height: 400,
                padding: 2,
                display: page === mf_list.length + 1 ? null : 'none'
            }}>
            <Grid container
                justifyContent="center"
                alignItems="center"
                direction="column"
                spacing={0}
                style={{ minHeight: 'auto' }}
            >
                <Grid item>
                    <IconButton component={Link} to="/manufactory/product">
                        <Add />
                    </IconButton>
                </Grid>

            </Grid>
        </Paper>
    ) : (
        <Paper
            elevation={4}
            square={false}
            sx={{
                bgcolor: "#F6C9C3",
                display: page === mf_list.length + 1 ? null : 'none'
            }}>
            <Typography sx={{ fontFamily: "Noto Sans TC", fontSize: "36px", fontWeight: 400, lineHeight: "52px", letterSpacing: "0em", textAlign: "left" }}>
                請擴建廠房
            </Typography>
        </Paper>
    );

    //manufactor main menu
    return (
        <div className="mf_mainframe">
            <Box
                sx={{
                    height: 700,
                    width: 1367,
                    bgcolor: color,
                    left: 73,
                    top: 126,
                    position: "fixed"
                }}>

                <Grid container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <Grid item xs={1}>
                        <KeyboardArrowLeft onClick={
                            () => setPage(page === 3 ? 3 : page - 1)
                        } />
                    </Grid>
                    <Grid item xs={page === mf_list.length + 1 ? 6 : 8}>
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
                    <Grid item xs={page === mf_list.length + 1 ? 3 : 0}>
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
                    <Grid item xs={1}>
                        <KeyboardArrowRight onClick={
                            () => setPage(page === mf_list.length + 1 ? mf_list.length + 1 : page + 1)
                        } />
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