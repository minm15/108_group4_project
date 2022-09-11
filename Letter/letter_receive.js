import React, { useState } from "react";
// import {Grid, Item} from '@mui/material'
import { useParams } from "react-router-dom";
import CreateContent from '../data/letter_detail';
import get_letter_list from "../data/letter_list";

function LetterReceive({ user }) {
    const [id, setId] = useState(useParams().letterId);
    const [detail, setDetail] = useState(
        get_letter_list().find(
            letter => letter.id === id
        )
    );

    return (
        <div className="letterDetail">
            <CreateContent detail={detail} user={user}/>
        </div>
    );
}

export default LetterReceive;