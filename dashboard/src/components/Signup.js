import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

const Signup = () => {
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

  // Check if already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user/profile`, {
          withCredentials: true,
        });
        if (res.data && (res.data.success || res.data.user)) {
          navigate("/", { replace: true });
        }
      } catch (e) {
        // Not logged in
      }
    };
    checkAuth();
  }, [navigate]);

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
          navigate("/", { replace: true });
        }, 1000);
      } else {
        setErrorMsg(res.data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      const msg =
        err.response?.data?.message ||
        "Failed to connect to the backend server on port 3002.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f9f9f9",
        fontFamily: "'Inter', sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          padding: "36px 32px",
          border: "1px solid #e0e0e0",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <img src="logo.png" alt="Zerodha Kite Logo" style={{ width: "50px", marginBottom: "12px" }} />
          <h2 style={{ fontSize: "1.6rem", fontWeight: "600", color: "#333", margin: "0 0 6px" }}>
            Open a Kite Account
          </h2>
          <p style={{ fontSize: "0.88rem", color: "#666", margin: 0 }}>
            Sign up to trade and invest with Zerodha
          </p>
        </div>

        {errorMsg && (
          <div
            style={{
              padding: "10px 14px",
              background: "#ffebee",
              color: "#c62828",
              borderRadius: "6px",
              fontSize: "0.85rem",
              marginBottom: "16px",
              border: "1px solid #ffcdd2",
            }}
          >
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div
            style={{
              padding: "10px 14px",
              background: "#e8f5e9",
              color: "#2e7d32",
              borderRadius: "6px",
              fontSize: "0.85rem",
              marginBottom: "16px",
              border: "1px solid #c8e6c9",
            }}
          >
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.82rem",
                fontWeight: "500",
                color: "#555",
                marginBottom: "6px",
              }}
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "0.9rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.82rem",
                fontWeight: "500",
                color: "#555",
                marginBottom: "6px",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "0.9rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "22px" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.82rem",
                fontWeight: "500",
                color: "#555",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 6 characters"
                required
                style={{
                  width: "100%",
                  padding: "10px 42px 10px 12px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  fontSize: "0.9rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#777",
                  fontSize: "0.85rem",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#387ed1",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontWeight: "600",
              fontSize: "0.95rem",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Creating Account..." : "Continue"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", paddingTop: "18px", borderTop: "1px solid #eee" }}>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#666" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#387ed1", textDecoration: "none", fontWeight: "600" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
