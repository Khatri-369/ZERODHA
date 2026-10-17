import React from 'react';
import OpenAccount from "../OpenAccount.jsx";
import Hero from "./Hero.jsx";
import Brokerage from "./Brokerage.jsx";
import Charges from "./Charges.jsx";

function PricingPage() {
    return (
        <div className="container text-center my-5">
            <Hero />
            <hr />
            <Brokerage />
            <OpenAccount />
            <hr className="mt-5" />
            <Charges />
        </div>
    );
}

export default PricingPage;