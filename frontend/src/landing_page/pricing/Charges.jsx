import React from "react";

function Charges() {
    return (
        <div className="container p-5">
            <div className="row text-center justify-content-center">
                <div className="col-md-6">
                    <a href="#" style={{ textDecoration: 'none' }}><h1> BROKERAGE CALCULATOR</h1></a>
                    <ul className="p-3 mb-4 mt-3 text-secondary" style={{ lineHeight: "1.8", fontSize: "17px" }}>
                        <li className="mb-2 ms-5">Additional charges of ₹50 per order for orders placed through a </li>
                        <li className="mb-2 ms-5">STT is not charged on trades of shares and on sell side of equity. </li>
                        <li className="mb-2 ms-5">Exchange transaction charges are not charged on sell side of equity</li>
                        <li className="mb-2 ms-5">GST is applicable on the total of brokerage, transaction charges and</li>
                        <li className="mb-2 ms-5">SEBI charges ₹450 per crore on the total of buy and sell turnover.</li>
                        <li className="mb-2 ms-5">SEBI charges ₹10 per crore on the total of buy and sell turnover for</li>
                    </ul>
                </div>
                <div className="col-md-6">
                    <a href="#" style={{ textDecoration: 'none' }}><h1> List Of Charges</h1></a>
                </div>
            </div>
        </div >
    );
}

export default Charges;