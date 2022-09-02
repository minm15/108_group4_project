import React from "react";
import { Box, Paper, Grid, IconButton, Button } from "@mui/material";
import { Add } from '@mui/icons-material';
import { Link } from "react-router-dom";
import get_producing_list from "../data/mf_producing_list";

const date = "2022-3-10";

function Manufactor() {
    
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
                    key={mf.id}>
                    <div className="mf_status">{mf.status}</div>
                    <div className="mf_purpose">{mf.purpose}</div>
                    <Grid container>
                        <Grid item>生產目標：</Grid>
                        <Grid item>{mf.target.type}</Grid>
                        <Grid item>{mf.target.amount}</Grid>

                        <Grid item>預期誤差：</Grid>
                        <Grid item>{mf.mistake}</Grid>

                        <Grid item>材料：</Grid>
                        {
                            mf.ingredient.map(
                                igd => {
                                    return (
                                        <Grid container>
                                            <Grid item>{igd.name}-{igd.type}</Grid>
                                            <Grid item>{igd.amount}</Grid>
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
                    {
                        mf.finish_date === date ?
                            <Button onClick={handleCollect} id={mf.id}>收集成品</Button> : null
                    }
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