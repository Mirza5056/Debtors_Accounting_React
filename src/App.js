import React from "react";
import Index from "./networking/public/Index";
import Items from "./networking/public/Items";
import Customer from "./networking/public/Customer";
import Traders from "./networking/public/Trader";
import Invoice from "./networking/public/Invoice";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Main from "./networking/public/Main";
const App=()=>{
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" Component={Index} />
                    <Route path="/items" Component={Items} />
                    <Route path="/customer" Component={Customer} />
                    <Route path="/traders" Component={Traders} />
                    <Route path="/invoice" Component={Invoice} />
                    <Route path="/main" Component={Main} />
                </Routes>
            </div>
        </Router>
    );
};
export default App;