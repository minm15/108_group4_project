import React from "react";
import LetterGrid from "./Letter/letter_grid";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LetterReceive from "./Letter/letter_receive";
import LetterWriting from "./Letter/letter_writing";
import Manufactor from "./manufactor/mf_list";

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
                            <Route path="/manufactory" element={<Manufactor />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        )
    }
}

export default MainContainer;