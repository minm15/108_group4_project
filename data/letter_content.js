import { Typography } from "@mui/material";

// 寄信
const ingredient_purchase = (
    <Typography>
        &emsp;敝公司依貴公司提供之報價，訂單如下：
    </Typography>
);

const quotation = (
    <Typography>
        &emsp;敝公司報價單如下，提醒您，本報價單為本月之計價方式。
        若逾期，煩請另索取一次報價單，謝謝！
    </Typography>
);

const contract_draft = (
    <Typography>
        &emsp;敝公司依照報價單，欲訂購之產品如下。如需更改，煩請來信通知。
    </Typography>
);

const contract_edit = (
    <Typography>
        &emsp;以下是敝公司對於訂單所作之更動，若貴公司並不同意更動，煩請另發起一筆新訂單，此訂單便會作廢。
    </Typography>
);

function getContent(letterType) {
    switch (letterType) {
        case "igd_purchase":
            return ingredient_purchase;
        case 'quotation':
            return quotation;
        case 'contract_draft':
            return contract_draft;
        case 'contract_edit':
            return contract_edit;
        default:
            return "Error: letter type can't be recognized"
    }
}

export default getContent;
