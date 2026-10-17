import React from "react";

export default function LeftSection({ imageURL, productName, productDescription, tryDemo, learnMore, googlePlay, appStore }) {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-6 p-3">
                        <img src={imageURL} alt={productName} />
                    </div>
                    <div className="col-6">
                        <h1 className="mt-5">{productName}</h1>
                        <p className="mt-5 mb-3">{productDescription}</p>
                        <a href={tryDemo} className="text-decoration-none" style={{ marginRight: "70px" }}>Try Demo  <i className="fa-solid fa-arrow-right-long"></i></a>
                        <a href={learnMore} className="ms-4 text-decoration-none" style={{ marginLeft: "50px" }}>Learn More  <i className="fa-solid fa-arrow-right-long"></i></a><br /><br />
                        <a href={googlePlay}><img src="media/images/googlePlayBadge.svg" alt="Google Play" /></a>&nbsp;&nbsp;
                        <a href={appStore} style={{ marginLeft: "40px" }}><img src="media/images/appstoreBadge.svg" alt="App Store" /></a>
                    </div>
                </div>
            </div>
        </>
    );
}