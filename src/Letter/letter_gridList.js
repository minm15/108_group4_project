import React from "react";
import { Grid, Chip } from '@mui/material';
import get_letter_list from "../data/letter_list";

function LetterList() {
    const letterList = get_letter_list();
    return (
        <Grid container>
            {
                letterList.map(
                    (letter) => {
                        return (
                            <a href={`/letter_list/${letter.id}`}>
                                <Grid container className={letter.id}>
                                    <Grid item>
                                        {letter.sender}
                                        <Chip label={letter.sender_type} size="small" />
                                    </Grid>
                                    <Grid item>
                                        {letter.title}
                                        <div classname="expired">{letter.expired}</div>
                                    </Grid>
                                    <Grid item>{letter.time}</Grid>
                                </Grid>
                            </a>
                        )
                    }
                )
            }
        </Grid>
    )
}

export default LetterList;