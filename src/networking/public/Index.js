import React from "react";
import { Link } from "react-router-dom";
const Index=()=>{
    return (
        <div>
            <h2>Welcome Debtor's Accounting Web Application</h2>
            <Link to="/items">Items</Link>
        </div>
    );
};
export default Index;