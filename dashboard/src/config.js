// Centralized API configuration for Dashboard
export const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:3002"
    : "https://zerodha-backend-7azy.onrender.com");
