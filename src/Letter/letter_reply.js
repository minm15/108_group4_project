import React from "react";
// import get_letter_list from "../data/letter_list";
import { useParams } from "react-router-dom";
import { Quotation, ContractDraft, ContractEdit } from '../data/letter_draft';
import MenuList from "./menu";
import { Box, Grid, TextField, Typography } from '@mui/material';

function get_letter_list() {
    let letter_list = JSON.parse(localStorage.getItem('letter_list'));
    return letter_list;
}

// 依照回覆信件的類型，生成不同的信件內文
const Content = ({ detail, user }) => {
    switch (detail.letter_type) {
        // 回覆報價單請求 -> 報價單
        case 'quotation_request':
            return <Quotation detail={detail} user={user} />;
        // 回覆報價單 -> 訂單草稿
        case 'quotation':
            return <ContractDraft detail={detail} user={user} />;
        // 回覆訂單草稿 -> 訂單調整
        case 'contract_draft':
            return <ContractEdit detail={detail} user={user} />;
    }
}



function LetterReply({ user }) {
    const [reply, setReply] = React.useState(useParams().letterId);
    const [detail, setDetail] = React.useState(
        get_letter_list().find(
            letter => letter.id === reply
        )
    );
    const get_title = () => {
        switch (detail.letter_type) {
            case 'quotation_request':
                return "【報價單】" + user.name + "公司之報價單";
            case 'quotation':
                return "【訂單草稿】" + user.name + "公司之下訂";
            case 'contract_draft':
                return "【訂單調整】請您確認調整後的訂單";
        }
    }
    const [title, setTitle] = React.useState(get_title());
    const lightColor = user.type === '供應' ? "#FDF1EF" : "#E3F2FD";

    return (
        <div className="letter_reply">
            <Box sx={{ height: 1000, bgcolor: lightColor }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing='5'
                    padding='5'
                >
                    <Grid item xs={2}>
                        <MenuList />
                    </Grid>
                    <Grid item xs={10}>
                        <Box sx={{ height: 950, width: '90%', padding: 3, bgcolor: '#FFFFFF' }}>
                            <Box component="form" >
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <Typography sx={{ textAlign: 'left' }}>
                                            收件人：
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={32}>
                                        <TextField sx={{ bgcolor: lightColor, width: 400, textAlign: 'left' }}
                                            id="sender"
                                            defaultValue={detail.sender}
                                            InputProps={{
                                                readOnly: true,
                                            }} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography sx={{ textAlign: 'left' }}>
                                            標題：
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={32}>
                                        <TextField sx={{ bgcolor: lightColor, width: 400, textAlign: 'left' }}
                                            id="title"
                                            defaultValue={title}
                                            InputProps={{
                                                readOnly: true,
                                            }} />
                                    </Grid>
                                </Grid>
                            </Box>

                            <Content detail={detail} user={user} />
                        </Box>
                    </Grid>
                    {/* 依照要回復的信件，生成回復的信件內容，在這個檔案的前半段 */}

                </Grid>
            </Box>
        </div>
    )
}

export default LetterReply;