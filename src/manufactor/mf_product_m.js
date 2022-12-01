import React from "react";
import {
    Box, Paper, Grid,
    FormControl, InputLabel, Select, MenuItem, Typography
} from "@mui/material";
import { get_car_list, cal_grade, get_component_list } from '../data/game_rule';

const ProductM = ({ user }) => {
    const dm = JSON.parse(localStorage.getItem('dm')).find(
        (company) => company.company === user.name
    );
    const producing_list = JSON.parse(localStorage.getItem('product_list')).find(
        (company) => company.company === user.name
    ).product_list.map(
        (item) => {
            return item.target;
        }
    );
    const productable = get_car_list();
    const contractList = JSON.parse(localStorage.getItem('contract_list')).filter(
        (contract) => contract.seller === user.name & !contract.sent
    );
    const storage = JSON.parse(localStorage.getItem('storage')).find(
        (company) => company.company === user.name
    );

    // form content
    const [targetName, setTargetName] = React.useState('');
    // const [targetDetail, setTargetDetail] = React.useState();
    const [targetAmount, setAmount] = React.useState(0);
    const [targetDetail, setTargetDetail] = React.useState();
    const [rank, setRank] = React.useState('');
    const [igd, setIgd] = React.useState([]);
    const [igdType, setIgdType] = React.useState([]);
    const [igdCost, setIgdCost] = React.useState(0);
    const [otherCost, setOtherCost] = React.useState(0);
    const [time, setTime] = React.useState(0);

    React.useEffect(() => {
        if (targetName !== '') {
            let detail = productable.find(
                (item) => item.name === targetName
            );
            // console.log(productable);
        }
        let detail = productable.find((product) => product.name === targetName);
        setTargetDetail(detail);
        setIgd(
            ['輪胎', '內裝材料', '引擎', '底盤'].map(
                (eachIgd) => {
                    let limit = detail.limit.find((eachLimit) => eachLimit.igd === eachIgd);
                    return {
                        name: eachIgd,
                        amount: 0,
                        type: limit === undefined ? '' : limit.type
                    }
                }
            )
        );
    }, [targetName]);

    React.useEffect(() => {
        if (targetName !== '') {
            let igdCostNow = 0;
            setIgd(
                igd.map(
                    (eachIgd) => {
                        if (eachIgd.type === '') {
                            igdCostNow = 0
                        } else {
                            igdCostNow += get_component_list().find(
                                (component) => component.name === eachIgd.name
                            ).detail.find(
                                (eachType) => eachType.type === eachIgd.type
                            ).avg_cost;
                        }
                        return {
                            name: eachIgd.name,
                            amount: eachIgd.name === '輪胎' ? 4 * targetAmount : targetAmount,
                            type: eachIgd.type
                        }
                    }
                )
            );
            setOtherCost(
                targetDetail.other_cost * targetAmount
            );
            setIgdCost(igdCostNow);
            setTime(Math.ceil(targetAmount / targetDetail.product_per_day));
        }
    }, [targetAmount]);

    React.useEffect(() => {
        
    }, [igdType])
}