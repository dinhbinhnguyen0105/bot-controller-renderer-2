import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import "./App.css";
import Home from "./Page/Home/Home";
import Marketplace from "./Page/Marketplace/Marketplace";
import User from "./Page/User/User";
import List from "./Page/User/List/List";
import Create from "./Page/User/Create/Create";
import Setting from "./Page/User/Setting/Setting";
import Info from "./Page/User/Info/Info";



const App: React.FC = () => {

    return (
        <>
            {/* <div className="app"></div> */}
            <Router>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/user" element={<User />}>
                        <Route index element={<List />} />
                        <Route path="list" element={<List />} />
                        <Route path="create" element={<Create />} />
                        <Route path="setting" element={<Setting />} />
                        <Route path=":uid" element={<Info />} />
                    </Route>
                    <Route path="/marketplace" element={<Marketplace />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;