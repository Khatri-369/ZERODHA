import React from "react";

function Stats() {
    return (
        <div className="container p-3">
            <div className="row p-5">
                <div className="col-6 p-5">
                    <h1 className="fs-2 mb-5">Trust with confidence</h1>

                    <h2 className="fs-4">Customer-first always</h2>
                    <p className="text-muted">
                        That's why 1.8+ crore customers trust Zerodha with ~ ₹9 lakh crores of equity investments, making us India’s largest broker; contributing to 15% of daily retail exchange volumes in India.
                    </p>

                    <h2 className="fs-4">No spam or gimmicks</h2>
                    <p className="text-muted">
                        No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like. <a href="https://zerodha.com/about/philosophy" style={{ textDecoration: "none" }}>Our philosophies</a>.
                    </p>

                    <h2 className="fs-4">The Zerodha universe</h2>
                    <p className="text-muted">
                        Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.
                    </p>

                    <h2 className="fs-4">Do better with money</h2>
                    <p className="text-muted">
                        With initiatives like <a href="https://support.zerodha.com/category/trading-and-markets/alerts-and-nudges/nudges/articles/what-is-nudge" style={{ textDecoration: "none" }}>Nudge</a> and <a href="https://support.zerodha.com/category/console/segments/killswitch/articles/what-is-the-kill-switch" style={{ textDecoration: "none" }}>Kill Switch</a>, we don't just facilitate transactions, but actively help you do better with your money.
                    </p>
                </div>
                <div className="col-6 p-5">
                    <img src="media/images/ecosystem.png" style={{ width: "90%" }} alt="Ecosystem" />
                    <div className="text-center mt-3">
                        <a href="https://zerodha.com/products" className="mx-5" style={{ textDecoration: "none" }}>
                            Explore our products <i className="fa-solid fa-arrow-right-long"></i>
                        </a>
                        <a href="https://kite-demo.zerodha.com/dashboard" style={{ textDecoration: "none" }}>
                            Try Kite demo <i className="fa-solid fa-arrow-right-long"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats;