import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
    return (
        <div className="container mt-5 text-center">
            <h1 className="mb-3">Open a Zerodha account</h1>
            <p>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
            <Link to="/signup" className="btn btn-primary fs-5 mt-3 text-decoration-none">
                Sign Up For Free
            </Link>
        </div>
    );
}

export default OpenAccount;