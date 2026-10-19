import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, DASHBOARD_URL } from "../config";

function Navbar() {
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const getNavLinkClass = ({ isActive }) =>
        `nav-link mx-2 ${isActive ? "text-primary fw-semibold" : "text-muted"}`;

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/user/profile`, { withCredentials: true })
            .then((res) => {
                if (res.data && (res.data.success || res.data.user)) {
                    setUser(res.data.user);
                } else {
                    setUser(null);
                }
            })
            .catch(() => setUser(null));
    }, [location]);

    const handleLogout = async () => {
        try {
            await axios.get(`${API_BASE_URL}/logout`, { withCredentials: true });
        } catch (e) {
            console.error("Logout error", e);
        }
        setUser(null);
        navigate("/");
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
                                            href={DASHBOARD_URL}
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
                                        <NavLink className={getNavLinkClass} to="/signup">
                                            Signup
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className={getNavLinkClass} to="/login">
                                            Login
                                        </NavLink>
                                    </li>
                                </>
                            )}
                            <li className="nav-item">
                                <NavLink className={getNavLinkClass} to="/about">
                                    About
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={getNavLinkClass} to="/products">
                                    Products
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={getNavLinkClass} to="/pricing">
                                    Pricing
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={getNavLinkClass} to="/support">
                                    Support
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;