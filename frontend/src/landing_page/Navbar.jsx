import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3002/user/profile", { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            })
            .catch(() => setUser(null));
    }, [location]);

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:3002/logout", { credentials: "include" });
        } catch (e) {
            console.error("Logout error", e);
        }
        setUser(null);
        navigate("/login");
    };

    return (
        <div className="container-fluid sticky-top bg-white">
            <nav className="navbar navbar-expand-lg border-bottom" style={{ backgroundColor: "#FFF" }}>
                <div className="container p-2">
                    <Link className="navbar-brand" to="/">
                        <img src="media/images/logo.svg" style={{ width: "130px" }} alt="Logo" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-lg-0 align-items-lg-center">
                            {user ? (
                                <>
                                    <li className="nav-item">
                                        <a
                                            className="btn btn-sm btn-outline-primary mx-2 px-3 fw-medium"
                                            href="http://localhost:3001"
                                            title="Open Kite Dashboard"
                                        >
                                            <i className="fa-solid fa-chart-line me-1"></i> Dashboard
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <span className="badge bg-light text-dark border px-3 py-2 mx-1 fw-medium">
                                            <i className="fa-regular fa-user me-1 text-primary"></i> {user.username}
                                        </span>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            onClick={handleLogout}
                                            className="btn btn-sm btn-light border mx-2 px-3 text-danger fw-medium"
                                            title="Log out"
                                        >
                                            <i className="fa-solid fa-arrow-right-from-bracket me-1"></i> Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active mx-2" to="/signup">
                                            Signup
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active mx-2 fw-medium text-primary" to="/login">
                                            Login
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                <Link className="nav-link active mx-2" to="/about">
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active mx-2" to="/products">
                                    Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active mx-2" to="/pricing">
                                    Pricing
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active mx-2" to="/support">
                                    Support
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;