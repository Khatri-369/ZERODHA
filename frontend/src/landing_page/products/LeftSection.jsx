import React from "react";

export default function LeftSection({ imageURL, productName, productDescription, tryDemo, learnMore, googlePlay, appStore }) {
    return (
        <>
            <div className="container my-5">
                <div className="row align-items-center">
                    <div className="col-12 col-md-6 p-4 text-center">
                        <img src={imageURL} alt={productName} className="img-fluid" style={{ maxHeight: "380px", objectFit: "contain" }} />
                    </div>
                    <div className="col-12 col-md-6 p-4">
                        <h1 className="mb-3">{productName}</h1>
                        <p className="mb-4 text-muted" style={{ lineHeight: "1.8", fontSize: "16px" }}>{productDescription}</p>
                        <div className="mb-4">
                            <a href={tryDemo} className="text-decoration-none me-4" style={{ color: "#387ed1" }}>Try Demo <i className="fa-solid fa-arrow-right-long ms-1"></i></a>
                            <a href={learnMore} className="text-decoration-none" style={{ color: "#387ed1" }}>Learn More <i className="fa-solid fa-arrow-right-long ms-1"></i></a>
                        </div>
                        <div className="d-flex gap-3 align-items-center">
                            <a href={googlePlay}><img src="media/images/googlePlayBadge.svg" alt="Google Play" /></a>
                            <a href={appStore}><img src="media/images/appstoreBadge.svg" alt="App Store" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}