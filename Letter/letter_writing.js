import React from "react";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuList from "./menu";
import { IgdPurchase, Quotation_request } from "../data/letter_draft";

function LetterWriting({ user }) {
    // 收件人
    const [receiver, setReceiver] = React.useState('');
    // 信件標題（信件目的）
    const [title, setTitle] = React.useState('');
    // 所有公司的名單，到時候可以只拿供應跟材料商就好
    const companies = [
        {
            name: "製造商1",
            company_id: "mf01",
            company_type: "製造商"
        },
        {
            name: "供應商1",
            company_id: "s01",
            company_type: "供應商"
        },
        {
            name: "材料商1",
            company_id: "mt01",
            company_type: "材料商"
        }
    ];

    return (
        <div className="letter_writing">
            {/* 導向各個信箱介面的選單 */}
            <MenuList />
            {/* 信件主體 */}
            收件人：
            <FormControl>
                <InputLabel>Select a receiver</InputLabel>
                <Select native
                    defaultValue=""
                    id="receiver-select"
                    label="receiver"
                    onChange={(event) => { setReceiver(event.target.value) }}
                >
                    <option aria-label="None" value="" />
                    {
                        (user.type === "manufacturer") ? (
                            <optgroup label="供應商" value="供應商">
                                {
                                    companies.map(
                                        company => {
                                            return company.company_type === "供應商" ? (
                                                <option value={company.name} key={company.company_id}>{company.name}</option>
                                            ) : null;
                                        }
                                    )
                                }
                            </optgroup>
                        ) : null
                    }
                    {
                        (user.type === "supplier") ? (
                            <optgroup label="材料商" value="材料商">
                                {
                                    companies.map(
                                        company => {
                                            return company.company_type === "材料商" ? (
                                                <option value={company.name} key={company.company_id}>{company.name}</option>
                                            ) : null;
                                        }
                                    )
                                }
                            </optgroup>
                        ) : null
                    }
                </Select>
            </FormControl><br />
            主旨：
            <FormControl>
                <InputLabel>Select your purpose</InputLabel>
                <Select native
                    defaultValue=""
                    id="subject-select"
                    label="subject"
                    onChange={(event) => { setTitle(event.target.value) }}
                >
                    <option aria-label="None" value="" />
                    {
                        (user.type === "supplier") ?
                            <option value='材料採購'>【材料採購】</option> : null
                    }
                    {
                        (user.type === "manufacturer") ?
                            <option value='報價請求'>【報價請求】</option> : null
                    }
                </Select>
            </FormControl>
            {/* 依照上面選擇的收件人跟信件標題，直接生成對應的信件內容 */}
            {/* quotation_request跟igdpurchase在letter_draft.js裡面 */}
            {
                title==='報價請求' ? <Quotation_request receiver={receiver} user={user.name} /> : null
            }
            {
                title==='材料採購' ? <IgdPurchase receiver={receiver} user={user.name} /> : null
            }
        </div>
    )
}

export default LetterWriting;