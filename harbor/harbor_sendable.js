import React from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails,
    Grid,
    Typography,
    Button
} from '@mui/material';
import get_contract_list from '../data/contract_list';
import { TaskAlt, Anchor } from '@mui/icons-material';

// 港口中可以開始配送的清單
const HarborSendable = ({ user }) => {
    const [contract_list, setContract] = React.useState(get_contract_list());

    return (
        <div className='harbor-sendable'>
            {
                contract_list.map(
                    (contract) => {
                        return (
                            <Accordion key={contract.id}>
                                <AccordionSummary>
                                    <Grid container>
                                        <Grid item>
                                            {contract.buyer}
                                        </Grid>
                                        <Grid item>
                                            {contract.status}訂單
                                        </Grid>
                                        <Grid item>
                                            {contract.package[0].name}－{contract.package[0].type}
                                            {
                                                contract.package.length > 1 ?
                                                    contract.package.slice(1).map(
                                                        (product) => {
                                                            return '、' + product.name + '－' + product.type;
                                                        }
                                                    ) : null
                                            }
                                        </Grid>
                                        <Grid item>
                                            {contract.sufficient ? <TaskAlt /> : null}
                                        </Grid>
                                    </Grid>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container>
                                        <Grid item>
                                            訂單內容：
                                        </Grid>
                                        {
                                            contract.package.map(
                                                (product) => {
                                                    return (
                                                        <Grid container key={product.id}>
                                                            <Grid item>
                                                                {product.name}－{product.type}
                                                            </Grid>
                                                            <Grid item>
                                                                {product.amount}
                                                            </Grid>
                                                            <Grid item>
                                                                {product.price}
                                                            </Grid>
                                                        </Grid>
                                                    )
                                                }
                                            )
                                        }
                                    </Grid>
                                    {
                                        contract.sufficient ?
                                            <Button id={contract.id} startIcon={<Anchor />} href={`/harbor/${contract.id}`}>前往配送</Button>
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