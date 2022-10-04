import React from "react";
import LetterGrid from "./Letter/letter_grid";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LetterReceive from "./Letter/letter_receive";
import LetterWriting from "./Letter/letter_writing";
import Manufactor from "./manufactor/mf_list";
import Product from "./manufactor/mf_product";
import LetterReply from "./Letter/letter_reply";
import HarborMain from "./harbor/harbor_main";
import HarborSend from "./harbor/harbor_send";
import Company_Service from "./Company/Service.js"
import Company_FinanInfo from "./Company/FinanInfo.js";
import Company_Warehouse from "./Company/Warehouse.js";
import Company_Info from "./Company/Company_Info.js";
import Company_Other from "./Company/Other.js";
import Company_Catalog_Add2 from "./Company/Catalog_Add2";
import Company_Catalog2 from "./Company/Catalog2";

const user = {
    name: 'takodachi公司',
    type: 'manufacturer'
};

class MainContainer extends React.Component {
    render() {
        return (
            <div className="main_frame">
                <div className="letter_frame">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={
                                <div>
                                    <Link to={`/letter_list`}>
                                        Click here to go to mail page.
                                    </Link>
                                    <Link to={`/manufactory`}>
                                        Click here to go to manufactory page.
                                    </Link>
                                    <Link to={`/harbor`}>
                                        Click here to go to harbor page.
                                    </Link>
                                </div>
                            } />
                            <Route path='/letter_list'>
                                <Route index element={<LetterGrid user={user} />} />
                                <Route
                                    path=":letterId"
                                    element={
                                        <LetterReceive
                                            user={user}
                                        />
                                    }
                                />
                            </Route>
                            <Route path="/letter_writing">
                                <Route index element={
                                    <LetterWriting
                                        user={user}
                                    />
                                } />
                                <Route
                                    path=":letterId"
                                    element={
                                        <LetterReply
                                            user={user}
                                        />
                                    } />
                            </Route>
                            <Route path="/manufactory">
                                <Route index element={<Manufactor user={user} />} />
                                <Route path="product" element={<Product user={user} />} />
                            </Route>
                            <Route path="/harbor">
                                <Route index element={<HarborMain user={user} />} />
                                <Route path=":contractId" element={<HarborSend user={user} />} />
                            </Route>
                            <Route path='/Company_Service'>
                                <Route index element={<Company_Service />} />
                            </Route>
                            <Route path='/Company_FinanInfo'>
                                <Route index element={<Company_FinanInfo />} />
                            </Route>
                            <Route path='/Company_Warehouse'>
                                <Route index element={<Company_Warehouse />} />
                            </Route>
                            <Route path='/Company_Info'>
                                <Route index element={<Company_Info />} />
                            </Route>
                            <Route path='/Company_Other'>
                                <Route index element={<Company_Other />} />
                            </Route>

                            <Route path='/Company_Catalog_Add2'>
                                <Route index element={<Company_Catalog_Add2 />} />
                            </Route>
                            <Route path='/Company_Catalog2'>
                                <Route index element={<Company_Catalog2 />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        )
    }
}

export default MainContainer;