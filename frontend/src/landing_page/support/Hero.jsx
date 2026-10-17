import React from "react";

export default function Hero() {
    return (
        <section className="container-fluid py-5 mb-4" style={{ backgroundColor: "#387ed1", color: "white" }}>
            <div className="container">
                {/* Top header row */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fs-5 fw-medium mb-0">Support Portal</h4>
                    <a href="#" className="text-white text-decoration-underline" style={{ fontSize: "15px" }}>
                        Track tickets
                    </a>
                </div>

                {/* Main content row */}
                <div className="row mt-4 align-items-start">
                    {/* Left Column: Search & Quick Links */}
                    <div className="col-lg-7 col-md-6 mb-4">
                        <h1 className="fs-4 fw-normal mb-4 lh-base" style={{ maxWidth: "520px" }}>
                            Search for an answer or browse help topics to create a ticket
                        </h1>

                        <div className="position-relative my-4">
                            <input
                                type="text"
                                className="form-control py-3 ps-4 pe-5 border-0 shadow-sm"
                                placeholder="Eg: how do i activate F&O, why is my order getting rejected ..."
                                style={{ borderRadius: "4px", fontSize: "15px" }}
                            />
                            <a href="#"><i
                                className="fa-solid fa-magnifying-glass position-absolute text-muted"
                                style={{ right: "18px", top: "50%", transform: "translateY(-50%)", fontSize: "16px" }}
                            ></i></a>
                        </div>

                        <div className="d-flex flex-wrap gap-3 pt-1" style={{ fontSize: "14px" }}>
                            <a href="#" className="text-white text-decoration-underline">Track account opening</a>
                            <a href="#" className="text-white text-decoration-underline">Track segment activation</a>
                            <a href="#" className="text-white text-decoration-underline">Intraday margins</a>
                            <a href="#" className="text-white text-decoration-underline">Kite user manual</a>
                        </div>
                    </div>

                    {/* Right Column: Featured Links */}
                    <div className="col-lg-5 col-md-6 ps-md-5 mt-2 mt-md-0">
                        <h4 className="fs-5 fw-medium mb-3">Featured</h4>
                        <ol className="ps-3" style={{ lineHeight: "2.2", fontSize: "15px" }}>
                            <li className="mb-2">
                                <a href="#" className="text-white text-decoration-underline">
                                    Current Takeovers and Delisting - January 2024
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-white text-decoration-underline">
                                    Latest Intraday leverages and square-off timings - MIS & CO
                                </a>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}