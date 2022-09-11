import React from "react";
import get_letter_list from "../data/letter_list";
import { useParams } from "react-router-dom";
import { Quotation, ContractDraft, ContractEdit } from '../data/letter_draft';
import MenuList from "./menu";
import { Box, Grid, TextField, Typography } from '@mui/material';

// 依照回覆信件的類型，生成不同的信件內文
const Content = ({ detail, user }) => {
    switch (detail.letter_type) {
        // 回覆報價單請求 -> 報價單
        case 'quotation_request':
            return <Quotation detail={detail} user={user} />;
        // 回覆報價單 -> 訂單草稿
        case 'quotation':
            return <ContractDraft detail={detail} user={user}/>;
        // 回覆訂單草稿 -> 訂單調整
        case 'contract_draft':
            return <ContractEdit detail={detail} user={user}/>;
    }
}

function LetterReply({ user }) {
    const [reply, setReply] = React.useState(useParams().letterId);
    const [detail, setDetail] = React.useState(
        get_letter_list().find(
            letter => letter.id === reply
        )
    );
    const [title, setTitle] = React.useState('');

    return (
        <div className="letter_reply">
            <MenuList />
            <Box component="form" >
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        收件人：
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
            {/* 依照要回復的信件，生成回復的信件內容，在這個檔案的前半段 */}
            <Content detail={detail} user={user} />
        </div>
    )
}

export default LetterReply;