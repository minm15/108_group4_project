import React from "react";
import { useParams } from "react-router-dom";
import get_contract_list from "../data/contract_list";

const HarborSend = ({ user }) => {
    // 從網址獲得訂單編號
    const [id, setId] = React.useState(useParams().contractId);
    // 獲得訂單內容
    const [send, setSend] = React.useState(
        get_contract_list().find(
            contract => contract.id === id
        )
    );
    const [orgContract, setOrgContract] = React.useState(
        contract.status === '換貨' ? 
        get_contract_list().find(
            contract => contract.id === send.origin
        ) : null
    )

    return (
        <div className="harbor-send">
            
        </div>
    )
}

export default HarborSend;