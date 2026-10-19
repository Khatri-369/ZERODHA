import React from "react";

export default function Hero() {
    return (
        <>
            <div className="container text-center py-3">
                <h1 className="fw-bold">TradeFlow Products</h1>
                <p className="text-secondary" style={{ fontSize: "18px" }}>Sleek, modern, and intuitive trading platforms</p>
                <p className="text-secondary" style={{ fontSize: "18px" }}>Check out our <a href="#" style={{ textDecoration: "none" }}>investment offerings <i className="fa-solid fa-arrow-right-long"></i></a></p>
            </div>
            <hr />
        </>
    );
}