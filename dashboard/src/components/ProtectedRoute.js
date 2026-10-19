import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

const ProtectedRoute = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoading: true,
    isAuthenticated: false,
    user: null,
  });
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/user/profile`, {
          withCredentials: true,
        });

        if (isMounted) {
          if (res.data && (res.data.success || res.data.user)) {
            setAuthState({
              isLoading: false,
              isAuthenticated: true,
              user: res.data.user,
            });
          } else {
            setAuthState({
              isLoading: false,
              isAuthenticated: false,
              user: null,
            });
          }
        }
      } catch (err) {
        if (isMounted) {
          setAuthState({
            isLoading: false,
            isAuthenticated: false,
            user: null,
          });
        }
      }
    };

    verifySession();

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  if (authState.isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "#fafafa",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <img
          src="logo.png"
          alt="Zerodha Kite"
          style={{ width: "48px", marginBottom: "16px", opacity: 0.9 }}
        />
        <div
          style={{
            width: "36px",
            height: "36px",
            border: "3px solid #e0e0e0",
            borderTop: "3px solid #ff5722",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            marginBottom: "14px",
          }}
        />
        <p style={{ color: "#777", fontSize: "0.9rem", margin: 0, fontWeight: 500 }}>
          Verifying Kite session...
        </p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    // Redirect to Kite login, preserving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;