// Centralized API & App URLs configuration
export const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:3002"
    : "https://zerodha-backend-7azy.onrender.com");

export const DASHBOARD_URL =
  process.env.REACT_APP_DASHBOARD_URL ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:3001"
    : "https://zerodha-dashboard-8k1y.onrender.com");
