import React from "react";

export default function CreateTicket() {
    return (
        <div className="container py-5">
            <h2 className="fs-4 text-secondary fw-normal mb-5">
                To create a ticket, select a relevant topic
            </h2>

            <div className="row">
                {/* 1. Account Opening */}
                <div className="col-lg-4 col-md-6 mb-5">
                    <h4 className="fs-5 fw-normal mb-3 text-dark d-flex align-items-center">
                        <i className="fa-solid fa-circle-plus me-3 text-secondary"></i>
                        <span>Account Opening</span>
                    </h4>
                    <ul className="list-unstyled ps-4" style={{ lineHeight: "2.4", fontSize: "14.5px" }}>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Online Account Opening</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Offline Account Opening</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Company, Partnership and HUF Account Opening</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Non Resident Indian (NRI)</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Charges at Zerodha</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Zerodha IDFC FIRST Bank 3-in-1 Account</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Getting Started</a></li>
                    </ul>
                </div>

                {/* 2. Your Zerodha Account */}
                <div className="col-lg-4 col-md-6 mb-5">
                    <h4 className="fs-5 fw-normal mb-3 text-dark d-flex align-items-center">
                        <i className="fa-regular fa-user me-3 text-secondary"></i>
                        <span>Your Zerodha Account</span>
                    </h4>
                    <ul className="list-unstyled ps-4" style={{ lineHeight: "2.4", fontSize: "14.5px" }}>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Login credentials</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Your Profile</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Account modification and segment addition</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>CMR & DP ID</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Nomination</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Transfer and conversion of shares</a></li>
                    </ul>
                </div>

                {/* 3. Trading and Markets */}
                <div className="col-lg-4 col-md-6 mb-5">
                    <h4 className="fs-5 fw-normal mb-3 text-dark d-flex align-items-center">
                        <i className="fa-solid fa-chart-line me-3 text-secondary"></i>
                        <span>Trading and Markets</span>
                    </h4>
                    <ul className="list-unstyled ps-4" style={{ lineHeight: "2.4", fontSize: "14.5px" }}>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Trading FAQs</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Kite</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Margins</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Product and order types</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Corporate actions</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Kite features</a></li>
                    </ul>
                </div>

                {/* 4. Funds */}
                <div className="col-lg-4 col-md-6 mb-5">
                    <h4 className="fs-5 fw-normal mb-3 text-dark d-flex align-items-center">
                        <i className="fa-regular fa-credit-card me-3 text-secondary"></i>
                        <span>Funds</span>
                    </h4>
                    <ul className="list-unstyled ps-4" style={{ lineHeight: "2.4", fontSize: "14.5px" }}>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Fund withdrawal</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Adding funds</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Adding bank accounts</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>eMandates</a></li>
                    </ul>
                </div>

                {/* 5. Console */}
                <div className="col-lg-4 col-md-6 mb-5">
                    <h4 className="fs-5 fw-normal mb-3 text-dark d-flex align-items-center">
                        <i className="fa-solid fa-chart-pie me-3 text-secondary"></i>
                        <span>Console</span>
                    </h4>
                    <ul className="list-unstyled ps-4" style={{ lineHeight: "2.4", fontSize: "14.5px" }}>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>IPO</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Portfolio</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Funds statement</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Profile</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Reports</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Referral program</a></li>
                    </ul>
                </div>

                {/* 6. Coin */}
                <div className="col-lg-4 col-md-6 mb-5">
                    <h4 className="fs-5 fw-normal mb-3 text-dark d-flex align-items-center">
                        <i className="fa-solid fa-coins me-3 text-secondary"></i>
                        <span>Coin</span>
                    </h4>
                    <ul className="list-unstyled ps-4" style={{ lineHeight: "2.4", fontSize: "14.5px" }}>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Understanding mutual funds and Coin</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Coin app</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Coin web</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>Transactions and reports</a></li>
                        <li><a href="#" className="text-decoration-none" style={{ color: "#387ed1" }}>National Pension Scheme (NPS)</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}