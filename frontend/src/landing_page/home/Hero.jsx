import React from "react";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <div className="container p-5">
            <div className="row text-center justify-content-center">
                <div className="col-md-6">
                    <img
                        src="media/images/homeHero.png"
                        alt="HERO IMAGE"
                        className="mb-5"
                        style={{ width: "100%", height: "300px" }}
                    />
                    <h1 className="mt-5">Invest in Everything</h1>
                    <p className="lead">Online platform to invest in stocks, IPOs, derivatives, mutual funds, ETFs, bonds, and more.</p>
                    <Link to="/signup" className="btn btn-primary btn-lg fs-5 mb-5 text-decoration-none">
                        Sign Up For Free
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Hero;