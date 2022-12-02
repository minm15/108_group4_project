import React from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails,
    Grid,
    Typography,
    Button
} from '@mui/material';
// import get_contract_list from '../data/contract_list';
import { TaskAlt, Anchor } from '@mui/icons-material';
import { calculate_time } from '../time';

function get_contract_list () {
    let contract_list = require('../data/contract_list.json');
    return contract_list;
}

// 港口中可以開始配送的清單
const HarborSendable = ({ user }) => {
    const [contract_list, setContract] = React.useState(get_contract_list());
    const [date, setDate] = React.useState(calculate_time().game_day);
    // refresh the page each 10 seconds
    const time_change = () => {
        setDate(calculate_time().game_day);
        setContract(get_contract_list());
    }
    setInterval(time_change, 10000);

    return (
        <div className='harbor-sendable'>
            {
                contract_list.map(
                    (contract) => {
                        return (
                            <Accordion key={contract.id}>
                                <AccordionSummary>
                                    <Grid container>
                                        <Grid item xs={3}>
                                        <Typography disableTypography sx={{color:'#350D08', fontFamily: 'Noto Sans TC',fontSize: '24px',fontWeight: '400',lineHeight: '35px'}}>
                                            {contract.buyer}
                                        </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                        <Typography disableTypography sx={{color:'#350D08', fontFamily: 'Noto Sans TC',fontSize: '16px',fontWeight: '400',lineHeight: '35px'}}>
                                            {contract.status}訂單
                                        </Typography>
                                        </Grid>
                                        <Grid item xs={5}>
                                        <Typography disableTypography sx={{color:'#350D08', fontFamily: 'Noto Sans TC',fontSize: '16px',fontWeight: '400',lineHeight: '35px'}}>
                                            {contract.package[0].name}－{contract.package[0].type}
                                            {
                                                contract.package.length > 1 ?
                                                    contract.package.slice(1).map(
                                                        (product) => {
                                                            return '、' + product.name + '－' + product.type;
                                                        }
                                                    ) : null
                                            }
                                        </Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            {contract.sufficient ? <TaskAlt /> : null}
                                        </Grid>
                                    </Grid>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container>
                                        <Grid item xs={12}>
                                        <Typography disableTypography sx={{color:'#350D08', fontFamily: 'Noto Sans TC',fontSize: '16px',fontWeight: '400',lineHeight: '35px'}}>
                                            訂單內容：
                                        </Typography>
                                        </Grid>
                                        {
                                            contract.package.map(
                                                (product) => {
                                                    return (
                                                        <Grid container key={product.id}>
                                                            <Grid item xs={2}>
                                                            <Typography disableTypography sx={{color:'#350D08', fontFamily: 'Noto Sans TC',fontSize: '16px',fontWeight: '400',lineHeight: '35px'}}>
                                                                {product.name}－{product.type}
                                                            </Typography>
                                                            </Grid>
                                                            <Grid item xs={1}>
                                                            <Typography disableTypography sx={{color:'#350D08', fontFamily: 'Noto Sans TC',fontSize: '16px',fontWeight: '400',lineHeight: '35px'}}>
                                                                {product.amount}
                                                            </Typography>
                                                            </Grid>
                                                            <Grid item xs={1}>
                                                            <Typography disableTypography sx={{color:'#350D08', fontFamily: 'Noto Sans TC',fontSize: '16px',fontWeight: '400',lineHeight: '35px'}}>
                                                                {product.price}
                                                            </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    )
                                                }
                                            )
                                        }
                                    </Grid>
                                    {
                                        contract.sufficient ?
                                            <Button sx={{"&:hover": { backgroundColor:"#E4513D",color:"#FFFFFF"},backgroundColor: "#FFFFFF" ,color:"#350D08",border:2}}  id={contract.id} startIcon={<Anchor />} href={`/harbor/${contract.id}`}>前往配送</Button>
                                            : null
                                    }
                                </AccordionDetails>
                            </Accordion>
                        )
                    }
                )
            }
        </div>
    )
}

export default HarborSendable;