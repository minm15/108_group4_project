import React from "react";
import LetterGrid from "./Letter/letter_grid";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LetterReceive from "./Letter/letter_receive";
import LetterWriting from "./Letter/letter_writing";
import Manufactor from "./manufactor/mf_list"; 
import Product from "./manufactor/mf_product";
import Company_Service from "./Company/Service.js"
import Company_FinanInfo from "./Company/FinanInfo.js";
import Company_Warehouse from "./Company/Warehouse.js";
import Company_Info from "./Company/Company_Info.js";
import Company_Other from "./Company/Other.js";
import Company_Catalog from "./Company/Catalog";
import Company_Catalog_Add from "./Company/Catalog_Add";
class MainContainer extends React.Component {
    render() {
        return (
            <div className="main_frame">
                {/* <div className="letter_frame"> */}
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
                                    <Link to={`/Company_Info`}>
                                        Click here to go to company page.
                                    </Link>
                                   
                                   
                                </div>
                            } />
                            <Route path='/letter_list'>
                                <Route index element={<LetterGrid />} />
                                <Route
                                    path=":letterId"
                                    element={<LetterReceive />}
                                />
                            </Route>
                            <Route path="/letter_writing" element={<LetterWriting />} />
                            <Route path="/manufactory">
                                <Route index element={<Manufactor />} />
                                <Route path="product" element={<Product />} />
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
                            <Route path='/Company_Catalog'>
                            <Route index element={<Company_Catalog />} />
                            </Route>
                            <Route path='/Company_Catalog_Add'>
                            <Route index element={<Company_Catalog_Add />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            // </div>
        )
    }
}

export default MainContainer;