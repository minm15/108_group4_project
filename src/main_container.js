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
                                <Route index element={<LetterGrid />} />
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
                                <Route index element={<Manufactor />} />
                                <Route path="product" element={<Product />} />
                            </Route>
                            <Route path="/harbor">
                                <Route index element={<HarborMain user={user} />} />
                                <Route path=":contractId" element={<HarborSend user={user} />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        )
    }
}

export default MainContainer;