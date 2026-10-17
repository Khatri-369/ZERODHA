import React from "react";

function Education() {
    return (
        <>
            <div className="container p-3">
                <div className="row p-5">
                    <div className="col-md-6">
                        <img src="media/images/index-education.svg" alt="VARSITY" />
                    </div>
                    <div className="col-md-6 mt-3">
                        <h2 className="mb-5">Free and open market education</h2>
                        <p className="text-muted">Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                        <a href="https://zerodha.com/varsity/" style={{ textDecoration: "none" }}>Varsity <i className="fa-solid fa-arrow-right-long"></i></a>

                        <p className="text-muted mt-5">TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                        <a href="https://zerodha.com/varsity/" style={{ textDecoration: "none" }}>TradingQ&A <i className="fa-solid fa-arrow-right-long"></i></a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Education;