import React from "react";

function Pricing() {
    return (
        <div className="container my-5 py-5">
            <div className="row align-items-center">
                <div className="col-md-4">
                    <h1 className="fs-2 mb-4">Unbeatable pricing</h1>
                    <p className="text-muted mb-4">
                        We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.
                    </p>
                    <a href="https://zerodha.com/charges/#tab-equities" style={{ textDecoration: "none" }}>
                        See pricing <i className="fa-solid fa-arrow-right-long"></i>
                    </a>
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-4 d-flex align-items-center">
                            <img src="media/images/pricing0.svg" alt="Free account opening" style={{ width: "95px" }} />
                            <p className="text-muted mb-0 ms-1" style={{ fontSize: "11px", lineHeight: "1.4" }}>
                                Free account<br />opening
                            </p>
                        </div>
                        <div className="col-4 d-flex align-items-center">
                            <img src="media/images/pricing0.svg" alt="Free equity delivery" style={{ width: "95px" }} />
                            <p className="text-muted mb-0 ms-1" style={{ fontSize: "11px", lineHeight: "1.4" }}>
                                Free equity delivery<br />and direct mutual funds
                            </p>
                        </div>
                        <div className="col-4 d-flex align-items-center">
                            <img src="media/images/intradayTrades.svg" alt="Intraday and F&O" style={{ width: "95px" }} />
                            <p className="text-muted mb-0 ms-1" style={{ fontSize: "11px", lineHeight: "1.4" }}>
                                Intraday and<br />F&O
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;