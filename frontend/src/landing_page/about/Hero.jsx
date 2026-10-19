import React from "react";

export default function Hero() {
    return (
        <>
            <div className="container my-5">
                <div className="row">
                    <h1 className="text-center mb-5" style={{ fontSize: "30px", fontWeight: "600" }}>We pioneered the discount broking model in India.<br />
                        Now, we are breaking ground with our technology.</h1>
                    <hr className="mt-5" />

                    <div className="row d-flex justify-content-center mt-5" style={{ columnGap: "5%", flexWrap: "wrap-reverse" }}>
                        <div className="col-5" style={{ fontSize: "18px" }}>
                            We kick-started operations with the goal of breaking all barriers that traders and investors face in India in terms of cost, support, and technology. We named the company TradeFlow, representing seamless capital flow and effortless, lightning-fast execution.
                            <br /><br />
                            Today, our disruptive zero-brokerage model and modern cloud-native architecture power traders across India with speed and confidence.
                            <br /><br />
                            Over 1.8+ crore clients place billions of orders every year through our powerful ecosystem of investment platforms, contributing over 15% of all retail trading volumes.
                        </div>

                        <div className="col-6" style={{ fontSize: "18px" }}>
                            In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.
                            <br /><br />
                            <a href="#" style={{ textDecoration: "none" }}>Rainmatter</a>, our fintech fund and incubator, has invested in several fintech startups with the goal of growing the Indian capital markets.
                            <br /><br />
                            And yet, we are always up to something new every day. Catch up on the latest updates on our <a href="#" style={{ textDecoration: "none" }}>blog</a> or see what the media is <a href="#" style={{ textDecoration: "none" }}>saying about us</a> or learn more about our business and product <a href="#" style={{ textDecoration: "none" }}>philosophies</a>.
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}