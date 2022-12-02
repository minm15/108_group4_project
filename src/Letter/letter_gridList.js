import React from "react";
import { Grid, Chip,Box,Link} from '@mui/material';
// import get_letter_list from "../data/letter_list";

function get_letter_list () {
    let letter_list = require('../data/letter_list.json');
    return letter_list;
}

function LetterList() {
    const letterList = get_letter_list();
    return (
        <Grid container  >
            {
                letterList.map(
                    (letter) => {
                        return (
                            <Box sx={{
                                height:30,width:"110%",boxShadow: 1,borderRadius: 4, bgcolor: '#FFFFFF',mb:0.5,padding:1
                                }}>
                            <Link underline="none" color=" #350D08" href={`/letter_list/${letter.id}`}>
                                <Grid container justifyContent="space-between"alignItems="center" className={letter.id}>
                                    <Grid item>
                                        {letter.sender}
                                        <Chip label={letter.sender_type} size="small" />
                                        {letter.title}
                                    </Grid>
                                    <Grid item>
                                    </Grid>
                                    <div classname="expired"><Box sx={{color:"#BE0000",fontWeight: 'bold'}}>{letter.expired}</Box></div>
                                    <Grid item>{letter.time}</Grid>
                                </Grid>
                            </Link>
                            </Box>
                        )
                    }
                )
            }
        </Grid>
        
    )
}

export default LetterList;