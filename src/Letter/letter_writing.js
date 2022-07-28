import React from "react";
import { FormControl, InputLabel, Select } from "@mui/material";

function LetterWriting() {
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
// 打到這裡，現在卡在我不會換選項內容
    function changeSubject(dropdown) {
        const company_type = dropdown.option[dropdown.selectIndex].parentNode;
        const subject = document.getElementById("subject-select")[0];
        switch (company_type) {
            case "供應商":
                subject.addChild(
                    <option value="purchase">【報價請求】請貴公司提供報價單</option>
                );
                break;
            case "材料商":
                subject.addChild(
                    <option value="purchase">【材料下訂】</option>
                );
                break;
        }
    }

    return (
        <div className="letter_writing">
            收件人：
            <FormControl>
                <InputLabel>Select a receiver</InputLabel>
                <Select native defaultValue="" id="receiver-select" label="receiver" onChange={changeSubject(this)}>
                    <option aria-label="None" value="" />
                    <optgroup label="供應商" value="供應商">
                        {
                            companies.map(
                                company => {
                                    return company.company_type === "供應商" ? (
                                        <option value={company.id}>{company.name}</option>
                                    ) : null;
                                }
                            )
                        }
                    </optgroup>
                    <optgroup label="材料商" value="材料商">
                        {
                            companies.map(
                                company => {
                                    return company.company_type === "材料商" ? (
                                        <option value={company.id}>{company.name}</option>
                                    ) : null;
                                }
                            )
                        }
                    </optgroup>
                </Select>
            </FormControl><br />
            主旨：
            <FormControl>
                <InputLabel>Select your purpose</InputLabel>
                <Select native defaultValue="" id="subject-select" label="subject">
                    <option aria-label="None" value="" />
                </Select>
            </FormControl>
        </div>
    )
}

export default LetterWriting;