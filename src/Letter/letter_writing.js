import React from "react";
import { FormControl, InputLabel, Select, Box, Grid } from "@mui/material";
import MenuList from "./menu";
import { IgdPurchase, Quotation_request } from "../data/letter_draft";

function LetterWriting({ user }) {
    // 收件人
    const [receiver, setReceiver] = React.useState('');
    // 信件標題（信件目的）
    const [title, setTitle] = React.useState('');
    // 所有公司的名單，到時候可以只拿供應跟材料商就好
    // const companies = [
    //     {
    //         name: "製造商1",
    //         company_id: "mf01",
    //         company_type: "製造商"
    //     },
    //     {
    //         name: "供應商1",
    //         company_id: "s01",
    //         company_type: "供應商"
    //     },
    //     {
    //         name: "材料商1",
    //         company_id: "mt01",
    //         company_type: "材料商"
    //     }
    // ];

    const companies = JSON.parse(localStorage.getItem('company_list'));
    const lightColor = user.type === '供應' ? "#FDF1EF" : "#E3F2FD";
    const brightColor = user.type === '供應' ? "#E4513D" : "#1976D2";

    return (
        <div className="letter_writing">
            {/* 導向各個信箱介面的選單 */}
            <Box sx={{ height: 700, bgcolor: lightColor }}>
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
                    {/* 信件主體 */}
                    <Grid item xs={10}>
                        <Box sx={{ height: 400, width: '90%', padding: 3, bgcolor: '#FFFFFF' }}>
                            <Box>
                                收件人：
                                <FormControl>
                                    <InputLabel >Select a receiver</InputLabel>
                                    <Select sx={{ bgcolor: lightColor, width: 400 }} native defaultValue=""
                                        id="receiver-select"
                                        label="receiver"
                                        onChange={(event) => { setReceiver(event.target.value) }}>
                                        <option aria-label="None" value="" />
                                        {
                                            (user.type === "製造") ? (
                                                <optgroup label="供應商" value="供應商">
                                                    {
                                                        companies.map(
                                                            company => {
                                                                return company.type === "供應" ? (
                                                                    <option value={company.name} key={company.name}>{company.name}</option>
                                                                ) : null;
                                                            }
                                                        )
                                                    }
                                                </optgroup>
                                            ) : null
                                        }
                                        {
                                            (user.type === "供應") ? (
                                                <optgroup label="材料商" value="材料商">

                                                    {
                                                        companies.map(
                                                            company => {
                                                                return company.type === "材料" ? (
                                                                    <option value={company.name} key={company.name}>{company.name}</option>
                                                                ) : null;
                                                            }
                                                        )
                                                    }
                                                </optgroup>
                                            ) : null
                                        }
                                    </Select>
                                </FormControl><br />
                            </Box>
                            <Box>
                                主旨：
                                <FormControl>
                                    <InputLabel>Select your purpose</InputLabel>
                                    <Select sx={{ bgcolor: lightColor, width: 400 }} native defaultValue=""
                                        id="subject-select"
                                        label="subject"
                                        onChange={(event) => { setTitle(event.target.value) }}>
                                        <option aria-label="None" value="" />
                                        {
                                            (user.type === "供應") ?
                                                <option value='材料採購'>【材料採購】</option> : null
                                        }
                                        {
                                            (user.type === "製造") ?
                                                <option value='報價請求'>【報價請求】</option> : null
                                        }
                                    </Select>
                                </FormControl>
                                {/* 依照上面選擇的收件人跟信件標題，直接生成對應的信件內容 */}
                                {/* quotation_request跟igdpurchase在letter_draft.js裡面 */}
                                {
                                    title === '報價請求' ? <Quotation_request receiver={receiver} user={user.name} /> : null
                                }
                                {
                                    title === '材料採購' ? <IgdPurchase receiver={receiver} user={user.name} /> : null
                                }
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default LetterWriting;