import React from "react";

export default function RightSection({
    imageURL,
    productName,
    productDescription,
    learnMore,
}) {
    return (
        <div className="container mt-5">
            <div className="row align-items-center">
                <div className="col-12 col-md-5 p-5 text-start">
                    <h1>{productName}</h1>
                    <p className="mt-3 text-muted" style={{ lineHeight: "1.8", fontSize: "16px" }}>
                        {productDescription}
                    </p>
                    <div>
                        <a href={learnMore} className="text-decoration-none" style={{ color: "#387ed1" }}>
                            Learn More <i className="fa-solid fa-arrow-right-long ms-2"></i>
                        </a>
                    </div>
                </div>
                <div className="col-12 col-md-7 text-center">
                    <img src={imageURL} alt={productName} className="img-fluid" />
                </div>
            </div>
        </div>
    );
}