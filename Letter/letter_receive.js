import React, { useState } from "react";
// import {Grid, Item} from '@mui/material'
import { useParams } from "react-router-dom";
import CreateContent from '../data/letter_detail';

function LetterReceive() {
    const [id, setId] = useState(useParams().letterId);
    const [detail, setDetail] = useState(
        {
            letterType: 'operation',
            receiver: 'Takodachi',
            sender: "可愛小秘書",
            title: "【費用調控】請您審核公司支出規劃",
            last_plan: 'less',
            payment: id*100,
        }
    );

    return (
        <div className="letterDetail">
            <CreateContent detail={detail} />
        </div>
    );
}

export default LetterReceive;