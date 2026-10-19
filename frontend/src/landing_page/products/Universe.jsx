import React from "react";

export default function Universe() {
    return (
        <div className="container mt-5 text-center">
            <h1 className="mt-5">The TradeFlow Universe</h1>
            <p className="mt-3 text-muted">
                Extend your trading and investment experience even further with our partner platforms
            </p>
            <div className="row mt-5">
                <div className="col-4 p-3">
                    <img src="media/images/smallcaseLogo.png" alt="smallcase" style={{ width: "180px" }} />
                    <p className="text-small text-muted mt-2">Thematic investment platform</p>
                </div>
                <div className="col-4 p-3">
                    <img src="media/images/streakLogo.png" alt="Streak" style={{ width: "150px" }} />
                    <p className="text-small text-muted mt-2">Algo & strategy platform</p>
                </div>
                <div className="col-4 p-3">
                    <img src="media/images/sensibullLogo.svg" alt="Sensibull" style={{ width: "180px" }} />
                    <p className="text-small text-muted mt-2">Options trading platform</p>
                </div>
                <div className="col-4 p-3 mt-4">
                    <img src="media/images/zerodhaFundhouse.png" alt="TradeFlow Fund House" style={{ width: "180px" }} />
                    <p className="text-small text-muted mt-2">Asset management</p>
                </div>
                <div className="col-4 p-3 mt-4">
                    <img src="media/images/goldenpiLogo.png" alt="GoldenPi" style={{ width: "180px" }} />
                    <p className="text-small text-muted mt-2">Bonds trading platform</p>
                </div>
                <div className="col-4 p-3 mt-4">
                    <img src="media/images/dittoLogo.png" alt="Ditto" style={{ width: "120px" }} />
                    <p className="text-small text-muted mt-2">Insurance</p>
                </div>
            </div>
            <button className="btn btn-primary fs-5 mt-4 mb-5 px-4 py-2" style={{ backgroundColor: "#387ed1" }}>
                Sign up for free
            </button>
        </div>
    );
}