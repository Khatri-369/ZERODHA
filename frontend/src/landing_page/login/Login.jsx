import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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

        if (!formData.email.trim() || !formData.password) {
            setErrorMsg("Please enter your email/username and password.");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post("http://localhost:3002/login", formData, {
                withCredentials: true,
            });

            if (res.data && (res.data.success || res.status === 200)) {
                setSuccessMsg("Logged in successfully! Redirecting to Dashboard...");
                setTimeout(() => {
                    window.location.href = "http://localhost:3001";
                }, 1000);
            } else {
                setErrorMsg(res.data.message || "Invalid credentials. Please try again.");
            }
        } catch (err) {
            console.error("Login network error:", err);
            const msg = err.response?.data?.message || "Failed to connect to the server. Make sure backend is running on port 3002.";
            setErrorMsg(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center my-4">
                <div className="col-12 col-md-7 col-lg-5">
                    <div className="card shadow-sm border-0 p-4 p-md-5" style={{ borderRadius: "12px", backgroundColor: "#fff" }}>
                        <div className="text-center mb-4">
                            <img
                                src="media/images/kite.png"
                                alt="Zerodha Kite Logo"
                                style={{ width: "55px", marginBottom: "15px" }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "media/images/logo.svg";
                                }}
                            />
                            <h2 className="fw-bold mb-1" style={{ color: "#444", fontSize: "1.75rem" }}>
                                Login to Kite
                            </h2>
                            <p className="text-muted" style={{ fontSize: "0.92rem" }}>
                                Enter your credentials to access your account
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
                            {/* Email */}
                            <div className="mb-3">
                                <label className="form-label text-muted small fw-medium mb-1">
                                    Email Address
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0">
                                        <i className="fa-regular fa-envelope text-muted"></i>
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control border-start-0"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label className="form-label text-muted small fw-medium mb-1">
                                    Password
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-end-0">
                                        <i className="fa-solid fa-lock text-muted"></i>
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="form-control border-start-0 border-end-0"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="current-password"
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
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn w-100 py-2 fw-semibold text-white mb-3"
                                style={{ backgroundColor: "#ff5722", borderRadius: "6px" }}
                            >
                                {loading ? (
                                    <span>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Logging in...
                                    </span>
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </form>

                        <div className="text-center mt-3 pt-3 border-top">
                            <p className="text-muted mb-0" style={{ fontSize: "0.92rem" }}>
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-decoration-none fw-semibold" style={{ color: "#387ed1" }}>
                                    Sign up now
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
