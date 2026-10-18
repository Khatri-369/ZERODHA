import React from "react";

function Brokerage() {
    return (
        <div className="container p-5">
            <div className="row text-center">
                <div className="col-md-4 p-4">
                    <img
                        src="media/images/pricing0.svg"
                        alt="Free account opening"
                        style={{ width: "200px", height: "200px" }}
                    />
                    <h1>Free equity delivery</h1>
                    <p className="text-muted mt-3 mb-0" style={{ fontSize: "17px", lineHeight: "1.5" }}>
                        All equity delivery investments (NSE, BSE),<br />are absolutely free — ₹ 0 brokerage.
                    </p>
                </div>
                <div className="col-md-4 p-4">
                    <img
                        src="media/images/intradayTrades.svg"
                        alt="Intraday and F&O"
                        style={{ width: "200px", height: "200px" }}
                    />
                    <h1>Intraday and F&O trades</h1>
                    <p className="text-muted mt-3 mb-0" style={{ fontSize: "17px", lineHeight: "1.5" }}>
                        Flat ₹ 20 or 0.03% (whichever is lower) per<br />executed order on intraday trades across<br />equity, currency, and commodity trades. Flat<br />₹20 on all option trades.
                    </p>
                </div>
                <div className="col-md-4 p-4">
                    <img
                        src="media/images/pricing0.svg"
                        alt="Free equity delivery"
                        style={{ width: "200px", height: "200px" }}
                    />
                    <h1>Free direct MF</h1>
                    <p className="text-muted mt-3 mb-0" style={{ fontSize: "17px", lineHeight: "1.5" }}>
                        All direct mutual fund investments are<br />absolutely free — ₹ 0 commissions & DP<br />charges.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Brokerage;  