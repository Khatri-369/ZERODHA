import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, DASHBOARD_URL } from "../../config";

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        if (!formData.username.trim() || !formData.email.trim() || !formData.password) {
            setErrorMsg("All fields are required.");
            return;
        }

        if (formData.password.length < 6) {
            setErrorMsg("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post(`${API_BASE_URL}/signup`, formData, {
                withCredentials: true,
            });

            if (res.data && (res.data.success || res.status === 201 || res.data.token)) {
                setSuccessMsg("Account created successfully! Redirecting to Dashboard...");
                setTimeout(() => {
                    window.location.href = DASHBOARD_URL;
                }, 800);
            } else {
                setErrorMsg(res.data.message || "Signup failed. Please try again.");
            }
        } catch (err) {
            console.error("Signup network error:", err);
            const msg = err.response?.data?.message || "Failed to connect to the backend server. Please verify your connection or try again.";
            setErrorMsg(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row align-items-center justify-content-center my-4">
                {/* Left Illustration Column */}
                <div className="col-12 col-lg-6 text-center mb-5 mb-lg-0">
                    <img
                        src="media/images/signup.png"
                        alt="Zerodha Signup Illustration"
                        className="img-fluid"
                        style={{ maxHeight: "380px" }}
                    />
                    <div className="mt-4 px-3 text-start d-none d-md-block mx-auto" style={{ maxWidth: "420px" }}>
                        <h4 className="fw-semibold text-muted mb-3" style={{ fontSize: "1.1rem" }}>
                            Why trade with Zerodha?
                        </h4>
                        <ul className="list-unstyled text-secondary" style={{ fontSize: "0.95rem", lineHeight: "1.8" }}>
                            <li><i className="fa-solid fa-check text-success me-2"></i> Free equity investments & ₹0 mutual funds</li>
                            <li><i className="fa-solid fa-check text-success me-2"></i> Flat ₹20 per intraday and F&O trade</li>
                            <li><i className="fa-solid fa-check text-success me-2"></i> Fast, intuitive Kite trading platform</li>
                        </ul>
                    </div>
                </div>

                {/* Right Form Column */}
                <div className="col-12 col-md-8 col-lg-5">
                    <div className="card shadow-sm border-0 p-4 p-md-5" style={{ borderRadius: "12px", backgroundColor: "#fff" }}>
                        <div className="mb-4">
                            <h2 className="fw-bold mb-1" style={{ color: "#387ed1", fontSize: "1.8rem" }}>
                                Signup now
                            </h2>
                            <p className="text-muted" style={{ fontSize: "0.95rem" }}>
                                Or track your existing application
                            </p>
                        </div>

                        {errorMsg && (
                            <div className="alert alert-danger py-2 px-3 mb-3 d-flex align-items-center" role="alert" style={{ fontSize: "0.9rem" }}>
                                <i className="fa-solid fa-circle-exclamation me-2"></i>
                                <div>{errorMsg}</div>
                            </div>
                        )}

                        {successMsg && (
                            <div className="alert alert-success py-2 px-3 mb-3 d-flex align-items-center" role="alert" style={{ fontSize: "0.9rem" }}>
                                <i className="fa-solid fa-circle-check me-2"></i>
                                <div>{successMsg}</div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            {/* Username */}
                            <div className="mb-3">
                                <label className="form-label text-muted small fw-medium mb-1">Username</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0">
                                        <i className="fa-regular fa-user text-muted"></i>
                                    </span>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control border-start-0"
                                        placeholder="Choose a username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        autoComplete="username"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-3">
                                <label className="form-label text-muted small fw-medium mb-1">Email Address</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0">
                                        <i className="fa-regular fa-envelope text-muted"></i>
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control border-start-0"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label className="form-label text-muted small fw-medium mb-1">Password</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0">
                                        <i className="fa-solid fa-lock text-muted"></i>
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="form-control border-start-0 border-end-0"
                                        placeholder="Min. 6 characters"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="new-password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="input-group-text bg-light border-start-0 text-muted"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <i className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i>
                                    </button>
                                </div>
                                <div className="form-text text-muted" style={{ fontSize: "0.8rem" }}>
                                    Password must contain at least 6 characters.
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn w-100 py-2 fw-semibold text-white"
                                style={{ backgroundColor: "#387ed1", borderRadius: "6px" }}
                            >
                                {loading ? (
                                    <span>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Creating Account...
                                    </span>
                                ) : (
                                    "Continue"
                                )}
                            </button>
                        </form>

                        <div className="text-center mt-4 pt-2 border-top">
                            <p className="text-muted mb-0" style={{ fontSize: "0.92rem" }}>
                                Already have an account?{" "}
                                <Link to="/login" className="text-decoration-none fw-semibold" style={{ color: "#387ed1" }}>
                                    Log in
                                </Link>
                            </p>
                        </div>

                        <p className="text-muted text-center mt-4 mb-0" style={{ fontSize: "0.78rem", lineHeight: "1.4" }}>
                            By signing up, you agree to Zerodha's terms & conditions and privacy policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
