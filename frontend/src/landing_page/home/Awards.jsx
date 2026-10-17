import React from "react";

function Awards() {
    return (
        <>
            <div className="container p-4 mb-5">
                <div className="row">
                    <div className="col-md-6">
                        <img src="media/images/largestBroker.svg" alt="largest Broker" />
                    </div>

                    <div className="col-md-6">
                        <h1>Largest stockbroker in India by active clients</h1>
                        <p>We make it simple to buy and sell stocks, derivatives, mutual funds, and more.</p>
                        <div className="row p-4">
                            <div className="col-md-6">
                                <ul>
                                    <li>Future And Options</li>
                                    <li>Commodity And Derivatives</li>
                                    <li>Currency Derivatives</li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <ul>
                                    <li>IPO</li>
                                    <li>Mutual Funds</li>
                                    <li>Bonds</li>
                                </ul>
                            </div>
                        </div>
                        <img src="media/images/pressLogos.png" style={{ width: "100%", height: "50px" }} alt="presslogos" />
                    </div>
                </div>  
            </div>
        </>
    );
}

export default Awards;