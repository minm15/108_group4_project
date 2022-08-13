import React from "react";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuList from "./menu";
import { IgdPurchase, Quotation, ContractDraft, ContractEdit } from "../data/letter_draft";

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

    return (
        <div className="letter_writing">
            <MenuList />
            收件人：
            <FormControl>
                <InputLabel>Select a receiver</InputLabel>
                <Select native defaultValue="" id="receiver-select" label="receiver">
                    <option aria-label="None" value="" />
                    <optgroup label="供應商" value="供應商">
                        {
                            companies.map(
                                company => {
                                    return company.company_type === "供應商" ? (
                                        <option value={company.company_id} key={company.company_id}>{company.name}</option>
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
                                        <option value={company.company_id} key={company.company_id}>{company.name}</option>
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
            <ContractEdit receiver={"WAH"} user={"Takodachi"} contract={
                {
                    amountList: [
                        {
                            name: '螺絲',
                            amount: 12,
                            price: 100
                        },
                        {
                            name: '休旅車車門',
                            amount: 25,
                            price: 1000
                        }
                    ],
                    arrive: 30,
                    address: "Takodachi",
                    flaw: "change",
                    flawDate: 60,
                    pay: 45
                }
            }/>
        </div>
    )
}

export default LetterWriting;