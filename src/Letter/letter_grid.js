import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import { Grid, Chip, Box, Link, Typography } from '@mui/material';
// import { get_letter_list } from '../back-end/mail';
// import get_letter_list from '../data/letter_list';
import MenuList from './menu';

function get_letter_list() {
    let letter_list = JSON.parse(localStorage.getItem('letter_list'));
    // console.log(letter_list);
    return letter_list;
}

function filter_letter_list(letterList, user, type) {
    let result = letterList;
    switch (type) {
        case 'operation':
            result = letterList.filter(
                (letter) => letter.letter_type === "operation" & letter.expired === ''
            );
            // console.log(result);
            break;
        case 'quotation':
            result = letterList.filter(
                (letter) => letter.letter_type === 'quotation' & letter.expired === ''
            );
            break;
        case 'negotiate':
            result = letterList.filter(
                (letter) => (letter.letter_type === 'contract_edit' |
                    letter.letter_type === 'contract_draft') &
                    letter.expired === ''
            );
            break;
        case 'quotation_request':
            result = letterList.filter(
                (letter) => letter.letter_type === 'quotation_request' & letter.expired === ''
            );
            break;
        case 'igd':
            result = letterList.filter(
                (letter) => letter.letter_type === 'igd' & letter.expired === ''
            );
            break;
        // case 'contract':
        //     result = JSON.parse(localStorage.getItem('contract_list')).filter(
        //         (contract) => (contract.buyer === user.name |
        //             contract.seller === user.name)
        //     );
        //     break;
        case 'sent':
            result = JSON.parse(localStorage.getItem('letter_list')).filter(
                (letter) => letter.sender === user.name
            );
            break;
        case 'all':
            result = letterList;
            break;
        default:
            result = undefined;
            break;
    }
    return result;
}

const LetterGrid = ({ user, type }) => {
    const [letterList, setLetterList] = React.useState(
        filter_letter_list(
            get_letter_list().filter(
                (letter) => letter.receiver === user.name
            ), user, type)
    );

    const lightColor = user.type === '供應' ? "#FDF1EF" : "#E3F2FD";

    React.useEffect(
        () => {
            // console.log('here');
            setLetterList(
                filter_letter_list(
                    get_letter_list().filter(
                        (letter) => letter.receiver === user.name
                    ), user, type)
            );
        }, [useLocation().pathname]);

    return (
        <div className='main_frame'>
            <Box sx={{ height: 700, bgcolor: lightColor }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing='5'
                    padding='5'
                >
                    <div className="menu">
                        <Grid item xs={12}>
                            <MenuList/>
                        </Grid>
                    </div>
                    <Grid item xs={8}>
                        <Box sx={{ width: '100%', padding: 3, bgcolor: lightColor }}>
                            <Grid container>
                                {
                                    letterList !== undefined ? 
                                    letterList.length > 0 ? letterList.map(
                                        (letter) => {
                                            return (
                                                <Box sx={{
                                                    height: 30,
                                                    width: "110%",
                                                    boxShadow: 1,
                                                    borderRadius: 4,
                                                    bgcolor: '#FFFFFF',
                                                    mb: 0.5,
                                                    padding: 1
                                                }}>
                                                    <Link underline="none" color=" #350D08" href={`/letter_list/${letter.id}`}>
                                                        <Grid container justifyContent="space-between" alignItems="center" className={letter.id}>
                                                            <Grid item>
                                                                {letter.sender}
                                                                <Chip label={letter.sender_type} size="small" />
                                                                {letter.title}
                                                            </Grid>
                                                            <Grid item>
                                                            </Grid>
                                                            <Box sx={{ color: "#BE0000", fontWeight: 'bold' }}>{letter.expired}</Box>
                                                            <Grid item>{letter.time}</Grid>
                                                        </Grid>
                                                    </Link>
                                                </Box>
                                            )
                                        }
                                    ) : <Typography>尚無信件</Typography> : <Typography>尚無信件</Typography>
                                }
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Outlet />
            </Box>
        </div>
    )
}

export default LetterGrid;