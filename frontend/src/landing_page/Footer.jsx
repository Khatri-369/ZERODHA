import React from "react";

function Footer() {
    return (
        <footer className="border-top mt-5" style={{ backgroundColor: "#fbfbfb" }}>
            <div className="container mt-5">
                <div className="row mt-5">
                    <div className="col">
                        <img src="media/images/logo.svg" style={{ width: "50%" }} alt="Logo" />
                        <p className="text-muted mt-3" style={{ fontSize: "14px" }}>
                            &copy; 2010 - 2026, Zerodha Broking Ltd.<br />All rights reserved.
                        </p>
                        <div className="d-flex gap-3 mt-4 fs-5">
                            <a href="#" className="text-muted"><i className="fa-brands fa-x-twitter"></i></a>
                            <a href="#" className="text-muted"><i className="fa-brands fa-square-facebook"></i></a>
                            <a href="#" className="text-muted"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#" className="text-muted"><i className="fa-brands fa-linkedin-in"></i></a>
                            <a href="#" className="text-muted"><i className="fa-brands fa-telegram"></i></a>
                        </div>
                        <hr />
                        <div className="d-flex gap-3 mt-4 fs-5">
                            <a href="#" className="text-muted"><i className="fa-brands fa-youtube"></i></a>
                            <a href="#" className="text-muted"><i className="fa-brands fa-whatsapp"></i></a>
                            <a href="#" className="text-muted"><i className="fa-brands fa-telegram"></i></a>
                        </div>
                        <div className="d-flex gap-3 mt-4">
                            <a href="#"><img src="media/images/googlePlayBadge.svg" alt="googlePlay" /></a>
                            <a href="#"><img src="media/images/appStoreBadge.svg" alt="appStore" /></a>
                        </div>
                    </div>

                    <div className="col">
                        <h5 className="mb-3" style={{ fontSize: "17px", fontWeight: "500" }}>Account</h5>
                        <ul className="list-unstyled" style={{ fontSize: "14px" }}>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Open demat account</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Minor demat account</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">NRI demat account</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">HUF demat account</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Commodity</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Dematerialisation</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Fund transfer</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">MTF</a></li>
                        </ul>
                    </div>

                    <div className="col">
                        <h5 className="mb-3" style={{ fontSize: "17px", fontWeight: "500" }}>Support</h5>
                        <ul className="list-unstyled" style={{ fontSize: "14px" }}>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Contact us</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Support portal</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">How to file a complaint?</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Status of your complaints</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Bulletin</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Circular</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Z-Connect blog</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Downloads</a></li>
                        </ul>
                    </div>

                    <div className="col">
                        <h5 className="mb-3" style={{ fontSize: "17px", fontWeight: "500" }}>Company</h5>
                        <ul className="list-unstyled" style={{ fontSize: "14px" }}>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">About</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Philosophy</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Press & media</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Careers</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Zerodha Cares (CSR)</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Zerodha.tech</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Open source</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Referral program</a></li>
                        </ul>
                    </div>

                    <div className="col">
                        <h5 className="mb-3" style={{ fontSize: "17px", fontWeight: "500" }}>Quick links</h5>
                        <ul className="list-unstyled" style={{ fontSize: "14px" }}>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Upcoming IPOs</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Brokerage charges</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Market holidays</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Economic calendar</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Calculators</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Markets</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Sectors</a></li>
                            <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Gift Nifty</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-5 text-muted" style={{ fontSize: "11px", lineHeight: "1.6" }}>
                    <p>
                        Zerodha Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019 Commodity Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025; NSE-50001 – SEBI Registration no.: INZ000038238 Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking please write to complaints@zerodha.com, for DP related to dp@zerodha.com. Please ensure you carefully read the Risk Disclosure Document as prescribed by SEBI | ICF.
                    </p>
                    <p>
                        Procedure to file a complaint on SEBI SCORES: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of the grievances.
                    </p>
                    <p>
                        Investments in securities market are subject to market risks; read all the related documents carefully before investing.
                    </p>
                </div>
            </div>
        </footer >
    );
}

export default Footer;