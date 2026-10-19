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
                        src="media/images/omKhatri.jpg"
                        alt="Om Kumar Khatri"
                        style={{ width: "55%", borderRadius: "100%", boxShadow: "0 10px 25px rgba(0,0,0,0.12)" }}
                    />
                    <h5 className="mt-4 text-dark" style={{ fontSize: "20px", fontWeight: "600" }}>
                        Om Kumar Khatri
                    </h5>
                    <p className="text-muted" style={{ fontSize: "15px" }}>
                        Founder & Chief Architect
                    </p>
                </div>

                <div className="col-12 col-md-6 px-4">
                    <p>
                        Om bootstrapped and engineered TradeFlow to democratize modern stock trading, building a high-speed, intuitive platform with zero brokerage and institutional-grade execution technology.
                    </p>
                    <p>
                        Passionate about scalable distributed systems, modern fintech architectures, and algorithmic trading infrastructure, Om leads the technology and product vision at TradeFlow.
                    </p>
                    <p>
                        Building high-performance software and exploring market structures is his zen.
                    </p>
                    <p>
                        Connect on <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>LinkedIn</a> / <a href="https://github.com/Khatri-369" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>GitHub</a> / <a href="mailto:khatriom12062007@gmail.com" style={{ textDecoration: "none" }}>Email</a>
                    </p>
                </div>
            </div>
        </div>
    );
}