import React from "react"
import {
    RadioGroup, FormControl, Radio, FormLabel, FormControlLabel,
    Box, TextField,
    Grid
} from '@mui/material';

const CreateContent = ({ detail }) => {
    const letterInfo = (
        <div classname="letterDetail">
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
            <div className="content">
                您好：<br />
                &emsp;上個月營運支出共計{detail.payment}元。並請您確認本月支出計畫，謝謝！<br />
                <FormControl>
                    <FormLabel>本月支出計畫：</FormLabel>
                    <RadioGroup
                        defaultValue={detail.last_plan}
                    >
                        <FormControlLabel value="less" control={<Radio />} label="減少支出，共體時艱" />
                        <FormControlLabel value="normal" control={<Radio />} label="正常營運，正常支出" />
                        <FormControlLabel value="more" control={<Radio />} label="增加支出，增進企業形象" />
                    </RadioGroup>
                </FormControl>
            </div>
        </div>
    )

    return (
        <div className="letter_detail">
            {letterInfo}
        </div>
    )
}


export default CreateContent;