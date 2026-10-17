import React from "react";

export default function Team() {
    return (
        <div className="container mt-5">
            <div className="row">
                <h1 className="text-center mb-5" style={{ fontSize: "30px", fontWeight: "600" }}>
                    People
                </h1>
            </div>

            <div className="row text-muted" style={{ fontSize: "1.05rem", lineHeight: "1.8" }}>
                <div className="col-12 col-md-6 text-center">
                    <img
                        src="media/images/nithinKamath.jpg"
                        alt="Nithin Kamath"
                        style={{ width: "55%", borderRadius: "100%" }}
                    />
                    <h5 className="mt-4 text-dark" style={{ fontSize: "20px", fontWeight: "500" }}>
                        Nithin Kamath
                    </h5>
                    <p className="text-muted" style={{ fontSize: "15px" }}>
                        Founder, CEO
                    </p>
                </div>

                <div className="col-12 col-md-6 px-4">
                    <p>
                        Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.
                    </p>
                    <p>
                        He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).
                    </p>
                    <p>
                        Playing basketball is his zen.
                    </p>
                    <p>
                        Connect on <a href="#" style={{ textDecoration: "none" }}>Homepage</a> / <a href="#" style={{ textDecoration: "none" }}>TradingQnA</a> / <a href="#" style={{ textDecoration: "none" }}>Twitter</a>
                    </p>
                </div>
            </div>
        </div>
    );
}